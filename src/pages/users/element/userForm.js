import {useForm} from "react-hook-form"
import {USER} from "../../../helpers/constants"
import { useNavigate } from "react-router-dom";
import userApis from "../../../api/user";
import {toast} from "react-toastify"

export default function UserFormElement () {

    const {
        register,
        handleSubmit,
        setError,
    } = useForm ({
        defaultValues: {
            username: '',
            phone: '',
            level: USER.levels.user.value.toString()
        }
    });
    let navigate = useNavigate();

    const store = async (data) => {
        const userResponse = await userApis.store(data);

        if (userResponse.success) {
            navigate("/users");
            toast.success(() => <p>Thêm mới user <b>{userResponse.data.username}</b> thành công </p>);
            return;
        }

        if(!userResponse.errors.length) {
            toast.error(() => <p>Thêm mới user <b>{data.username}</b> thất bại</p>);
            return;
        }

        userResponse.errors.forEach((error) => {
            const [key, value] = Object.entries(error)[0]
            setError(key, {
                type: 'server',
                message: value.message
            })
        })
    }
    return (    
        <>
            <form onSubmit={handleSubmit(store)}>
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

                        <div className="mb-3">
                            <div>
                                <label className="form-lable">Phân quyền <span className='text-danger fw-bold'>*</span></label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    id="inputLevelAdmin"
                                    value={USER.levels.admin.value.toString()}
                                    {...register('level')}
                                />
                                <label htmlFor="inputLevelAdmin">
                                    {USER.levels.admin.label}
                                </label>
                            </div>

                            <div className="form-check">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    id="inputLevelUser"
                                    value={USER.levels.user.value.toString()}
                                    {...register('level')}
                                />
                                <label htmlFor="inputLevelUser">
                                    {USER.levels.user.label}
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="cart-footer px-3">
                        <button className="btn btn-primary">Thêm mới</button>
                    </div>
                </div>
            </form>
            
        </>
    )
}