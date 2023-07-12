import { Card, CardContent, Chip, Container, Grid, Pagination, Stack, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../interceptors/AxiosInterceptor";
import SortFilter from "../edvenswa.ae.common/filter/SortFilter";
import SearchFilter from "../edvenswa.ae.common/search/SearchFilter";
import { doGetexams } from "./actions/actions";

const ExamCard = React.lazy(() => import("./ExamCard"));

const Exams = (props) => {
  const [exams, setExams] = useState([]);
  const [filteredExams, setFilteredExams] = useState([]);
  const [examSession, setExamSession] = useState({});
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(6);
  const [loading, setLoading] = useState(false);
  const [examsCount, setExamsCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const type = location.state.examType ? location.state.examType : "ALL";
  console.log(type);
    doGetexams(type, page, size, handleSuccess, handleFailure, handleLoading);
    axiosInstance
      .get("/exam/session")
      .then((res) => {
        setExamSession(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    if (examsCount === 0) {
      axiosInstance.get(`/exam/count?examType=${type}`).then((res) => {
        setExamsCount(res.data);
      })
    }
    // eslint-disable-next-line
  }, [page]);

  const handleSuccess = (exams) => {
    setExams(exams);
    setFilteredExams(exams);
  };

  const handleFailure = (error) => {
    props.onError(error);
  };

  const handleLoading = (state) => {
    setLoading(state);
    props.onLoading(state);
  };

  const handlePageChange = (event, value) => {
    event.preventDefault();
    setSize(6);
    setPage(value);
  };

  return (
    <Container maxWidth="lg" component={"main"}>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            {props.hasAdminAccess ? (
              <Grid item xs={4} sm={4} md={4} lg={4}>
                <Chip
                  label="Create Exam"
                  size="small"
                  onClick={(event) => {
                    event.preventDefault();
                    navigate("/console/exams/create");
                  }}
                />
              </Grid>
            ) : (
              <Grid item xs={4} sm={4} md={4} lg={4} />
            )}
            <Grid item xs={4} sm={4} md={4} lg={4} sx={{ display: "grid", justifyContent: "center" }}>
              {
                filteredExams && filteredExams.length > 0
                  ? <Pagination
                    count={Math.ceil(examsCount / size)}
                    onChange={handlePageChange}
                    color="primary"
                    showFirstButton
                    showLastButton
                    size="small"
                  />
                  : <Fragment />
              }
            </Grid>
            <Grid
              item
              xs={4} sm={4} md={4} lg={4}
              sx={{ display: "grid", justifyContent: "end" }}
            >
              <Stack direction="row" spacing={1}>
                <SearchFilter
                  elements={exams}
                  searchKey="title"
                  filteredElements={filteredExams}
                  setFilteredElements={setFilteredExams}
                />
                <SortFilter
                  elements={exams}
                  searchKey="level"
                  setFilteredElements={setFilteredExams}
                />
              </Stack>
            </Grid>
            {props.loading ? (
              <React.Fragment></React.Fragment>
            ) : filteredExams && filteredExams.length > 0 ? (
              filteredExams.map((exam, index) => {
                return (
                  !props?.hasAdminAccess ? (
                    exam?.active ? (
                      <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
                        <ExamCard
                          onLoading={props.onLoading}
                          onError={props.onError}
                          onSuccess={props.onSuccess}
                          exam={exam}
                          onDelete={(examId) =>
                            setExams(exams.filter((exam) => exam.id !== examId))
                          }
                          hasAdminAccess={props?.hasAdminAccess}
                          examSession={examSession}
                        />
                      </Grid>
                    ) : (
                      <React.Fragment key={index} />
                    )
                  ) : (
                    <Grid item key={index} xs={12} sm={6} md={4} lg={4}>
                      <ExamCard
                        onLoading={props.onLoading}
                        onError={props.onError}
                        onSuccess={props.onSuccess}
                        exam={exam}
                        onDelete={(examId) =>
                          setExams(exams.filter((exam) => exam.id !== examId))
                        }
                        hasAdminAccess={props?.hasAdminAccess}
                        examSession={examSession}
                      />
                    </Grid>
                  )
                );
              })
            ) : (
              !loading &&
              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <Typography variant="body2" mt={1} gutterBottom>
                  No exams found. Please check the search or filter criteria.
                </Typography>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Exams;
