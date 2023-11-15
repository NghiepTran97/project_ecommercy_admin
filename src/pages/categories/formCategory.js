import {useForm} from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import categoryApis from "../../api/category";
import {toast} from "react-toastify"
import { useEffect } from "react";

export default function CategoryFormElement ({isUpdate = false}) {

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
        const categoryResponse = await categoryApis.store(data);

        if(categoryResponse.success) {
            navigate('/category')
            toast.success(() => <p>Thêm mới danh mục <b>{categoryResponse.data.name} thành công</b></p>)
            return;
        }

        if(!categoryResponse.errors.length) {
            toast.error(() => <p>Thêm mới danh mục thất bại</p>)
            return;
        }

        categoryResponse.errors.forEach((error) => {
            const [key, value] = Object.entries(error)[0]
            setError(key, {
                type: 'server',
                message: value.message
            })
        })
    }
    const update = async (data) => {
        const categoryResponse = await categoryApis.update(urlParams.categoryId, data)

        if(categoryResponse.success) {
            toast.success(() => <p>Chỉnh sửa danh mục <b>{data.name}</b> thành công</p>)
            
            return;
        }
        if(!categoryResponse.errors.length) {
            toast.error(() => <p>Chỉnh sửa danh mục thất bại</p>)
            return;
        }
        categoryResponse.errors.forEach((error) => {
            const [key, value] = Object.entries(error)[0];
            setError(key, {
                type: 'server',
                message: value.message
            })
        })
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