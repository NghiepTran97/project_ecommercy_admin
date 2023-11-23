import adminAxios from "../plugins/axios";
const baseRoute = 'admin/auth/'
const authApi = {
    login: (data) => {
        return adminAxios.post(baseRoute + 'login', data)
    },
    
};

export default authApi;