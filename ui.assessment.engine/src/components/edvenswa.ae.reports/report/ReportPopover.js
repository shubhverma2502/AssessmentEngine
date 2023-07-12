import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Popover,
  Typography,
} from "@mui/material";
import moment from "moment";
import React from "react";

export default function ReportPopover(props) {

  const { el, report, handleClose } = props;
  const popOverOpen = Boolean(el);

  return (
    <Popover
      id={"ae-report-popover"}
      open={popOverOpen}
      anchorEl={el}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "center",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <Card>
        <CardHeader
          sx={{ textAlign: "center", borderBottom: "1px solid lightgrey" }}
          title={
            <React.Fragment>
              <Typography>{report?.exam?.examType + " EXAM"}</Typography>
              <Typography>(FOR {report?.exam?.level})</Typography>
            </React.Fragment>
          }
        />
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                sx={{ color: "#546E7A", fontWeight: "bold" }}
              >
                END DATE:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                sx={{ color: "#546E7A", fontWeight: "normal" }}
              >
                {moment(report?.examDate).subtract(1, 'M').format("YYYY-MM-DD")}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                sx={{ color: "#546E7A", fontWeight: "bold" }}
              >
                COMPLETION DATE:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                sx={{ color: "#546E7A", fontWeight: "normal" }}
              >
                {moment(report?.examFinished).subtract(1, 'M').format("YYYY-MM-DD")}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                sx={{ color: "#546E7A", fontWeight: "bold" }}
              >
                TOTAL QUESTIONS:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                sx={{ color: "#546E7A", fontWeight: "normal" }}
              >
                {report?.totalQuestions}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Popover>
  );
}
