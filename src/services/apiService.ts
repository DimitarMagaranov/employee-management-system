import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';

import { auth, db } from '../utils/firebase';
import { IFirestoreUserData, ITask, ITaskConverted } from '../interfaces';
import { User } from 'firebase/auth';

export const getAllEmployees = async (): Promise<IFirestoreUserData[]> => {
    const data = (await getDocs(collection(db, 'users'))).docs.map((doc) => doc.data()) as IFirestoreUserData[];
    return data.filter((x) => x.role != 'taskManager').sort((a, b) => a.firstName.localeCompare(b.firstName));
};

export const createEmployee = async (email: string, password: string, userToDb: IFirestoreUserData): Promise<void> => {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const user = res.user as User;

    const data = {
        id: user.uid,
        ...userToDb
    };

    await setDoc(doc(db, 'users', user.uid), data);
};

export const getOneEmployee = async (employeeId: string): Promise<IFirestoreUserData> => {
    const ref = doc(db, 'users', employeeId);
    const docSnap = await getDoc(ref);
    return docSnap.data() as IFirestoreUserData;
};

export const updateEmployee = async (employeeId: string, data: any): Promise<void> => {
    const ref = doc(db, 'users', employeeId);
    await updateDoc(ref, data);
};

export const getAllTasks = async (): Promise<ITaskConverted[]> => {
    let tasks = [] as ITaskConverted[];

    getAllEmployees().then((data: IFirestoreUserData[]) => {
        data.filter((x) => x.role !== 'taskManager').forEach((employee) => {
            employee.tasks.forEach((task) => {
                tasks.push({
                    employeeId: employee.id!,
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
