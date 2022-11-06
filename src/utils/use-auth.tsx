import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../services/actions/profile-get";
import { IProfileState } from "../services/reducers/profile";

export default function useAuth() {
    const dispatch = useDispatch();
    const user = useSelector((state: IProfileState) => state.profile?.user);
    if (!user) {
        dispatch(getProfile());
    }
}