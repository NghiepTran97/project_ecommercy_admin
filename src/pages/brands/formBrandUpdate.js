import {useForm} from "react-hook-form";
import { useParams } from "react-router-dom";
import {toast} from "react-toastify"
import { useEffect, useState } from "react";
import brandApis from "../../api/brand";

export default function BrandFormUpdate () {
    const [urlLogoBrand, setUrlLogoBrand] = useState();
    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue,
    } = useForm ();
    let urlParams = useParams();

    const changeLogoBrand = (e) => {
        const url = URL.createObjectURL(e.target.files[0]);
        setUrlLogoBrand(url);
    }

    useEffect (() => {
        (
            async () => {
                const brandResponse = await brandApis.show(urlParams.brandId);
                if(brandResponse.success) {
                    setValue('name', brandResponse.data.name)
                    setValue('description', brandResponse.data.description)
                    setUrlLogoBrand('logo', brandResponse.data.logo)
                }
            }
        )()
    },[])
    
    const update = async (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        if(data.logo) {
            formData.append('logo', data.logo[0]);
        }

        const brandResponse = await brandApis.update(urlParams.brandId, formData);
        if(brandResponse.success) {
            toast.success(() => <p>Cập nhật brand <b>{data.name}</b> thành công</p>)
            return;
        }
        
        if(brandResponse.error) {
            toast.error(() => <p>Cập nhật brand thất bại</p>)
        }
    }
    return (
        <>
            <div className="create-brand">
                <form onSubmit={handleSubmit(update)}>
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
                            <button className={'btn btn-success'}>
                                Cập nhật
                            </button>
                        </div>
                    </div>
                    
                </form>
            </div>
        </>
    )
}