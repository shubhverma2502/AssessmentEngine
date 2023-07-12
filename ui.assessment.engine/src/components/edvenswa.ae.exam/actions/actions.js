import { axiosInstance } from "../../../interceptors/AxiosInterceptor";

export function doGetexams(type, page, size, handleSuccess, handleFailure, handleLoading) {
  handleLoading(true);
  axiosInstance
    .get(`/exam/list?examType=${type}&page=${page}&size=${size}`)
    .then((res) => {
      handleLoading(false);
      handleSuccess(res.data);
    })
    .catch((err) => {
      handleLoading(false);
      handleFailure(err);

    });
};

export function doPostUserSession(data, handleSuccess, handleFailure, handleLoading) {
  handleLoading(true);
  axiosInstance
    .post("/exam/session", data)
    .then(res => {
      handleLoading(false);
      handleSuccess(res.data);
    })
    .catch(err => {
      handleLoading(false);
      handleFailure(err);
    });
};

export function doPostExamStateSession(data, handleSuccess, handleFailure, handleLoading) {
  handleLoading(true);
  axiosInstance
    .post(`/exam/session/state`, data)
    .then((res) => {
      handleLoading(false);
      handleSuccess(res.data);
    })
    .catch((err) => {
      handleLoading(false);
      handleFailure(err);
    });
};

export function doGenerateReport(data, handleSuccess, handleFailure, handleLoading) {
  handleLoading(true);
  axiosInstance
    .post("/exam/report", data)
    .then((res) => {
      handleLoading(false);
      handleSuccess(res.data);
    })
    .catch((err) => {
      handleLoading(false);
      handleFailure(err);
    });
}

export function doExitSession(sessionId, handleFailure, handleLoading) {
  handleLoading(true);
  axiosInstance
    .delete(`/exam/session/state/${sessionId}`)
    .then((res) => {
      handleLoading(false);
      console.log(res);
    })
    .catch((err) => {
      handleLoading(false);
      handleFailure(err);
    });
}

export function doGetQuestionsByCoursesAndLevel(data, handleSuccess, handleFailure, handleLoading) {
  handleLoading(true);
  axiosInstance.post("/exam/questions", data)
    .then(res => {
      handleLoading(false);
      handleSuccess(res.data);
    })
    .catch(err => {
      handleLoading(false);
      handleFailure(err);
    })
};

export function doGetQuestionsByIds(data, handleSuccess, handleFailure, handleLoading) {
  handleLoading(true);
  axiosInstance.post("/exam/id/questions", data)
    .then(res => {
      handleLoading(false);
      handleSuccess(res.data);
    })
    .catch(err => {
      handleLoading(false);
      handleFailure(err);
    })
};
export function doGetRandomQuestions(data, handleSuccess, handleFailure, handleLoading) {
  handleLoading(true);
  axiosInstance.post("/exam/random/questions", data)
    .then(res => {
      handleLoading(false);
      handleSuccess(res.data);
    })
    .catch(err => {
      handleLoading(false);
      handleFailure(err);
    })
};

export function doGetCourses(handleSuccess, handleFailure) {
  axiosInstance.get("/exam/courses")
    .then(res => {
      handleSuccess(res.data, "GET_COURSES");
    })
    .catch(err => {
      handleFailure(err);
    });
};

export function doGetExamLevels(handleSuccess, handleFailure) {
  axiosInstance.get("/exam/levels")
    .then(res => {
      handleSuccess(res.data, "GET_LEVELS");
    })
    .catch(err => {
      handleFailure(err);
    });
};

export function doGetGroups(handleSuccess, handleFailure) {
  axiosInstance.get("/tenant/groups")
    .then(res => {
      handleSuccess(res.data, "GET_GROUPS");
    })
    .catch(err => {
      handleFailure(err);
    });
};

export function doGetExamTypes(handleSuccess, handleFailure) {
  axiosInstance.get("/exam/types")
    .then(res => {
      handleSuccess(res.data, "GET_TYPES");
    })
    .catch(err => {
      handleFailure(err);
    });
};
export function doGetQuestionsGenerateModes(handleSuccess, handleFailure) {
  axiosInstance.get("/exam/questionsGenerateModes")
    .then(res => {
      handleSuccess(res.data, "GET_QUESTIONS_GENERATE_MODES");
    })
    .catch(err => {
      handleFailure(err);
    });
};

export function doDeleteExams(examId, handleSuccess, handleFailure) {
  axiosInstance
    .delete(`/exam/delete/${examId}`)
    .then((res) => {
      handleSuccess(examId);
    })
    .catch((err) => {
      handleFailure(err);
    });
};


export function doCreateExam(data, handleSuccess, handleFailure, handleLoading) {
  handleLoading(true);
  axiosInstance.post('/exam/create', data)
    .then(res => {
      handleSuccess(res?.data);
      handleLoading(false);
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

export function doModifyExam(data, handleSuccess, handleFailure) {
  axiosInstance
    .put(`/exam/modify`, data)
    .then((res) => {
      handleSuccess();
    })
    .catch((err) => {
      handleFailure(err);
    });
}

export function doModifyExamStatus(data) {
  axiosInstance
    .put(`/exam/status`, data)
}