import HeaderNavbar from "../../component/headerNavbar";
import ContentHeader from "../../component/contentHeader";
import CategoryFormElement from "./formCategory";
import { useState } from "react";

export default function CategoryCreate() {

    const [createCategoryTitle] = useState('Danh mục của shop')
    const [breadcrumb] = useState('Thêm danh mục')
    return (
        <>
            <HeaderNavbar/>
            <ContentHeader title={createCategoryTitle} breadcrumb={breadcrumb}/>
            <CategoryFormElement/>
        </>
    )
}