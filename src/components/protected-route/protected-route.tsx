import React from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IProfileState } from '../../services/reducers/profile';
import auth from '../../utils/use-auth';

export function ProtectedRoute({ children, onlyNotLoggedAccess }: {children: JSX.Element, onlyNotLoggedAccess?: boolean}) {
    const user = useSelector((state: IProfileState) => state.profile?.user);
    if (!user) {
        auth();
    }

    if (onlyNotLoggedAccess) {
        return (!user ? children : <Navigate to="/profile"/>);
    } else {
        return (user ? children : <Navigate to="/login"/>);

    }
}