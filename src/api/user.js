import adminAxios from "../plugins/axios";
import { getHeaderWithAuthorizationBearerToken } from "../helpers/common";
import { PAGINATION } from "../helpers/constants";
const baseRoute = 'admin/users/'


const userApis = {
    store: (data) => {
        return adminAxios.post(baseRoute, data,{
            headers: getHeaderWithAuthorizationBearerToken()
        })
    },
    index: (params = {}, page = PAGINATION.startPage, limit = PAGINATION.limit) => {

        return adminAxios.get(baseRoute, {
            params: {
                ...params,
                page,
                limit
            },
            headers: getHeaderWithAuthorizationBearerToken()
        });
    },
    destroy: (userId) => {
        return adminAxios.delete(baseRoute + userId, {
            headers: getHeaderWithAuthorizationBearerToken()
        });
    },
    show: (userId) => {
        return adminAxios.get(baseRoute + userId, {
            headers: getHeaderWithAuthorizationBearerToken()
        });
    },
    update: (userId, data) => {
        return adminAxios.put(baseRoute + userId, data, {
            headers: getHeaderWithAuthorizationBearerToken()
        });
    },
}

export default userApis;