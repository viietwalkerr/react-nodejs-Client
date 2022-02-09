import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { ApplicationState } from "../store";
import { actionCreators as globalActionCreators } from "../store/Global";
import { actionCreators as userActionCreators } from "../store/User";

const usePopulateInitialData = (): void => {
    const { fetchAllPosts, fetchAllLikes, fetchUserData } = bindActionCreators(
        {
            ...globalActionCreators,
            ...userActionCreators
        }, useDispatch()
    );

    const isAuthenticated = useSelector(
        (state: ApplicationState) => state.auth?.isAuthenticated
    );

    const id = useSelector(
        (state: ApplicationState) => state.auth?.id
    );

    useEffect(() => {
        fetchAllPosts();
        if (isAuthenticated && id) {
            console.log(id);
            fetchUserData(id);
        }
        
        // fetchAllLikes();
    }, [isAuthenticated]);
};

export default usePopulateInitialData;