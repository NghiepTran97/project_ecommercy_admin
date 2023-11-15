import HeaderNavbar from "../../component/headerNavbar"
import ContentHeader from "../../component/contentHeader"
import { useState, useEffect, useRef } from "react";
import CustomPagination from "../../component/CustomPagination";
import { PAGINATION } from "../../helpers/constants";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import {toast} from "react-toastify"
import { getValue } from "@testing-library/user-event/dist/utils";
import brandApis from "../../api/brand";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";

const brandIndexSwal = withReactContent(Swal)
export default function BrandIndex () {
    const [brandTitle] = useState('Brand')
    const [breadcrumb] = useState('Danh sách Brand')

    const[brands, setBrands] = useState({});
    const currentPage = useRef(PAGINATION.page)
    useEffect (() => {
        getBrands();
    },[]);

    const getBrands = (data ={}, page = PAGINATION.currentPage) => {
        if(page !== currentPage.current) {
            currentPage.current = page;
        }
        (
            async () => {
                for (const field in data) {
                    if (!data[field]) {
                        delete data[field];
                    }
                }
                const brandResponse = await brandApis.index(data, page);
                console.log(brandResponse.data);
                if (brandResponse.success) {
                    setBrands(brandResponse.data)
                }
            }
        )()
    }

    const handleDelete = async (brandId) => {
        brandIndexSwal.fire({
            title: "Bạn có muốn xóa Brand này",
            showCancelButton: true,
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Hủy"
        }).then (async (result) => {
            if(result.isConfirmed) {
                const deleteBrands = await brandApis.destroy(brandId);

                if(deleteBrands.success) {
                    toast.success(() => <p>Xóa Brand thành công</p>)
                    getBrands(getValue(), currentPage.current)
                }
            }
        })
    }
    return (
        <>
            <HeaderNavbar/>
            <ContentHeader title={brandTitle} breadcrumb={breadcrumb}/>
            <div className="card-body px-2">
                <Link
                    className="btn btn-primary my-2 add-brand float-end"
                    to={'create'}
                >
                    <AiOutlinePlus className="me-2"/>
                    <span>Thêm mới Brand</span>
                </Link>
                <table className="table table-bordered">
                    <thead>
                        <tr className="text-center">
                            <th style={{with:10}}>Stt</th>
                            <th>Logo</th>
                            <th>Tên brand</th>
                            <th>Số sản phẩm</th>
                            <th>Thêm mới sản phẩm</th>
                            <th style={{with:`15%`}}>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            brands.data && brands.data.map( (brand, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            {index +1}
                                        </td>
                                        <td className="text-center">
                                            <div className="box-logo-brand text-center">
                                                <img className="logo-img" src={brand.logo}/>
                                            </div>  
                                        </td>
                                        <td className="text-center">
                                            <p className="brand-name">
                                                {brand.name}
                                            </p>
                                            <p className="brand-description">
                                                {brand.description}
                                            </p>
                                        </td>
                                        <td>
                                            0
                                        </td>
                                        <td className="text-center">
                                            <Link
                                                className="btn btn-primary me-2"
                                               
                                            >
                                                Thêm mới sản phẩm
                                            </Link>
                                        </td>
                                        <td className="text-center">
                                            <button
                                                type="button"
                                                className="btn btn-danger me-2"
                                                onClick={() => handleDelete(brand._id)}
                                            >
                                                Xóa
                                            </button>
                                            <Link className="btn btn-success" to={brand._id + '/update'}>
                                                Chỉnh sửa
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <CustomPagination
                    page = {brands.page}
                    pages={brands.pages}
                    onPageChange={page => getBrands(getValue(), page)}
                />
            </div>
        </>
    )
}