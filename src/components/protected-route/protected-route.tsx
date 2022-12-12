import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IProfileState } from '../../services/reducers/profile';
import { IUser } from "../../services/actions/register";

export function ProtectedRoute({ children, onlyNotLoggedAccess }: {children: JSX.Element, onlyNotLoggedAccess?: boolean}) {
    const pathname = window.location.pathname;
    const location = useLocation();
    const profile = useSelector((state: IProfileState) => state.profile);
    const [user, setUser] = useState<IUser | undefined>(undefined);

    useEffect(() => {
        if (profile) {
            setUser(profile.user);
        }
    }, [profile]);

    if (!profile || profile.request) {
        return null;
    }

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