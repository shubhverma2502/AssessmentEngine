import { axiosInstance } from "../../../interceptors/AxiosInterceptor";

export function doGetQuestionTypes(
  handleSuccess,
  handleFailure,
  handleLoading
) {
  axiosInstance
    .get("/content/questionTypes")
    .then((res) => {
      handleLoading(false);
      handleSuccess(res.data, "GET_QUESTION_TYPES");
    })
    .catch((err) => {
      if (err.response && err.response.data) {
        // application specific error
        handleLoading(false);
        handleFailure(err.response?.data);
      } else {
        // generic axios error
        handleFailure(err.message);
      }
    });
}
export function doCreateQuestion(
  data,
  handleSuccess,
  handleFailure,
  handleLoading
) {
  axiosInstance
    .post("/content/create/question", data)
    .then((res) => {
      handleLoading(false);
      handleSuccess(res.data);
    })
    .catch((err) => {
      if (err.response && err.response.data) {
        // application specific error
        handleLoading(false);
        handleFailure(err.response?.data);
      } else {
        // generic axios error
        handleFailure(err.message);
      }
    });
}
export function doSearchQuestions(
  data,
  handleSuccess,
  handleFailure,
  handleLoading
) {
  handleLoading(true);
  axiosInstance
    .post("/exam/allQuestions", data)
    .then((res) => {
      handleLoading(false);
      handleSuccess(res.data);
    })
    .catch((err) => {
      handleLoading(false);
      handleFailure(err);
    });
}
export function doGetQuestionbyTag(data, handleSuccess, handleFailure, handleLoading) {
  handleLoading(true);
  axiosInstance
    .post("/exam/get/questions", data)
    .then((res) => {
      handleLoading(false);
      handleSuccess(res.data);
    })
    .catch((err) => {
      handleLoading(false);
      if (err.response && err.response.data) {
        handleFailure(err.response.data);
      } else {
        handleFailure(err.message);
      }
    });
}
