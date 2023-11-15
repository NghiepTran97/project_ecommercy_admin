import HeaderNavbar from "../../component/headerNavbar";
import ContentHeader from "../../component/contentHeader";
import CategoryFormElement from "./formCategory";
import { useState } from "react";

export default function CategoryUpdate() {

    const [updateCategoryTitle] = useState('Danh mục của shop')
    const [breadcrumb] = useState('Chỉnh sửa danh mục')
    return (
        <>
            <HeaderNavbar/>
            <ContentHeader title={updateCategoryTitle} breadcrumb={breadcrumb}/>
            <CategoryFormElement isUpdate = {true}/>
        </>
    )
}