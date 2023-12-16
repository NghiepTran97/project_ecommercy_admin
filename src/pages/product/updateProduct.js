import HeaderNavbar from "../../component/headerNavbar";
import ContentHeader from "../../component/contentHeader";
import ProductFormElement from "./formProduct";
import { useState } from "react";

export default function ProductUpdate () {
    const [createProductTitle] = useState('Product')
    const [breadcrumb] = useState('Chỉnh sửa sản phẩm')
    return (
        <>
            <HeaderNavbar/>
            <ContentHeader title={createProductTitle} breadcrumb={breadcrumb}/>
            <ProductFormElement isUpdateProduct = {true}/>
        </>
    )
}