import { Card, CardContent, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import Timer from "./Timer";
import PropTypes from "prop-types";

ExamHeader.propTypes = {
  title: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  level: PropTypes.string.isRequired,
  onTimeout: PropTypes.func.isRequired,
};

export default function ExamHeader(props) {
  const { title, duration, level, onTimeout, ontimeTaken } = props;
  const [timeTaken, setTimeTaken] = useState(0); // State to store timeTaken

  const handleTimeTaken = (value) => {
    setTimeTaken(value);
  };

  ontimeTaken(timeTaken);

  return (
    <Card>
      <CardContent>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <Typography style={{ fontWeight: 500 }}>{title}</Typography>
            <Typography style={{ fontWeight: 500 }}>For {level}</Typography>
          </Grid>

          <Grid item xs={6} style={{ textAlign: "end" }}>
            <Typography style={{ fontWeight: 500 }}>Time Left</Typography>
            <Timer
              minutes={duration}
              onTimeout={onTimeout}
              onTimeTaken={handleTimeTaken}
            ></Timer>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
