import { BiSearch, BiRadioCircle, BiSolidHomeCircle} from "react-icons/bi";
import { FaUsers, FaAngleDown } from "react-icons/fa6";
import { FaMailBulk } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { SiShopee } from "react-icons/si";
import { GiClothes } from "react-icons/gi";
import { AiOutlineBars } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Collapse } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";

export default function SidebarMain() {
    const auth = useSelector(state => state.auth);
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
 
    
    return(
        <>
            <div className="container-sidebar col-2">
                <div className="sidebar-admin">
                    <SiShopee className="sidebar-logo"/>
                    <span className="sidebar-name">Shopee</span>
                </div>
                <div className="sidebar-content">
                    <Link to={'admin/profile'} className="sidebar-profile d-flex">
                        <div className="avatar">
                            <img className="user-avatar" src={auth.user?.avatar}/>
                        </div>
                        <div className="info">{auth.user?.username}</div>
                    </Link>
                    <div className="sidebar-search mb-1">
                        <div className="input-group">
                            <input className="form-control form-control-sidebar input" type="text" placeholder="Search"></input>
                            <div className="button-box ">
                                <button className="btn btn-sidebar">
                                    <BiSearch className="button-icon"/>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <Button className= {'sidebar-collapse mt-2'}
                            onClick={() => setOpen(!open)}
                            aria-controls="example-collapse-text"
                            aria-expanded={open}
                        >
                            <p className="m-0 d-flex justify-content-between align-items-center">
                                <div>
                                    <FaUsers className="nav-icon me-2"/> 
                                    Quản lý Users
                                </div>
                                <div>
                                    <FaAngleDown/>
                                </div>
                            </p>
                        </Button>
                        <Collapse in={open}>
                            <div id="example-collapse-text" className="mt-2">
                                <div className="form-control">
                                    <NavLink
                                        to = {'users'}
                                        className={"nav-link"}
                                    >
                                        <div className="nav d-flex align-items-center">
                                            <BiRadioCircle className="nav-icon me-1"/>
                                            <p className="m-0">Danh sách User</p>
                                        </div>
                                    </NavLink>
                                </div>
                                <div className="form-control mt-2">
                                    <NavLink
                                        to = {'users/create'}
                                        className={"nav-link"}
                                    >
                                        <div className="nav d-flex align-items-center">
                                            <BiRadioCircle className="nav-icon me-1"/>
                                            <p className="m-0">Thêm mới User</p>
                                        </div>
                                    </NavLink>
                                </div>
                            </div>
                        </Collapse>
                    </div>

                    <div>
                        <Button className= {'sidebar-collapse mt-2'}
                            onClick={() => setOpen1(!open1)}
                            aria-controls="example-collapse-text"
                            aria-expanded={open1}
                        >
                            <p className="m-0 d-flex justify-content-between align-items-center">
                                <div>
                                    <FaMailBulk className="nav-icon me-2"/> 
                                    Chatbox
                                </div>
                                <div>
                                    <FaAngleDown/>
                                </div>
                            </p>
                        </Button>
                        <Collapse in={open1}>
                            <div id="example-collapse-text" className="mt-2">
                                <div className="form-control">
                                    <NavLink
                                        
                                        className={"nav-link"}
                                    >
                                        <div className="nav d-flex align-items-center">
                                            <BiRadioCircle className="nav-icon me-1"/>
                                            <p className="m-0">Read</p>
                                        </div>
                                    </NavLink>
                                </div>
                                <div className="form-control mt-2">
                                    <NavLink
                                       
                                        className={"nav-link"}
                                    >
                                        <div className="nav d-flex align-items-center">
                                            <BiRadioCircle className="nav-icon me-1"/>
                                            <p className="m-0">Inbox</p>
                                        </div>
                                    </NavLink>
                                </div>
                            </div>
                        </Collapse>
                    </div>

                    <div>
                        <Button className= {'sidebar-collapse mt-2'}
                            onClick={() => setOpen2(!open2)}
                            aria-controls="example-collapse-text"
                            aria-expanded={open2}
                        >
                            <p className="m-0 d-flex justify-content-between align-items-center">
                                <div>
                                    <GiClothes className="nav-icon me-2"/> 
                                    Product
                                </div>
                                <div>
                                    <FaAngleDown/>
                                </div>
                            </p>
                        </Button>
                        <Collapse in={open2}>
                            <div id="example-collapse-text" className="mt-2">
                                <div className="form-control">
                                    <NavLink
                                        to={'admin/product'}
                                        className={"nav-link"}
                                    >
                                        <div className="nav d-flex align-items-center">
                                            <BiRadioCircle className="nav-icon me-1"/>
                                            <p className="m-0">Danh sách sản phẩm</p>
                                        </div>
                                    </NavLink>
                                </div>
                                <div className="form-control mt-2">
                                    <NavLink
                                        to={'admin/product/create'}
                                        className={"nav-link"}
                                    >
                                        <div className="nav d-flex align-items-center">
                                            <BiRadioCircle className="nav-icon me-1"/>
                                            <p className="m-0">Thêm mới sản phẩm</p>
                                        </div>
                                    </NavLink>
                                </div>
                            </div>
                        </Collapse>
                    </div>

                    <div>
                        <Link className= 'sidebar-collapse mt-2 form-control btn btn-primary'
                            to = {'/category'}
                        >
                            <div className="m-0 d-flex justify-content-between align-items-center">
                                <div className="d-flex justify-content-between align-items-center">
                                    <AiOutlineBars className="nav-icon me-2"/> 
                                    Category
                                </div>
                                <div>
                                    <FaAngleDown/>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div>
                        <Link className= 'sidebar-collapse mt-2 form-control btn btn-primary'
                            to = {'/brand'}
                        >
                            <div className="m-0 d-flex justify-content-between align-items-center">
                                <div className="d-flex justify-content-between align-items-center">
                                    <BiSolidHomeCircle className="nav-icon me-2"/> 
                                    Brands
                                </div>
                                <div>
                                    <FaAngleDown/>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

        </>
    )
}