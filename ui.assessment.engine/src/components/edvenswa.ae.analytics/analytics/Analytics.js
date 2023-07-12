
import {
  Container,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { doGetAnalytics } from "../actions/actions";
import { sortBy } from "lodash";
import { Navigate, useNavigate } from "react-router-dom";
import Data from "./Data";

const AnalyticsCard = React.lazy(() => import("./AnalyticsCard"));

const Analytics = (props) => {
  const [analytics, setAnalytics] = useState({});
  const [selectedOption, setSelectedOption] = useState("");
  const Navigate=useNavigate();

  useEffect(() => {
    doGetAnalytics(handleSuccess, handleFailure, handleLoading);
  }, []);

  const handleSuccess = (data) => {
    setAnalytics(data);
  };
  console.log(analytics);
  const handleFailure = (error) => {
    props.onError(error);
  };

  const handleLoading = (state) => {
    props.onLoading(state);
  };

  const handleSortChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const getSortedKeys = () => {
    const keys = Object.keys(analytics);

    return sortBy(keys, (key) => key.toLowerCase());
  };

  const handleClick=(data)=>{
    console.log("Clicked");
    console.log(data.labels,data.datasets);
    Navigate("/console/dashboard/analytics/data",{state:{labels:data.labels,data:data.datasets}});
  }

  return (
    <Container
      maxWidth="lg"
      component={"main"}
      style={styles.ae_analytics_container}
    >
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                size="small"
                style={styles.sortFilter}
              >
                <InputLabel id="sort-label">Sort By</InputLabel>

                <Select
                  labelId="sort-label"
                  id="sort-select"
                  value={selectedOption}
                  onChange={handleSortChange}
                  label="Sort By"
                >
                  <MenuItem value="">None</MenuItem>

                  {getSortedKeys().map((key) => (
                    <MenuItem key={key} value={key}>
                      {key}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {!props.loading &&
              getSortedKeys().map((key) => {
                if (selectedOption && key !== selectedOption) {
                  return null;
                }

                const data = analytics[key];

                return (
                  data !== null && (
                    <Grid item key={key} xs={12} sm={12} md={4} lg={4}>
                      <AnalyticsCard data={data} title={key} onClick={handleClick}/>
                    </Grid>
                  )
                );
              })}
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

const styles = {
  ae_analytics_container: {
    marginTop: "1rem",
  },

  sortFilter: {
    minWidth: 150,
  },
};

export default Analytics;
