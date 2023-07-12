import { Card, CardContent, Grid, Typography } from "@mui/material";

import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { titles, labels } from "../constants/constants";
import { Bar } from "react-chartjs-2";
import React, { useState } from "react";
import { useEffect } from "react";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement
);

export default function AnalyticsCard(props) {
  const title = props && props?.title ? props?.title : "";
  const count = props && props?.data ? props?.data : {};
  const [barData, setBarData] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (Object.keys(count).length > 0) {
      Object.keys(count).map((key) => {
        barData.push(count[key]);
      });
      setShow(true);
    }
  }, [count]);

  const data = {
    labels: labels[title],
    datasets: [
      {
        label: "Total",
        data: barData,
        backgroundColor: "#1976d2",
        borderColor: "black",
        borderWidth: 1,
        title:titles[title],
      },
    ],
  };
  const handleClick = (data) => {
    props.onClick(data);
  };

  return show ? (
    <Card
      sx={{ borderLeft: "3px solid rgb(220 192 192)" }}
      onClick={()=>{handleClick(data)}}
    >
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography
              gutterBottom
              variant="h6"
              sx={{ textAlign: "center" }}
              component="h4"
            >
              {titles[title]}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Bar data={data} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  ) : (
    <React.Fragment />
  );
}
