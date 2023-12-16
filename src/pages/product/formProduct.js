import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import productApi from "../../api/product";
import { useNavigate, useParams } from "react-router-dom";
import categoryApis from "../../api/category";
import brandApis from "../../api/brand";

export default function ProductFormElement ({isUpdateProduct = false}) {
    const [category, setCategory] = useState({});
    const [brand, setBrand] = useState({});
    const [urlImageProduct, setUrlImageProduct] = useState();
    const [urlVideoProduct, setUrlVideoProduct] = useState();
    const {
        register,
        handleSubmit,
        formState: {errors},
        setError,
        setValue,
    } = useForm({
        defaultValues: {
            name: '',
            price: '',
            discount: 0,
            description: '',
            brand_id: '',
            category_id: '',
            classifies: [],
            video: null,
        }
    });
    let navigate = useNavigate();
    let urlParams = useParams();
    useEffect(() => {
        getCategory()
        getBrand()
        if (isUpdateProduct) {
            (
                async () => {
                    const productsResponse = await productApi.show(urlParams.productId);
                    if(productsResponse.success) {
                        setValue('name', productsResponse.data.name);
                        setValue('price', productsResponse.data.price);
                        setValue('discount', productsResponse.data.discount);
                        setValue('category_id', productsResponse.data.category_id);
                        setValue('brand_id', productsResponse.data.brand_id);
                        setValue('description', productsResponse.data.description);
                        setUrlImageProduct('images', productsResponse.data.images);
                        setUrlVideoProduct('video', productsResponse.data.video);
                        setValue('classifies[0][name]', 'size');
                        setValue('classifies[0][description]', 'kích thước');
                        setValue('classifies[0][classify_values][0][value]', productsResponse.data.size);
                        setValue('classifies[1][name]', 'color');
                        setValue('classifies[1][description]', 'Màu sắc');
                        setValue('classifies[1][classify_values][0][value]', productsResponse.data.color);
                    }
                }
            )()
        }
    }, [])
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
    const getBrand = (data = {}) => {
        (
            async() => {
                for (const field in data) {
                    if (!data[field]) {
                        delete data[field];
                    }
                }
                const brandResponse = await brandApis.index(data);
                if (brandResponse.success) {
                    setBrand(brandResponse.data);
                }
            }
        )()
    };
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
        formData.append('price', data.price);
        formData.append('discount', data.discount);
        formData.append('category_id', data.category_id)
        formData.append('brand_id', data.brand_id)
        formData.append('description', data.description)

        if (data.images) {
            formData.append('images', data.images[0]);
        }
        if (data.video) {
            formData.append('video', data.video[0])
        }
        formData.append('classifies[0][name]', 'size');
        formData.append('classifies[0][description]', 'kích thước');
        formData.append('classifies[0][classify_values][0][value]', data.size);
        formData.append('classifies[0][classify_values][0][image]', data.images[0]);

        formData.append('classifies[1][name]', 'color');
        formData.append('classifies[1][description]', 'Màu sắc');
        formData.append('classifies[1][classify_values][0][value]', data.color);

        const productsResponse = await productApi.store(formData);

        if (productsResponse.sucess) {
            navigate('/admin/product')
            toast.success (() => <p>Thêm mới sản phẩm <b>{productsResponse.data.name}</b>thành công</p>)
            return;
        }
        if (productsResponse.errors) {
            toast.error(() => <p>Thêm mới sản phẩm thất bại</p>)
        }
    }

    const update = async (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('price', data.price);
        formData.append('discount', data.discount);
        formData.append('category_id', data.category_id)
        formData.append('brand_id', data.brand_id)
        formData.append('description', data.description)

        if (data.images) {
            formData.append('images', data.images[0]);
        }
        if (data.video) {
            formData.append('video', data.video[0])
        }
        formData.append('classifies[0][name]', 'size');
        formData.append('classifies[0][description]', 'kích thước');
        formData.append('classifies[0][classify_values][0][value]', data.size);
        formData.append('classifies[0][classify_values][0][image]', data.images[0]);

        formData.append('classifies[1][name]', 'color');
        formData.append('classifies[1][description]', 'Màu sắc');
        formData.append('classifies[1][classify_values][0][value]', data.color);

        const productsResponse = await productApi.update(urlParams.productId, formData)
    
        if (productsResponse.success) {
            toast.success(() => <p>Cập nhật sản phẩm thành công</p>)

            return;
        }
        if (productsResponse.error) {
            toast.error(() => <p>Cập nhật sản phẩm thất bại</p>)
            return;
        }
    }
    
    return (
        <>
            <form className="form-create-product container col-6 pt-3"
                onSubmit={handleSubmit(isUpdateProduct ? update : store)}
            >
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
                    {errors.images && <p className="text-danger fw-bold">{errors.images.message}</p>}
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
                    {errors.video && <p className="text-danger fw-bold">{errors.video.message}</p>}
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
                    {errors.name && <p className="text-danger fw-bold">{errors.name.message}</p>}
                </div>

                <div className="product-name-group mb-4 d-flex">
                    <div className="size form-label">
                        <label className="form-label">
                            Kích thước sản phẩm
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputSize"
                            {...register ('size')}
                        />
                        {errors.size && <p className="text-danger fw-bold">{errors.size.message}</p>}
                    </div>
                    <div className="color form-label ms-4">
                        <label className="form-label">
                            Màu sắc sản phẩm
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputColor"
                            {...register ('color')}
                        />
                        {errors.color && <p className="text-danger fw-bold">{errors.color.message}</p>}
                    </div>
                </div>

                <div className="product-name-group mb-4 d-flex">
                    <div className="price">
                        <label htmlFor="inputPrice" className="form-label">
                            Giá sản phẩm
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputPrice"
                            {...register ('price', {
                                required: "Gía sản phẩm không được để trống",
                            })}
                        />
                        {errors.price && <p className="text-danger fw-bold">{errors.price.message}</p>}
                    </div>
                    <div className="discount ms-4">
                        <label htmlFor="inputDiscount" className="form-label">
                            Giảm giá
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputDiscount"
                            {...register ('discount')}
                        />
                        <span>.000 đ</span>
                        {errors.discount && <p className="text-danger fw-bold">{errors.discount.message}</p>}
                    </div>
                </div>

                <div className="product-category-group mb-4">
                    <label htmlFor="inputCategory" className="form-label">  
                        Lựa chọn ngành hàng
                    </label>
                    <select 
                        className="form-select"
                        {...register('category_id')}
                    >
                        <option>
                            Lựa chọn ngành hàng
                        </option>
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
                    {errors.category_id && <p className="text-danger fw-bold">{errors.category_id.message}</p>}
                </div>

                <div className="product-brand-group mb-4">
                    <label htmlFor="inputCategory" className="form-label">  
                        Chọn Thương hiệu sản phẩm
                    </label>
                    <select 
                        className="form-select"
                        {...register('brand_id')}
                    >  
                        <option>
                            Chọn thương hiệu sản phẩm
                        </option>
                        {
                            brand.data && brand.data.map((item) => {
                                return(
                                    <option value={item._id} key={item._id}>
                                        {item.name}
                                    </option>
                                )
                            })
                        }
                    </select>
                    {errors.brand_id && <p className="text-danger fw-bold">{errors.brand_id.message}</p>}
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
                    {errors.description && <p className="text-danger fw-bold">{errors.description.message}</p>}
                </div>

                <div className="cart-footer px-3">
                    {
                        (() => {
                            if (isUpdateProduct) {
                                return (
                                    <button className="btn btn-success">
                                        Cập nhật
                                    </button>
                                )
                            }
                            return (
                                <button className="btn btn-primary">
                                    Thêm mới
                                </button>
                            )
                        })()
                    }
                </div>
            </form>
        </>
    )
}