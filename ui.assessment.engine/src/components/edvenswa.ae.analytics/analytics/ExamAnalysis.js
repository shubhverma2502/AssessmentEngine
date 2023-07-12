import { Avatar, Card, CardContent, Container, FormControlLabel, Grid, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchFilter from "../../edvenswa.ae.common/search/SearchFilter";
import { doGetExamAnalytics } from "../actions/actions";
import moment from "moment/moment";

const ExamAnalysisCard = React.lazy(() => import("./ExamAnalysisCard"));

const ExamAnalysis = (props) => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    doGetExamAnalytics(handleSuccess, handleFailure, handleLoading);
    // eslint-disable-next-line
  }, []);

  const handleSuccess = (Reports) => {
    setReports(Reports);
    // setFilteredReports(Reports);
  };
  const handleFailure = (error) => {
    props.onError(error);
  };

  const handleLoading = (state) => {
    props.onLoading(state);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const newFilteredReports = reports.filter((report) => {
    if (startDate && endDate) {
      const reportDate = moment(report.date).subtract(1, "M").format("YYYY-MM-DD");
      const startDateObj = moment(startDate).format("YYYY-MM-DD");
      const endDateObj = moment(endDate).format("YYYY-MM-DD");
      return reportDate >= startDateObj && reportDate <= endDateObj;
    }
    return true;
  });

  return (
    <Container maxWidth="lg" component={"main"}>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid
              item
              xs={props.hasAdminAccess ? 6 : 12}
              sm={props.hasAdminAccess ? 6 : 12}
              md={props.hasAdminAccess ? 6 : 12}
              sx={{ justifyContent: "flex-end", display: "flex" }}
            >
              <Stack direction={"row"} spacing={2}>
                <SearchFilter
                  elements={reports}
                  searchKey="examTitle"
                  filteredElements={filteredReports}
                  setFilteredElements={setFilteredReports}
                />
                 <Typography>Sort by Date:</Typography>
                <TextField
                  type="date"
                  label="Start Date"
                  name="Start Date"
                  variant="outlined"
                  onChange={handleStartDateChange}
                  size="small"
                  InputLabelProps={{ shrink: true }} // Show label when input has a value
                />
                <Typography variant="body1">to</Typography>
                <TextField
                  type="date"
                  label="End Date"
                  variant="outlined"
                  onChange={handleEndDateChange}
                  size="small"
                  InputLabelProps={{ shrink: true }} // Show label when input has a value
                />
              </Stack>
            </Grid>
            {props.loading ? (
              <React.Fragment></React.Fragment>
            ) : newFilteredReports && newFilteredReports.length > 0 ? (
              Array.isArray(newFilteredReports) &&
              newFilteredReports.map((report, index) => (
                <Grid item key={index} xs={12} sm={12} md={12} lg={12}>
                  <ExamAnalysisCard {...props} report={report} hasAdminAccess={props?.hasAdminAccess} />
                </Grid>
              ))
            ) : (
              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <Typography variant="body2" mt={1} gutterBottom>
                  No Analytics found. Please check the search or filter criteria.
                </Typography>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ExamAnalysis;
