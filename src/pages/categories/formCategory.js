import {useForm} from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import categoryApis from "../../api/category";
import {toast} from "react-toastify"
import { useEffect, useState } from "react";

export default function CategoryFormElement ({isUpdate = false}) {
    const [urlImageCategory, setUrlImageCategory] = useState();
    const {
        register,
        handleSubmit,
        formState: {errors},
        setError,
        setValue,
    } = useForm ({
        defaultValues: {
            name: '',
        }
    });
    let navigate = useNavigate();
    let urlParams = useParams();
    const changeImageCategory = (e) => {
        const url = URL.createObjectURL(e.target.files[0]);
        setUrlImageCategory(url);
    }

    useEffect(() => {
        if (isUpdate) {
            (
                async () => {
                    const categoryResponse = await categoryApis.show(urlParams.categoryId);
                    if(categoryResponse.success) {
                        setValue('name', categoryResponse.data.name)
                    }
                }
            )() 
        }
    },[])

    const store = async (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        if(data.image) {
            formData.append('image', data.image[0]);
        }
        const categoryResponse = await categoryApis.store(formData);
        console.log(categoryResponse.data);

        if(categoryResponse.success) {
            navigate('/admin/category')
            toast.success(() => <p>Thêm mới danh mục <b>{categoryResponse.data.name} thành công</b></p>)
            return;
        }

        if(categoryResponse.errors) {
            toast.error(() => <p>Thêm mới danh mục thất bại</p>)
            return;
        }
    }
    const update = async (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        if(data.image) {
            formData.append('image', data.image[0]);
        }
        const categoryResponse = await categoryApis.update(urlParams.categoryId, formData)

        if(categoryResponse.success) {
            toast.success(() => <p>Chỉnh sửa danh mục <b>{data.name}</b> thành công</p>)
            
            return;
        }
        if(categoryResponse.errors) {
            toast.error(() => <p>Chỉnh sửa danh mục thất bại</p>)
            return;
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(isUpdate ? update : store)}>
                <div className="px-2">
                    <div className="col-6 p-3">
                        <div className="mb-3">
                            <label htmlFor="inputName" className="form-label">
                                Tên danh mục
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputName"
                                {...register('name', {
                                    require: "Tên danh mục không được để trống",
                                    maxLength: {
                                        value: 20,
                                        message: "Tên danh mục không dài quá 20 ký tự"
                                    }
                                })}
                            />
                            {errors.name && <p className="text-danger fw-bold">{errors.name.message}</p>}
                        </div>
                        <div className="mb-3">
                            <img 
                                src={urlImageCategory}
                                className="mb-2 img-category" 
                                alt= 'image'
                            />
                            <input
                                type="file"
                                className="form-control"
                                {...register('image', {
                                    maxLength: {
                                        value: 100,
                                        message: 'tên logo không quá 100 ký tự'
                                    },
                                    onChange: (e) => changeImageCategory(e)
                                })}
                            /> 
                        </div>
                    </div>

                    <div className="cart-footer px-3">
                        {
                            (() => {
                                if (isUpdate) {
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
                </div>
            </form>
        </>
    )
}