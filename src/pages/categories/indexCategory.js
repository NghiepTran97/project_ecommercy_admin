import { useEffect, useState } from "react";
import HeaderNavbar from "../../component/headerNavbar";
import categoryApis from "../../api/category";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomPagination from "../../component/CustomPagination";
import { useRef } from "react";
import { PAGINATION } from "../../helpers/constants";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { getValue } from "@testing-library/user-event/dist/utils";

const categoryIndexSwal = withReactContent(Swal)
export default function CategoryIndex() {

    const [categories, setCategories] = useState({})
    const currentPage = useRef(PAGINATION.page)
    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = (data = {}, page = PAGINATION.currentPage) => {
        if (page !== currentPage.current) {
            currentPage.current = page;
        }
        (
            async () => {
                for (const field in data) {
                    if (!data[field]) {
                        delete data[field];
                    }
                }
                const categoriesResponse = await categoryApis.index(data, page);
                
                if (categoriesResponse.success) {  
                    setCategories(categoriesResponse.data);
                }
            }
        )()
    }

    const handleDelete = async (categoryId) => {
        categoryIndexSwal.fire({
            title: "Bạn có muốn xóa thư mục này không",
            showCancelButton: true,
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Hủy"
        }).then (async (result) => {
            if (result.isConfirmed) {
                const deleteCategory = await categoryApis.destroy(categoryId);

                if (deleteCategory.success) {
                    toast.success(() => <p>Xóa thư mục thành công</p>)
                    getCategories(getValue(), currentPage.current)
                }
            }
        })
    }
    return(
        <>
            <HeaderNavbar/>
            <div className="header-category d-flex justify-content-between align-items-center">
                <div>
                    <h1 className="header-title">Danh mục của shop</h1>
                </div>
                <div>
                    <ol className="d-flex align-items-center">
                        <Link className="btn form-control bg-primary" to={'create'}>
                            <AiOutlinePlus className="plus me-2"/>
                            Thêm danh mục mới
                        </Link>
                    </ol>
                </div>
            </div>
            <div>

            </div>
            <div className="card-body px-2">
                <table className="table table-bordered">
                    <thead>
                        <tr className="text-center">
                            <th style={{with:10}}>STT</th>
                            <th>Danh mục sản phẩm</th>
                            <th>Số sản phẩm</th>
                            <th>Thêm mới sản phẩm</th>
                            <th style={{with:`15%`}}>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categories.data && categories.data.map( (category, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            {index +1}
                                        </td>
                                        <td>
                                            {category.name}
                                        </td>
                                        <td>
                                            0
                                        </td>
                                        <td className="text-center">
                                            <Link
                                                className="btn btn-primary me-2"
                                               
                                            >
                                                Thêm sản phẩm
                                            </Link>
                                        </td>
                                        <td className="text-center">
                                            <button
                                                type="button"
                                                className="btn btn-danger me-2"
                                                onClick={() => handleDelete(category._id)}
                                            >
                                                Xóa
                                            </button>
                                            <Link className="btn btn-success" to={category._id + '/update'}>
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
                    page = {categories.page}
                    pages={categories.pages}
                    onPageChange={page => getCategories(getValue(), page)}
                />
            </div>
        </>
    )
}
