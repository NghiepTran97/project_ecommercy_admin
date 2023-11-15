import UserFormElement from "./element/userForm";
import HeaderNavbar from "../../component/headerNavbar";
import ContentHeader from "../../component/contentHeader";
import { useState } from "react";

export default function UserCreate() {
    const [userTitle] = useState('Quản lý user')
    const [breadcrumb] = useState('Thêm mới user')
    return (
        <>
            <HeaderNavbar/>
            <ContentHeader title={userTitle} breadcrumb={breadcrumb}/>
           <UserFormElement/>
        </>
    )
}