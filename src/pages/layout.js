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
import brandApis from "../api/brand";
import { updateAuthBrand } from "../auth/authBrand";

export default function Layout() {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    let navigate = useNavigate();
    const [cookies] = useCookies(['userToken']);
    //const authBrand = useSelector(state => state.authBrand)

    useEffect(() => {
        const socket = cookies.userToken;
        
        if (!socket) {
            navigate('/login')
        }

        // 1. kiem tra xem user
        // neu chua thi call api va update vao store
     
        if (!auth.user) {
            updateUserToStore();
        }
   
   
        //if (!authBrand.brand) {
          //  updateBrandToStore();
       // }

    });
    const updateUserToStore = async () => {
        const updateUserResponse = await profileApi.show();
        if(updateUserResponse.success) {
            dispatch(updateAuthUser(updateUserResponse.data));
        }
    }

    //const updateBrandToStore = async () => {
      //  const updateBrandResponse = await brandApis.show();
        
        //if (updateBrandResponse.success) {
          //  dispatch(updateAuthBrand(updateBrandResponse.data))
        //}
    //}
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