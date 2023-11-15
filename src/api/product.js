import adminAxios from "../plugins/axios";
import { getHeaderWithAuthorizationBearerToken } from "../helpers/common";
import { PAGINATION } from "../helpers/constants";
const baseRoute = 'admin/product/'

const productApi = {
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
    destroy: (productId) => {
        return adminAxios.delete(baseRoute + productId, {
            headers: getHeaderWithAuthorizationBearerToken()
        })
    },
    store: (data) => {
        return adminAxios.post(baseRoute, data, {
            headers: getHeaderWithAuthorizationBearerToken()
        })
    }
}

export default productApi;