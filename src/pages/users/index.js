import {Link} from "react-router-dom";
import { useEffect } from "react";
import { useRef } from "react";
import { PAGINATION, USER } from "../../helpers/constants";
import userApis from "../../api/user";
import { useState } from "react";
import CustomPagination from "../../component/CustomPagination";
import { getValue } from "@testing-library/user-event/dist/utils";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { toast } from "react-toastify";
import HeaderNavbar from "../../component/headerNavbar";
import ContentHeader from "../../component/contentHeader";

const userIndexSwal = withReactContent(Swal);
export default function UserIndex() {
    const [userTitle] = useState('Quản lý user')
    const [breadcrumb] = useState('Danh sách user')

    const [users, setUsers] = useState({});
    const currentPage = useRef(PAGINATION.page);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = (data = {}, page = PAGINATION.currentPage) => {
        if (page !== currentPage.current) {
            currentPage.current = page;
        }
        (
            async () => {
                for (const field in data) {
                    if (!data[field]) {
                        delete data[field];
                    }
                }
                const usersResponse = await userApis.index(data, page);
                
                if (usersResponse.success) {  
                    setUsers(usersResponse.data);
                }
            }
        )()
    };

    const handleDelete = async (userId) => {
        userIndexSwal.fire({
            title: "bạn có muốn xóa user này không",
            showCancleButton: true,
            confirmButtonText: "Đồng ý",
            cancleButtonText: "Hủy"
        }).then (async (result) => {
            if (result.isConfirmed) {
                const deleteUser = await userApis.destroy(userId);

                if(deleteUser.success) {
                    toast.success(() => <p>Xóa user thành công</p>)
                    getUsers(getValue(), currentPage.current)
                }
            }
        })
    }

    return (
        <>
            <HeaderNavbar/>
            <ContentHeader title={userTitle} breadcrumb={breadcrumb}/>
            <div className="cart-body px-2">
                <table className="table table-bordered">
                    <thead>
                        <tr className="text-center">
                            <th style={{with:10}}>#</th>
                            <th>Họ tên</th>
                            <th>Email</th>
                            <th>Số điện thoại</th>
                            <th>Phân quyền</th>
                            <th style={{with:`15%`}}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.data && users.data.map( (user, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            {index + 1}
                                        </td>
                                        <td>
                                            {user.username}
                                        </td>
                                        <td>
                                            {user.phone}
                                        </td>
                                        <td>
                                            {user.email}
                                        </td>
                                        <td>
                                            {
                                                Object.values(USER.levels).find( level => level.value === user.level).label
                                            }
                                        </td>
                                        <td className={'text-center'}>
                                            <button type="button" className="btn btn-danger me-2" onClick={() => handleDelete(user._id)}>Xóa</button>
                                            <Link to={user._id + '/edit' } className="btn btn-success">Chỉnh sửa</Link>
                                        </td>
                                    </tr>
                                )
                                
                            }) 
                        }
                    </tbody>
                </table>
                <CustomPagination
                    page={users.page}
                    pages={users.pages}
                    onPageChange={page => getUsers(getValue(), page)}
                />
            </div>
        </>
    )
}