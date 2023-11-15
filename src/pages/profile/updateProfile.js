import HeaderNavbar from "../../component/headerNavbar"
import ContentHeader from "../../component/contentHeader"
import { useForm } from "react-hook-form"
import { useState, useEffect } from "react"
import {toast} from "react-toastify"
import profileApi from "../../api/profile"
import { useSelector, useDispatch } from "react-redux"
import { updateAuthUser } from "../../auth/authSlice"

export default function ProfileUpdate() {
    const dispatch = useDispatch();
    const [profileTitle] = useState('Profile')
    const [breadcrumb] = useState('Update Profile')
    const auth = useSelector(state => state.auth);
    const [urlAvatar, setUrlAvatar] = useState(auth.user?.avatar);

    const {
        register,
        handleSubmit,
        setValue
    } = useForm ({
        defaultValues: {
            username: '',
            avatar: null
        }
    });
    useEffect (() => {
        if (auth.user?.username) {
            setValue('username', auth.user?.username)
            setValue('avatar', auth.user?.avatar)
            setUrlAvatar( auth.user?.avatar)
        }
    },[auth.user])

    const changeAvatar = (e) => {
        const url = URL.createObjectURL(e.target.files[0]);
        setUrlAvatar(url);
    }

    const update = async (data) => {
        const formData = new FormData();
        formData.append('username', data.username);

        if (data.avatar) {
            formData.append('avatar', data.avatar[0]);
            const avatarUrl = URL.createObjectURL(data.avatar[0]);
        }
        try {
            const updateProfileResponse = await profileApi.update(formData);

            if (updateProfileResponse.success) {
                dispatch(updateAuthUser(updateProfileResponse.data))

                if (updateProfileResponse.success) {
                    toast.success(() => <p>Update profile thành công</p>);

                    return;
                }
                throw new Error();
            }
            throw new Error();
        } catch (e) {
            toast.error(() => <p>Update profile thất bại</p>)
        }
    };
    return(
        <>
            <HeaderNavbar/>
            <ContentHeader title={profileTitle} breadcrumb={breadcrumb}/>
            <section className={'content profile'}>
                <div className={'container-fluid'}>
                    <div className={'row'}>
                        <div className={'col-12'}>
                            <div className="card mb-3">
                                <div className="card-header text-white bg-success">
                                    <h3 className="card-title">title</h3>
                                </div>
                                <form onSubmit={handleSubmit(update)}>
                                    <div className={'p-3 col-6'}>
                                        <div className="mb-3 text-center">
                                            <img 
                                                src={urlAvatar} 
                                                className="mb-2 avatar-img" 
                                                alt={"avatar user"}
                                            />
                                            <input
                                                type="file"
                                                className="form-control"
                                               {...register('avatar', {
                                                    maxLength: {
                                                        value: 50,
                                                        message: 'tên avatar không được nhiều hơn 50 ký tự'
                                                    },
                                                    onChange: (e) => changeAvatar(e)
                                               })}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="inputName" className="form-label">Họ tên <span className={'text-danger fw-bold'}>*</span></label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="inputName"
                                               {...register('username', {
                                                    required: "Họ tên không được để trống",
                                                    maxLength: {
                                                        value: 50,
                                                        message: "Họ tên không được nhiều hơn 50 ký tự"
                                                    }
                                               })}
                                            />
                                            
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="inputName" className="form-label">Email <span className={'text-danger fw-bold'}>*</span></label>
                                            <input
                                                disabled={true}
                                                type="email"
                                                className="form-control"
                                                value={ auth.user?.email ?? '' }
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="inputPhone" className="form-label">Số điện thoại <span className={'text-danger fw-bold'}>*</span></label>
                                            <input
                                                disabled={true}
                                                type="text"
                                                className="form-control"
                                                value={ auth.user?.phone ?? '' }
                                            />
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <button className={'btn btn-success'}>
                                            Cập nhật
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                
            </section>
        </>
    )
}