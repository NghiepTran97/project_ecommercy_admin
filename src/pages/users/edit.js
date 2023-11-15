import UserFormEdit from "./element/useFormEdit";
import HeaderNavbar from "../../component/headerNavbar";
import ContentHeader from "../../component/contentHeader";
import { useState } from "react";

export default function UserEdit() {

    const [userTitle] = useState('Quản lý user')
    const [breadcrumb] = useState('Chỉnh sửa user')
    return (
        <>
            <HeaderNavbar/>
            <ContentHeader title={userTitle} breadcrumb={breadcrumb}/>
           <UserFormEdit/>
        </>
    )
}