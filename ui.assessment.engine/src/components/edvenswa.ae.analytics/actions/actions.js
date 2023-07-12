import { axiosInstance } from "../../../interceptors/AxiosInterceptor";

export function doGetAnalytics(handleSuccess, handleFailure, handleLoading) {
    handleLoading(true);
    axiosInstance
      .get("/analytics/get")
      .then((res) => {
        handleLoading(false);
        handleSuccess(res.data);
      })
      .catch((err) => {
        handleLoading(false);
        handleFailure(err);
      });
  };
export function doGetExamAnalytics(handleSuccess, handleFailure, handleLoading) {
    handleLoading(true);
    axiosInstance
      .get("/exam/analytics")
      .then((res) => {
        handleLoading(false);
        handleSuccess(res.data);
      })
      .catch((err) => {
        handleLoading(false);
        handleFailure(err);
      });
  };
