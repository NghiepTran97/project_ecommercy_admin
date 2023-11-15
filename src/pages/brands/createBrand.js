import HeaderNavbar from "../../component/headerNavbar";
import ContentHeader from "../../component/contentHeader";
import BrandFormElement from "./formBrand";
import { useState } from "react";

export default function BrandCreate() {

    const [createBrandTitle] = useState('Brands')
    const [breadcrumb] = useState('Thêm mới brands')
    return (
        <>
            <HeaderNavbar/>
            <ContentHeader title={createBrandTitle} breadcrumb={breadcrumb}/>
            <BrandFormElement/>
        </>
    )
}