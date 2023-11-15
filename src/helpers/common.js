import {Cookies} from "react-cookie";

export const getHeaderWithAuthorizationBearerToken = () => {
    const cookies = new Cookies();
    const userToken = cookies.get('userToken') ?? '';

    return {
        Authorization: `Bearer ${userToken}`,
    }
}

export const generateFileToUrl = (file, type = "application/octet-stream") => {
    const blob = new Blob([new Uint8Array(file)], {type});

    return URL.createObjectURL(blob);
}