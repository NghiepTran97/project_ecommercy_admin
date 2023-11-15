import { useForm } from "react-hook-form";
import profileApi from "../../api/profile";
import { useNavigate} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function ChangePassword() {

    const {
        register,
        handleSubmit,
        formState: {errors},
        setError,
        watch,
    } = useForm();
    let navigate = useNavigate();

    const changePassword = async (data) => {
        const changePasswordRequest = await profileApi.changePassword({
            password: data.password
        });
        if(changePasswordRequest.success) {
            toast.success(() => <p>Thay đổi mật khẩu thành công!</p>);
            navigate('/login');

            return;
        }
        
        if (changePasswordRequest.errors) {
            toast.error(() => <p>Có lỗi xảy ra, vui lòng thử lại</p>);
        }
    }


    return (
        <>
            <div className={'container-fluid row login-page justify-content-center align-items-center'}>
                <div className="card login-content p-0 bg-light">
                    <div className="card-body">
                        <h2 className={"text-center"}>Thay đổi mật khẩu</h2>
                        <form className={"pb-3"} onClick={handleSubmit(changePassword)}>
                            <div className="mb-3">
                                <label htmlFor="inputPassword" className="form-label">Mật khẩu mới</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="inputPassword"
                                    {
                                        ...register('password', {
                                            required: 'Mật khẩu không được để trống',
                                            maxLength: {
                                                value: 20,
                                                message: "Mật khẩu không được lớn hơn 20 ký tự"
                                            },
                                            minLength: {
                                                value: 8,
                                                message: "Mật khẩu không được ít hơn 8 ký tự"
                                            }
                                        })
                                    }
                                />
                                {errors.password && <p className={'text-danger fw-bold'}>{errors.password.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="inputPassword" className="form-label">Nhập lại mật khẩu</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="inputPassword"
                                    {
                                        ...register('confirm_password', {
                                            required: 'Mật khẩu không được để trống',
                                            maxLength: {
                                                value: 20,
                                                message: "Mật khẩu không được lớn hơn 20 ký tự"
                                            },
                                            minLength: {
                                                value: 6,
                                                message: "Mật khẩu không được ít hơn 6 ký tự"
                                            },
                                            validate: (val) => {
                                                if (watch('password') !== val) {
                                                    return "Nhập lại mật khẩu không chính xác";
                                                }
                                            },
                                        })
                                    }
                                />
                                {errors.confirm_password && <p className={'text-danger fw-bold'}>{errors.confirm_password.message}</p>}
                            </div>
                            <div className={'text-center'}>
                                <button type="submit" className="btn btn-success">Lưu</button>
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