import adminAxios from "../plugins/axios";
const baseRoute = 'auth/'
const authApi = {
    login: (data) => {
        return adminAxios.post(baseRoute + 'login', data)
    },
    
};

export default authApi;