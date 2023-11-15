import { FaBars, FaComments, FaThLarge} from "react-icons/fa";
import { BiSearch, BiBell, BiLogOut} from "react-icons/bi";
import { TiArrowMove } from "react-icons/ti";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function HeaderNavbar() {
    let navigate = useNavigate();
    const [cookies, setCookie, removeCookies] = useCookies(['userToken']); 
    
    const logOut = () => {
        console.log('me');
        removeCookies('userToken');
        window.location.href = process.env.REACT_APP_APP_DOMAIN + 'login'
    }

    return (
        <>
            <div className="header-navbar d-flex justify-content-between">
                <div className="navbar-left d-flex">
                    <div className="navbar-icon"><FaBars className="icon"/></div>
                    <div className="navbar-icon">
                        <a href="http://localhost:3000/" className="navbar-home">Home</a>
                    </div>
                    <div className="navbar-icon">
                            <div className="navbar-home">Contact</div>
                     </div>
                </div>
                <div className="navbar-right d-flex justify-content">
                    <div className="navbar-icon"> <BiSearch className="icon"/> </div>
                    <div className="navbar-icon"> <FaComments className="icon"/> </div>
                    <div className="navbar-icon"> <BiBell className="icon"/> </div>
                    <div className="navbar-icon"> <TiArrowMove className="icon"/> </div>
                    <div className="navbar-icon"> <FaThLarge className="icon"/> </div>
                    <div className="navbar-icon" onClick={logOut}> <BiLogOut className="icon"/></div>
                 </div>
            </div>
        </>

    )
}