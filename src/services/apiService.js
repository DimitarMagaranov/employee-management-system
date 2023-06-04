import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';

import { auth, db } from '../utils/firebase';

export const getAllEmployees = async () => {
    const data = (await getDocs(collection(db, 'users'))).docs.map((doc) => doc.data());
    return data.filter((x) => x.role != 'taskManager').sort((a, b) => a.firstName.localeCompare(b.firstName));
};

export const createEmployee = async (email, password, userToDb) => {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const user = res.user;

    await setDoc(doc(db, 'users', user.uid), { id: user.uid, ...userToDb });
};

export const getOneEmployee = async (employeeId) => {
    const ref = doc(db, 'users', employeeId);
    const docSnap = await getDoc(ref);
    return docSnap.data();
};

export const updateEmployee = async (employeeId, data) => {
    const ref = doc(db, 'users', employeeId);
    await updateDoc(ref, data);
};

export const getAllTasks = async () => {
    let tasks = [];

    getAllEmployees().then((data) => {
        data.filter((x) => x.role !== 'taskManager').forEach((employee) => {
            employee.tasks.forEach((task) => {
                tasks.push({
                    employeeId: employee.id,
                    employeeFullName: `${employee.firstName} ${employee.lastName}`,
                    taskName: task.taskName,
                    taskDescription: task.description,
                    taskProcess: task.completed,
                    startDate: task.startDate,
                    completeDate: task.completeDate,
                });
            });
        });
    });

    return tasks;
};
