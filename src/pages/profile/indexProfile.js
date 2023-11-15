import ContentHeader from "../../component/contentHeader";
import HeaderNavbar from "../../component/headerNavbar";
import { useState } from "react";
import { FaShare, FaRegComments, FaTimes } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { Link } from "react-router-dom";
import moment from "moment/moment";
import { useSelector } from "react-redux";

export default function ProfileIndex() {

    const auth = useSelector(state => state.auth)
    const [profileTitle] = useState('Profile')
    const [breadcrumb] = useState('User Profile')

    const date = moment().format("DD MM YYYY");
    const time = moment().format("HH mm")
    return(
        <>
            <HeaderNavbar/>
            <ContentHeader title={profileTitle} breadcrumb={breadcrumb}/>
            <div className="content-profile container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <div className="card card-primary card-outline">
                            <div className="card-body box-profile text-center">
                                <div className="text-center">
                                    <img className="profile-user-img img-fluid"
                                        src={auth.user?.avatar}
                                    />
                                </div>
                                <h3 className="profile-username text-center">
                                    {auth.user?.username}
                                </h3>
                                <Link to={'update'} className="btn btn-success text-center my-2 profile-update">Chỉnh sửa</Link>
                                <Link to={'change_password'} className="btn btn-primary text-center profile-change-password">Thay đổi password</Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-9">
                        <div className="card">
                            <div className="card-header p-2">
                                <ul className="nav nav-pills">
                                    <li className="nav-items">
                                        <Link className="nav-link active">Activity</Link>
                                    </li>
                                    <li className="nav-items">
                                        <Link className="nav-link">Timeline</Link>
                                    </li>
                                    <li className="nav-items">
                                        <Link className="nav-link">Settings</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="card-body">
                                <div className="tab-content">
                                    <div className="active tab-pane">
                                        <div className="post">
                                            <div className="user-block">
                                                <img className="user-block-img"/>
                                                <span className="username">
                                                    <div className="nameuser">Jonathan Burke Jr</div>
                                                    <div className="float-end btn-tool">
                                                        <FaTimes/>
                                                    </div>
                                                </span>
                                                <span className="description">Share publicly {date} {time}</span>
                                            </div>
                                            <p>"Lorem ipsum represent a long-hepl tradition for desigers..."</p>
                                            <div className="post-link pb-3">
                                                <div className="float-start d-flex">
                                                    <div className="link-black text-sm me-2 text-center">
                                                        <FaShare className="icon-link me-1"/>
                                                        Share
                                                    </div>
                                                    <div className="link-black text-sm text-center">
                                                        <AiOutlineLike className="icon-link me-1"/>
                                                        Like
                                                    </div>
                                                </div>
                                                <div className="float-end">
                                                    <div className="link-black text-sm text-center">
                                                        <FaRegComments className="icon-link me-1"/>
                                                        Comments
                                                    </div>
                                                </div>
                                            </div>
                                            <input className="form-control form-control-sm"
                                                type="text"
                                                placeholder="comment"
                                            />
                                        </div>
                                    </div>
                                    <div className="tab-pane"></div>
                                    <div className="tab-pane"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}