import { auth } from '../utils/firebase';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { IFirestoreUserData } from '../interfaces';
import { Navigate } from 'react-router-dom';

function Logout({
    userData,
    setUserData,
}: {
    userData: IFirestoreUserData | null;
    setUserData: Dispatch<SetStateAction<IFirestoreUserData | null>>;
}) {
    useEffect(() => {
        auth.signOut().then(() => {
            setUserData(null);
        });
    })

    if (userData) {
        return null;
    }

    return <Navigate to="/"></Navigate>;
}

export default Logout;
