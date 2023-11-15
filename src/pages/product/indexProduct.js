import ContentHeader from "../../component/contentHeader";
import HeaderNavbar from "../../component/headerNavbar";
import { useState, useRef, useEffect  } from "react";
import { IoShirtOutline } from "react-icons/io5";
import productApi from "../../api/product";
import { PAGINATION, ProductPagination } from "../../helpers/constants";
import { toast } from "react-toastify";
import CustomPagination from "../../component/CustomPagination";
import { getValue } from "@testing-library/user-event/dist/utils";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const productIndexSwal = withReactContent(Swal);
export default function ProductIndex() {
    const [productTitle] = useState('Product')
    const [breadcrumb] = useState('Add Product')

    const [products, setProducts] = useState({});
    const currentPage = useRef(ProductPagination.page)

    useEffect(() => {
        getProducts();
    }, []);
    const getProducts = (data = {}, page = ProductPagination.currentPage) => {
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
                const productsResponse = await productApi.index(data, page);
                console.log(productsResponse.data);
                if (productsResponse.success) {
                    setProducts(productsResponse.data);
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
                    <div className="d-flex align-items-center p-4 group-product">
                        <div className="badge-icon bg-primary text-center me-3">
                            <IoShirtOutline className="icon-product"/>
                        </div>
                        <h5 className="m-0">Áo thun nam</h5>
                    </div>

                    <div className="d-flex flex-col-reverse gap-4">
                        <div className="gird gap-2.5">
                            <select class="form-select" aria-label="Default select example">
                                <option selected>Phân loại</option>
                                <option value="1">Quần áo nam</option>
                                <option value="2">Phụ kiện nam</option>
                                <option value="3">Thời trang nũ</option>
                                <option value="4">Phụ kiện nữ</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="container-product-main d-flex flex-wrap py-2 px-0 mx-0 mt-3">
                    {   
                        products.data && products.data.map((product, index) => {
                            return(
                                <div className="product-items col-2 px-1 pb-2 flex-column">
                                    <div className="product-item-group">
                                        <div className="product-img">
                                            <img src={product.category.image}/>
                                        </div>

                                        <div className="product-description p-2">
                                            <div className="product-name">
                                                {product.name}
                                            </div>
                                            <div className="product-discount">
                                                <span className="px-1">
                                                    {product.discount}
                                                </span>
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
                                        <div className="btn btn-success button">
                                            Chỉnh sửa
                                        </div>
                                        <button type="button" className="btn btn-danger button" onClick={()=> handleDelete(product._id)}>
                                            Xóa
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    }   
                </div>
            </div>
            <CustomPagination
                page={products.page}
                pages={products.pages}
                onPageChange={page => getProducts(getValue(), page)}
            />
        </>
    )
}