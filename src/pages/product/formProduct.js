import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react";
import productApi from "../../api/product";
import { useNavigate } from "react-router-dom";

export default function ProductFormElement () {

    const [urlImageProduct, setUrlImageProduct] = useState();
    const [urlVideoProduct, setUrlVideoProduct] = useState();
    const {
        register,
        handleSubmit,
        formState: {errors},
        setError,
    } = useForm({
        defaultValues: {
            name: '',
            description: '',
        }
    });

    let navigate = useNavigate();

    const changeImageProduct = (e) => {
        const urlImage = URL.createObjectURL(e.target.files[0]);
        setUrlImageProduct(urlImage);
    }
    const changeVideoProduct = (e) => {
        const urlVideo = URL.createObjectURL(e.target.files[0]);
        setUrlVideoProduct(urlVideo);
    }

    const store = async (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('category', data.category)
        formData.append('brand', data.brand)
        formData.append('description', data.description)

        if (data.images) {
            formData.append('images', data.images[0])
        }
        if (data.video) {
            formData.append('video', data.video[0])
        }

        const productsResponse = await productApi.store(formData);
        console.log(productsResponse.data);

        if (productsResponse.sucess) {
            navigate('/admin/product')
            toast.success (() => <p>Thêm mới sản phẩm <b>{productsResponse.data.name}</b>thành công</p>)
            
            return;
        }
        if (productsResponse.errors) {
            toast.error(() => <p>Thêm mới sản phẩm thất bại</p>)
        }
       
    }
    
    return (
        <>
            <form className="form-create-product container col-6 pt-3" onSubmit={handleSubmit(store)}>
                <div className="product-image-group text-center mb-4">
                        <img
                            src={urlImageProduct}
                            className="mb-2 product-image"
                            alt="product-img"
                        />
                        <input
                            type="file"
                            className="form-control"
                            {...register('images', {
                                onChange: (e) => changeImageProduct(e)
                            })}
                        />
                </div>
                    
                <div className="product-video-group text-center mb-4">
                    <video
                        src={urlVideoProduct}
                        className="mb-2 product-video"
                        alt="product-video"
                    />
                    <input
                        type="file"
                        className="form-control"
                        {...register('video', {
                            onChange: (e) => changeVideoProduct(e)
                        })}
                    />
                </div>

                <div className="product-name-group mb-4">
                    <label htmlFor="inputName" className="form-label">
                        Tên sản phẩm
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputName"
                        {...register ('name', {
                            required: "Tên sản phẩm không được để trống",
                            minLength: {
                                value: 10,
                                message: "Têm sản phẩm có ít nhất 10 ký tự"
                            }
                        })}
                    />
                   
                </div>

                <div className="product-category-group mb-4">
                    <label htmlFor="inputCategory" className="form-label">  
                        Chọn ngành sản phẩm
                    </label>
                    <select class="form-select" aria-label="Default select example"
                        {...register('category', {
                            
                        })}
                    >
                        <option selected>Chọn nghành sản phẩm</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                   
                </div>

                <div className="product-brand-group mb-4">
                    <label htmlFor="inputCategory" className="form-label">  
                        Chọn Thương hiệu sản phẩm
                    </label>
                    <select class="form-select" aria-label="Default select example"
                        {...register('brand', {

                        })}
                    >
                        <option selected>Chọn brand</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                   
                </div>

                <div className="product-description-group mb-4">
                    <label htmlFor="inputCategory" className="form-label">  
                        Mô tả sản phẩm
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        {...register ('description', {
                            maxLength: {
                                value: 512,
                                message: "Mô tả sản phẩm không quá 512 ký tự"
                            }
                        })}
                    />
                  
                </div>

                <div>
                    <div className="card-footer text-center">
                        <button className="btn btn-primary">
                            Thêm mới
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}