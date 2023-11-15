import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { updateAuthBrand } from "../../auth/authBrand";
import { useState } from "react";
import brandApis from "../../api/brand";
import { useForm } from "react-hook-form";

export default function BrandFormElement () {
    const [urlLogoBrand, setUrlLogoBrand] = useState();
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

    const changeLogoBrand = (e) => {
        const url = URL.createObjectURL(e.target.files[0]);
        setUrlLogoBrand(url);
    }

    const store = async (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        
        if(data.logo) {
            formData.append('logo', data.logo[0]);
        }
       
        const brandResponse = await brandApis.store(formData);

        if(brandResponse.success) {
            navigate('/brand')
            toast.success(() => <p>Thêm mới brand <b>{brandResponse.data.name}</b> thành công</p>)
        
            return;
        }
        if(!brandResponse.errors.length) {
            toast.error(() => <p>Thêm mới brand thất bại</p>)

            return;
        }

        brandResponse.errors.forEach((error) => {
            const [key, value] = Object.entries(error)[0]
            setError(key, {
                type: 'server',
                message: value.message
            })
        })
    }

    return (
        <>  
            <div className="create-brand">
                <form onSubmit={handleSubmit(store)}>
                    <div className={'p-3 col-6'}>
                        <div className="mb-3 text-center">
                            <img 
                                src={urlLogoBrand}
                                className="mb-2 logo-img" 
                                alt= 'logo brand'
                            />
                            <input
                                type="file"
                                className="form-control"
                                {...register('logo', {
                                    maxLength: {
                                        value: 100,
                                        message: 'tên logo không quá 100 ký tự'
                                    },
                                    onChange: (e) => changeLogoBrand(e)
                                })}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="inputName" className="form-label">Tên<span className={'text-danger fw-bold'}>*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputName"
                                {...register('name', {
                                    required: "Tên brand không được để trống",
                                    maxLength: {
                                        value: 50,
                                        message: "Tên brand không được quá 50 ký tự"
                                    }
                                })}
                            />
                             {errors.name && <p className="text-danger fw-bold">{errors.name.message}</p>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputDescription" className="form-label">Description<span className={'text-danger fw-bold'}>*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputDescription"
                                {...register('description', {
                                    maxLength: {
                                        value: 100,
                                        message: "Mô tả không quá 100 ký tự"
                                    }
                                })

                                }
                            />
                             {errors.description && <p className="text-danger fw-bold">{errors.description.message}</p>}
                        </div>

                        <div className="card-footer text-center">
                            <button className={'btn btn-primary'}>
                                Thêm mới
                            </button>
                        </div>
                    </div>
                    
                </form>
            </div>
            
        </>
    )
}