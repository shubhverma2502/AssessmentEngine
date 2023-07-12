import { axiosInstance } from "../../../interceptors/AxiosInterceptor";

export function doGetProfile(handleSuccess, handleFailure, handleLoading) {
  handleLoading(true);
  axiosInstance
    .get("/profile/user")
    .then((res) => {
      handleSuccess(res.data, "GET_PROFILE");
      handleLoading(false);
    })
    .catch((err) => {
      if (err.response && err.response.data) {
        // application specific error
        handleFailure(err.response?.data);
        handleLoading(false);
      } else {
        // generic axios error
        handleFailure(err.message);
        handleLoading(false);
      }
    });
}
export function doPutProfile(data, handleSuccess, handleFailure, handleLoading) {
  handleLoading(true);
  axiosInstance
    .put("/profile/user", data)
    .then((res) => {
      handleSuccess(res.data);
      handleLoading(false);
    })
    .catch((err) => {
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
