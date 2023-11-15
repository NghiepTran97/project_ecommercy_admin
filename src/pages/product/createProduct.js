import HeaderNavbar from "../../component/headerNavbar";
import ContentHeader from "../../component/contentHeader";
import ProductFormElement from "./formProduct";
import { useState } from "react";

export default function ProductCreate () {
    const [createProductTitle] = useState('Product')
    const [breadcrumb] = useState('Thêm mới sản phẩm')
    return (
        <>
            <HeaderNavbar/>
            <ContentHeader title={createProductTitle} breadcrumb={breadcrumb}/>
            <ProductFormElement/>
        </>
    )
}