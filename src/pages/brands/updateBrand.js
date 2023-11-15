import HeaderNavbar from "../../component/headerNavbar";
import ContentHeader from "../../component/contentHeader";
import BrandFormUpdate from "./formBrandUpdate";
import { useState } from "react";

export default function BrandUpdate() {

    const [createBrandTitle] = useState('Brands')
    const [breadcrumb] = useState('Chỉnh sửa brands')
    return (
        <>
            <HeaderNavbar/>
            <ContentHeader title={createBrandTitle} breadcrumb={breadcrumb}/>
            <BrandFormUpdate/>
        </>
    )
}