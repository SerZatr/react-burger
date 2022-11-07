import React from "react";
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IProfileState } from '../../services/reducers/profile';

export function ProtectedRoute({ children, onlyNotLoggedAccess }: {children: JSX.Element, onlyNotLoggedAccess?: boolean}) {

    const user = useSelector((state: IProfileState) => state.profile?.user);

    if (onlyNotLoggedAccess) {
        return (!user
            ? children
            : <Navigate
                to={"/"}
            />);
    } else {
        return (user 
            ? children
            : <Navigate
                to={"/login"}
            />);
    }
}