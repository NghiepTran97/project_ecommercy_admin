import { Outlet } from "react-router-dom";
import SidebarMain from "../component/sidebarMain";
import {toast, ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import profileApi from "../api/profile";
import { updateAuthUser } from "../auth/authSlice";

export default function Layout() {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    let navigate = useNavigate();
    const [cookies] = useCookies(['userToken']);

    useEffect(() => {
        const socket = cookies.userToken;
        if (!socket) {
            navigate('admin/auth/login')
        }
        if (!auth.user) {
            updateUserToStore();
        }
    });
    const updateUserToStore = async () => {
        const updateUserResponse = await profileApi.show();
        if(updateUserResponse.success) {
            dispatch(updateAuthUser(updateUserResponse.data));
        }
    }
    return (
        <>
            <div className="wrapper d-flex">
                <SidebarMain/>
                <div className="container-main">
                    <Outlet/>
                </div>
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                        />
                        {/* Same as */}
                    <ToastContainer />
            </div>
            
        </>
    )
}