import adminAxios from "../plugins/axios";
import { getHeaderWithAuthorizationBearerToken } from "../helpers/common";
const baseRoute = 'admin/auth/'
const authApi = {
    login: (data) => {
        return adminAxios.post(baseRoute + 'login', data)
    },
    changePassword: (data) => {
        return adminAxios.put(baseRoute + 'confirm-account/change-password', data, {
            headers: getHeaderWithAuthorizationBearerToken()
        });
    },
    
};

export default authApi;