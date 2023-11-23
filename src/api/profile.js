import adminAxios from "../plugins/axios";
import { getHeaderWithAuthorizationBearerToken } from "../helpers/common";
const baseRoute = 'admin/profile/'

const profileApi = {
    show: () => {
        return adminAxios.get(baseRoute, {
            headers: getHeaderWithAuthorizationBearerToken()
        });
    },
    update: (data) => {
        return adminAxios.put(baseRoute + 'update', data,{
            headers: getHeaderWithAuthorizationBearerToken()
        });
    },
    changePassword: (data) => {
        return adminAxios.put(baseRoute + 'change-password', data, {
            headers: getHeaderWithAuthorizationBearerToken()
        });
    },
    
}

export default profileApi;