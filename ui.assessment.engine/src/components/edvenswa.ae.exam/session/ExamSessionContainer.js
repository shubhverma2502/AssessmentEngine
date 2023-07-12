import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import QuestionFrame from "./QuestionFrame";
import AnswerFrame from "./AnswerFrame";
import ActionsFrame from "./ActionsFrame";
import { Container } from "@mui/system";
import ExamHeader from "./ExamHeader";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { doExitSession, doGetQuestionsByIds } from "../actions/actions";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import ExamReport from "./ExamReport";

export default function ExamSessionContainer(props) {
  const location = useLocation();

  const params = useParams();

  const navigate = useNavigate();

  const [exam, setExam] = useState({});

  const [questions, setQuestions] = useState([]);

  const handle = useFullScreenHandle();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [showReport, setShowReport] = useState(false);

  const [timeTaken, setTimeTaken] = useState(0);

  useEffect(() => {
    if (location && location.state && location.state.exam) {
      const exam = location.state.exam;

      setExam(exam);

      doGetQuestionsByIds(
        { questions: exam.questions ? exam.questions : [] },

        handleSuccess,

        handleFailure,

        handleLoading
      );

      handle.enter();
    }

    // eslint-disable-next-line
  }, [location]);

  const handleSuccess = (data) => {
    setQuestions(data);
  };

  const handleFailure = (error) => {
    props.onError(error);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }

    if (currentQuestionIndex === questions.length - 1) {
      // end of the exam and current iterator has travesered all the questions

      setShowReport(true);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleLoading = (state, disableLoader) => {
    props.onLoading(state, disableLoader);
  };

  const handleTimeout = () => {
    setShowReport(true);
  };

  const handleExitSession = () => {
    handle.exit();

    doExitSession(params.sessionId, handleFailure, handleLoading);

    navigate("/home");
  };

  const handletimeTaken = (value) => {
    setTimeTaken(value);
  };
  
  return (
    <FullScreen handle={handle}>
      <Container style={{ marginTop: "2rem" }} component="main" maxWidth="md">
        {showReport ? (
          <ExamReport
            sessionId={params.sessionId}
            onError={handleFailure}
            onLoading={handleLoading}
            loading={props.loading}
            onExitSession={handleExitSession}
            totalQuestions={questions.length}
            title={exam?.courses[0]?.courseName}
            level={exam?.level}
            type={exam?.examType}
            passPercentage={exam?.passPercentage}
            finishedDate={new Date().toDateString()}
            timeTaken={Math.floor(timeTaken * 100) / 100}
          />
        ) : (
          <Grid container spacing={2}>
            {props.loading ? (
              <React.Fragment></React.Fragment>
            ) : questions && questions.length > 0 ? (
              <React.Fragment>
                <Grid item xs={12}>
                  <ExamHeader
                    title={exam?.courses[0]?.courseName}
                    duration={exam?.duration}
                    level={exam?.level}
                    onTimeout={handleTimeout}
                    ontimeTaken={handletimeTaken}
                  ></ExamHeader>
                </Grid>

                <Grid item xs={12}>
                  <QuestionFrame
                    questions={questions}
                    currentQuestionIndex={currentQuestionIndex}
                  ></QuestionFrame>

                  <AnswerFrame
                    questions={questions}
                    currentQuestionIndex={currentQuestionIndex}
                    onLoading={handleLoading}
                    loading={props.loading}
                  ></AnswerFrame>
                </Grid>

                <Grid item xs={12}>
                  <ActionsFrame
                    currentQuestionIndex={currentQuestionIndex}
                    questions={questions}
                    onPrev={handlePrevQuestion}
                    onNext={handleNextQuestion}
                  ></ActionsFrame>
                </Grid>
              </React.Fragment>
            ) : (
              <></>
            )}
          </Grid>
        )}
      </Container>
    </FullScreen>
  );
}
