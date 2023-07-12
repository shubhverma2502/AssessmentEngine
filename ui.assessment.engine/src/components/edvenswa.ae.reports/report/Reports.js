import { Card, CardContent, Container, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchFilter from "../../edvenswa.ae.common/search/SearchFilter";
import { doGetReports } from "../actions/actions";

const ReportCard = React.lazy(() => import("./ReportCard"));

const Reports = (props) => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);

  useEffect(() => {
    doGetReports(handleSuccess, handleFailure, handleLoading);
    // eslint-disable-next-line
  }, []);

  const handleSuccess = (Reports) => {
    setReports(Reports);
    setFilteredReports(Reports);
  };

  const handleFailure = (error) => {
    props.onError(error);
  };

  const handleLoading = (state) => {
    props.onLoading(state);
  };


  return (
    <Container
      maxWidth="lg"
      component={"main"}
    >
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
              </Stack>
            </Grid>
            {props.loading ? (
              <React.Fragment></React.Fragment>
            ) : filteredReports && filteredReports.length > 0 ? (
              filteredReports.map((report, index) => {
                return (
                  <Grid item key={index} xs={12} sm={12} md={12} lg={12}>
                    <ReportCard
                      {...props}
                      report={report}
                      hasAdminAccess={props?.hasAdminAccess}
                    />
                  </Grid>
                );
              })
            ) : (
              <></>
            )}
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Reports;
