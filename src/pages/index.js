import { FaUserPlus } from "react-icons/fa";
import { BiSolidBarChartAlt2, BiSolidPieChartAlt2 } from "react-icons/bi";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import ContentHeader from "../component/contentHeader";
import HeaderNavbar from "../component/headerNavbar";
import { useState } from "react";

export default function Index() {

    const [parentTitle] = useState('DashBoard')
    const [breadcrumb] = useState('Dashboard')
    return(
        <>
            <HeaderNavbar/>
            <ContentHeader title={parentTitle} breadcrumb={breadcrumb}/>
            <div className="content">
                <div className="row m-0">
                    <div className="content-box col-lg-3">
                        <div className="box bg-info">
                            <div className="box-content">
                                <h1>150</h1>
                                <p className="m-0">New order</p>
                            </div>
                            <div className="box-footer justify-content-center align-items-center d-flex">
                                <p className="box-more m-0">More info</p>
                                <span>
                                    <BsFillArrowRightCircleFill/>
                                </span>
                            </div>
                            <HiOutlineShoppingBag className="box-icon"/>
                        </div>
                    </div>
                    <div className="content-box col-lg-3">
                        <div className="box bg-success">
                            <div className="box-content">
                                <h1>150</h1>
                                <p className="m-0">New order</p>
                            </div>
                            <div className="box-footer justify-content-center align-items-center d-flex">
                                <p className="box-more m-0">More info</p>
                                <span>
                                    <BsFillArrowRightCircleFill/>
                                </span>
                            </div>
                            <BiSolidBarChartAlt2 className="box-icon"/>
                        </div>
                        
                    </div>
                    <div className="content-box col-lg-3">
                        <div className="box bg-warning">
                            <div className="box-content">
                                <h1>150</h1>
                                <p className="m-0">New order</p>
                            </div>
                            <div className="box-footer justify-content-center align-items-center d-flex">
                                <p className="box-more m-0">More info</p>
                                <span>
                                    <BsFillArrowRightCircleFill/>
                                </span>
                            </div>
                            <FaUserPlus className="box-icon"/>
                        </div>
                        
                    </div>
                    <div className="content-box col-lg-3 ">
                        <div className="box bg-danger">
                            <div className="box-content">
                                <h1>150</h1>
                                <p className="m-0">New order</p>
                            </div>
                            <div className="box-footer justify-content-center align-items-center d-flex">
                                <p className="box-more m-0">More info</p>
                                <span>
                                    <BsFillArrowRightCircleFill/>
                                </span>
                            </div>
                            <BiSolidPieChartAlt2 className="box-icon"/>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}