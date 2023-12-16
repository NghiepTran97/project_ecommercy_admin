import ContentHeader from "../../component/contentHeader";
import HeaderNavbar from "../../component/headerNavbar";
import { useState, useRef, useEffect  } from "react";
import productApi from "../../api/product";
import categoryApis from "../../api/category";
import { ProductPagination } from "../../helpers/constants";
import { toast } from "react-toastify";
import CustomPagination from "../../component/CustomPagination";
import { getValue } from "@testing-library/user-event/dist/utils";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const productIndexSwal = withReactContent(Swal);
export default function ProductIndex() {
    const [productTitle] = useState('Product')
    const [breadcrumb] = useState('Add Product')

    const [products, setProducts] = useState({});
    const currentPage = useRef(ProductPagination.page)
    const [category, setCategory] = useState({});
    const limit = useRef(ProductPagination.limit)

    useEffect(() => {
        getProducts();
        getCategory();
    }, []);
    const getProducts = (data = {}, page = ProductPagination.currentPage, limit = ProductPagination.limit) => {
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
                const productsResponse = await productApi.index(data, page, limit);
                console.log(productsResponse.data);
                if (productsResponse.success) {
                    setProducts(productsResponse.data);
                }
            }
        )()
    };
    const getCategory = (data ={}) => {
        (
            async () => {
                for (const field in data) {
                    if (!data[field]) {
                        delete data[field];
                    }
                }
                const categoryResponse = await categoryApis.index(data);
                if(categoryResponse.success) {
                    setCategory(categoryResponse.data);
                }
            }
        )()
    };
    const handleDelete = async (productId) => {
        productIndexSwal.fire ({
            title: "Bạn có muốn xóa sản phẩm này không",
            showCancelButton: true,
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Hủy"
        }).then (async (result) => {
            if (result.isConfirmed) {
                const deleteProduct = await productApi.destroy(productId);

                if (deleteProduct.success) {
                    toast.success(() => <p>Xóa sản phẩm thành công</p>)
                    getProducts(getValue(), currentPage.current)
                }
            }
        })
    }
    return(
        <>
            <HeaderNavbar/>
            <ContentHeader title={productTitle} breadcrumb={breadcrumb}/>
            <div className="mx-4"> 
                <div className="d-flex justify-content-between align-items-center mt-4">
                    <div className="d-flex flex-col-reverse gap-4">
                        <div className="gird gap-2.5">
                            <select className="form-select" aria-label="Default select example">
                                <option >Phân loại</option>
                                {
                                    category.data && category.data.map((item) => {
                                        return(
                                            <option value={item._id} key={item._id}>
                                                {item.name}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </div>

                <div className="container-product-main d-flex flex-wrap py-2 px-0 mx-0 mt-3">
                    {   
                        products.data && products.data.map((product) => {
                            return(
                                <div className="product-items col-2 px-1 pb-2 flex-column">
                                    <div className="div-items">
                                        <div className="product-item-group">
                                            <div className="product-img">
                                                <img src={product.productMedia[0]?.url}/>
                                            </div>

                                            <div className="product-description p-2">
                                                <div className="product-name">
                                                    {product.name}
                                                </div>
                                                <div className="product-discount">
                                                    <span className="ps-1">Giảm</span>
                                                    <span className="px-1">
                                                        {product.discount}
                                                    </span>
                                                    <span className="pe-1">k</span>
                                                </div>
                                                <div className="product-price d-flex justify-content-between">
                                                    <div className="price">
                                                        {product.price}
                                                        <span className="ms-1">đ</span>
                                                    </div>
                                                    <div className="number-sold">
                                                        đã bán:
                                                        <span className="ms-1">
                                                            0
                                                        </span>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="container-product-hover d-flex justify-content-between px-2">
                                            <Link className="btn btn-success button"
                                                to={product._id}
                                            >
                                                Chỉnh sửa
                                            </Link>
                                            <button type="button" className="btn btn-danger button" onClick={()=> handleDelete(product._id)}>
                                                Xóa
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }   
                </div>
            </div>
            <div className="mx-4">
                <CustomPagination
                    page={products.page}
                    pages={products.pages}
                    onPageChange={page => getProducts(getValue(), page)}
                />
            </div>
            
        </>
    )
}