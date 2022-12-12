import { getProfile } from "../services/actions/profile-get";
import { useAppDispatch, useAppSelector } from "../services/hooks";

export default function useAuth() {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => {
        return state.profile?.user;
    }
    );
    if (!user) {
        dispatch(getProfile());
    }
}