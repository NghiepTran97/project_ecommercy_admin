import {useForm} from "react-hook-form";
import authApi from "../../api/auth";
import { useNavigate } from "react-router-dom";
import {toast, ToastContainer} from "react-toastify"
import { Cookies, useCookies } from "react-cookie";

export default function Login() {
    
    const [cookies, setCookie] = useCookies(['userToken']);
    const {
        register,
        handleSubmit,
        formState: {errors},
        setError
    } = useForm();
    let navigate = useNavigate();
    const login = async (data) => {
        const loginResponse = await authApi.login(data);

        if(loginResponse.success) {
            setCookie('userToken', loginResponse.data.token, {exprires: 30}) 
            navigate('/')

            return;
        }
        if (loginResponse.errors) {
            toast.error(() => <p>Đăng nhập thất bại</p>)
        }
    } 

    return (
        <>
            <div className={'container-fluid row login-page justify-content-center align-items-center'}>
                <div className="card login-content p-0 bg-light">
                    <div className="card-body">
                        <div className={'text-center'}>
                            <img src="/images/anh-cr7.jpg" alt="AdminLTE Logo" className="brand-image elevation-3"/>
                        </div>
                        <form className="pb-3" onSubmit={handleSubmit(login)}>  
                            <div className="mb-3">
                                <label htmlFor="inputPhone" className="form-label">Số điện thoại</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputPhone"
                                    {...register('userEmailPhone', {
                                        required:'Số điện thoại không được để trống',
                                        maxLength: {
                                            value: 50,
                                            message: "Số điện thoại hoặc email không được lớn hơn 50 ký tự"
                                        },
                                        minLength: {
                                            value: 10,
                                            message: "Số điện thoại không được ít hơn 10 ký tự"
                                        }
                                    })}
                                    
                                />
                                {errors.phone && <p className={'text-danger fw-bold'}>{errors.phone.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="inputPassword" className="form-label">Mật khẩu</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="inputPassword"
                                    {...register('password', {
                                            required: 'Mật khẩu không được để trống',
                                            maxLength: {
                                                value: 20,
                                                message: "Mật khẩu không được lớn hơn 20 ký tự"
                                            },
                                            minLength: {
                                                value: 6,
                                                message: "Mật khẩu không được ít hơn 6 ký tự"
                                            }
                                        })}
                                />
                                {errors.password && <p className={'text-danger fw-bold'}>{errors.password.message}</p>}
                            </div>
                            <div className={'text-center'}>
                                <button type="submit" className="btn btn-primary">Đăng nhập</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                />
                {/* Same as */}
            <ToastContainer />
        </>
    )
}