import { Dispatch, SetStateAction } from "react";

export interface IUserData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: string;
    salary: string;
    dateOfBirth: string;
}

export interface IFirestoreUserData extends IUserData {
    id?: string;
    deleted: boolean;
    isNew: boolean;
    tasks: ITask[];
}

export interface ITask {
    completeDate: number;
    completed: boolean;
    description: string;
    startDate: number;
    taskName: string;
}

export interface ITaskConverted {
    employeeId: string;
    employeeFullName: string;
    taskName: string;
    taskDescription: string;
    taskProcess: boolean;
    startDate: number;
    completeDate: number | null;
}

export interface ITasksToUpdate {
    tasks: ITask[];
}

export interface ISidebarListItemProps {
    onClick: (componentTitle: string) => void;
    title: string;
    currSidebarItem: string;
}

export interface IDashboardProps {
    userData: IFirestoreUserData | null;
    setUserData: Dispatch<SetStateAction<IFirestoreUserData | null>>;
    isTaskManager: boolean;
}

export interface IPersonalInformationProps {
    userData: IFirestoreUserData | null;
    setUserData: Dispatch<SetStateAction<IFirestoreUserData | null>>;
}

export interface IListProps {
    title: string;
    tasks: ITaskConverted[];
    deleteTask?: (employeeId: string, taskName: string) => void;
}