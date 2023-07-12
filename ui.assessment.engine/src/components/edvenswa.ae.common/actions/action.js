import { axiosInstance } from "../../../interceptors/AxiosInterceptor";

export function doSearch(data, handleSuccess, handleFailure, handleLoading) {
    handleLoading(true);
    axiosInstance.post("/tenant/search", data)
        .then(res => {
            handleLoading(false);
            handleSuccess(res.data);
        })
        .catch(err => {
            handleLoading(false);
            handleFailure(err);
        })
}