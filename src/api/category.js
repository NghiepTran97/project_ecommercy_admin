import adminAxios from "../plugins/axios";
import { getHeaderWithAuthorizationBearerToken } from "../helpers/common";
import { PAGINATION } from "../helpers/constants";
const baseRoute = 'admin/category/';

const categoryApis = {
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
    store: (data) => {
        return adminAxios.post(baseRoute, data,{
            headers: getHeaderWithAuthorizationBearerToken()
        })
    },
    destroy: (categoryId) => {
        return adminAxios.delete(baseRoute + categoryId, {
           headers: getHeaderWithAuthorizationBearerToken()
        })
    },
    show: (categoryId) => {
        return adminAxios.get(baseRoute + categoryId, {
            headers: getHeaderWithAuthorizationBearerToken()
        })
    },
    update: (categoryId, data) => {
        return adminAxios.put(baseRoute + categoryId, data, {
            headers: getHeaderWithAuthorizationBearerToken()
        });
    }
}

export default categoryApis;