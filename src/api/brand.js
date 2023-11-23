import adminAxios from "../plugins/axios";
import { getHeaderWithAuthorizationBearerToken } from "../helpers/common";
import { PAGINATION } from "../helpers/constants";
const baseRoute = 'admin/brand/';

const brandApis = {
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
    destroy: (brandId) => {
        return adminAxios.delete(baseRoute + brandId, {
            headers: getHeaderWithAuthorizationBearerToken()
        })
    },
    store: (data) => {
        return adminAxios.post(baseRoute, data, {
            headers: getHeaderWithAuthorizationBearerToken()
        })
    },
    show: (brandId) => {
        return adminAxios.get(baseRoute + brandId, {
            headers: getHeaderWithAuthorizationBearerToken()
        })
    },
    update: (brandId, data) => {
        return adminAxios.put(baseRoute + brandId, data, {
           headers: getHeaderWithAuthorizationBearerToken() 
        })
    }
}

export default brandApis;