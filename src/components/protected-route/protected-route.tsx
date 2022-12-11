import React from "react";
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IProfileState } from '../../services/reducers/profile';

export function ProtectedRoute({ children, onlyNotLoggedAccess }: {children: JSX.Element, onlyNotLoggedAccess?: boolean}) {
    const pathname = window.location.pathname;
    const location = useLocation();
    const user = useSelector((state: IProfileState) => state.profile?.user);

    if (onlyNotLoggedAccess) {
        return (!user
            ? children
            : <Navigate
                to={(location.state?.from as string) ?? "/"}
                state={{from: pathname}}
            />);
    } else {
        return (user 
            ? children
            : <Navigate
                to={(location.state?.from as string) ?? "/login"}
                state={{from: pathname}}
            />);
    }
}