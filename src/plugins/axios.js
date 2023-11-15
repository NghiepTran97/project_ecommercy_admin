import axios from "axios";
const STATUS_SUCCESS = [200,201];
const STATUS_INTERNAL_SERVER_ERROR = 500;
console.log(process.env.REACT_APP_DOMAIN_API);
const adminAxios = axios.create({
    baseURL: process.env.REACT_APP_DOMAIN_API,
});
adminAxios.interceptors.response.use(
    (response) => {
        const statusCode = response.status
        if (STATUS_SUCCESS.includes(statusCode)) {
            return {
                success: true,
                data: response.data.data,
                time_current: response.data.now,
            }
        }
        return {
            success: false,
            data: [],
        }
    },
    (error) => {
        if (error.response) {
            const response = error.response
            return {
                success: false,
                status: response.status,
                message: response.data.message,
                errors: response.data.errors,
            };
        }
        if (error.request) {
            return {
                success: false,
                status: STATUS_INTERNAL_SERVER_ERROR,
                message: error.statusText,
                errors: error,
            }
        }
        return {
            success: false,
            status: STATUS_INTERNAL_SERVER_ERROR,
            message: error,
        }
    }
);

export default adminAxios;