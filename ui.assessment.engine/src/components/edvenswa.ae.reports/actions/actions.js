import { axiosInstance } from "../../../interceptors/AxiosInterceptor";

export function doGetReports(handleSuccess, handleFailure, handleLoading) {
  handleLoading(true); 
  axiosInstance.get("/reports/results")
      .then(res => {
        handleSuccess(res.data);
        handleLoading(false);
      })
      .catch(err => {
        handleFailure(err);
        handleLoading(false);
      });
  };
