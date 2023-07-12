import { axiosInstance } from "../../../interceptors/AxiosInterceptor";
import { AUTH_SECURE_USER_DETAILS_LS_LEY } from "../constants/constants";

export function doLogin(data, handleSuccess, handleFailure, handleLoading) {
    handleLoading(true);
    axiosInstance.post('/auth/signin', data)
        .then(res => {
            handleLoading(false);
            sessionStorage.setItem(AUTH_SECURE_USER_DETAILS_LS_LEY, JSON.stringify(res.data));
            handleSuccess();
        })
        .catch(err => {
            handleLoading(false);
            if (err.response && err.response.data) {
                // application specific error                    
                handleFailure(err.response?.data);
            } else {
                // generic axios error
                handleFailure(err.message);
            }
        });
}

export function doGenerateOTP(data) {
    return axiosInstance.post('/auth/generate/otp?channel=email', data);
}

export function doSignup(data, handleSuccess, handleFailure,  handleLoading) {
    handleLoading(true);
    axiosInstance.post('/auth/signup', data)
        .then(res => {
            handleLoading(false);
            handleSuccess();
        })
        .catch(err => {
            handleLoading(false);
            if (err.response && err.response.data) {
                // application specific error                    
                handleFailure(err.response?.data);
            } else {
                // generic axios error
                handleFailure(err.message);
            }
        });
}

export function doResetPassword(data, handleSuccess, handleFailure, handleLoading) {
    handleLoading(true);
    axiosInstance.post('/auth/reset', data)
        .then(res => {
            handleLoading(false);
            handleSuccess();
        })
        .catch(err => {
            handleLoading(false);
            if (err.response && err.response.data) {
                // application specific error                    
                handleFailure(err.response?.data);
            } else {
                // generic axios error
                handleFailure(err.message);
            }
        });
}


export function doLogout() {
    sessionStorage.removeItem(AUTH_SECURE_USER_DETAILS_LS_LEY);
}