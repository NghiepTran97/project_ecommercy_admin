import {useForm} from "react-hook-form"
import { useParams } from "react-router-dom";
import userApis from "../../../api/user";
import {toast} from "react-toastify"
import { useEffect } from "react";

export default function UserFormEdit () {

    const {
        register,
        handleSubmit,
        setError,
        setValue,
    } = useForm();
    let urlParams = useParams();

    useEffect(() => {
        (
            async () => {
                const userResponse = await userApis.show(urlParams.userId);
                if(userResponse.success) {
                    setValue('username', userResponse.data.username)
                    setValue('email', userResponse.data.email)
                    setValue('phone', userResponse.data.phone)
                }
            }
        )() 
    },[])

    const update = async (data) => {
        const userResponse = await userApis.update(urlParams.userId, data);

        if(userResponse.success) {
            toast.success(() => <p>Cập nhật user <b>{data.name}</b> thành công</p>)
            return;
        }

        if(!userResponse.errors.length) {
            toast.error(() => <p>Cập nhật user <b>{data.name}</b> thất bại</p>)
        }

        userResponse.errors.forEach((error) => {
            const [key, value] = Object.entries(error)[0];
            setError(key, {
                type: 'server',
                message: value.message
            })
        });
    }   

    return (
        <>
            <form onSubmit={handleSubmit(update)}>
                <div className="px-2">
                    <div className="col-6 p-3">
                        <div className="mb-3">
                            <label htmlFor="inputName" className="form-lable">Họ tên <span className='text-danger fw-bold'>*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputName"
                                {...register('username', {
                                    required: 'Họ tên không được để trống',
                                    maxLength: {
                                        value: 16,
                                        message: "Họ tên không quá {value} ký tự"
                                    }
                                })}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="inputEmail" className="form-lable">Email <span className='text-danger fw-bold'>*</span></label>
                            <input
                                type="email"
                                className="form-control"
                                id="inputEmail"
                                {...register('email', {
                                    required: 'Eamil không được để trống',
                                    maxLength: {
                                        value: 50,
                                        message: "Eamil không quá 50 ký tự"
                                    }
                                })}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="inputPhone" className="form-lable">Số điện thoại <span className='text-danger fw-bold'>*</span></label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputPhone"
                                {...register('phone', {
                                    required: 'Số điện thoại không được để trống',
                                    maxLength: {
                                        value: 11,
                                        message: "Số điện thoại không nhiều hơn 11 số"
                                    },
                                    minLength: {
                                        value: 10,
                                        message: "Số điện thoại không ít hơn 10 số"
                                    }
                                })}
                            />
                        </div>
                    </div>
                    <div className="cart-footer px-3">
                        <button className="btn btn-success">Cập nhật</button>
                    </div>
                </div>
            </form>
        </>
    )
}