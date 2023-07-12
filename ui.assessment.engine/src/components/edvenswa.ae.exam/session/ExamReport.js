import React, { useEffect, useState } from "react";
import { doGenerateReport } from "../actions/actions";
import CircularStatic from "../../edvenswa.ae.reports/report/CircularStatic";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import { WorkspacePremium } from "@mui/icons-material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function ExamReport(props) {
  const {
    sessionId,
    title,
    level,
    type,
    timeTaken,
    totalQuestions,
    finishedDate,
    passPercentage,
  } = props;

  const [report, setReport] = useState({});
  const [pdfLoading, setPdfLoading] = useState(false);

  useEffect(() => {
    if (sessionId) {
      doGenerateReport(
        { sessionId: sessionId },
        handleSuccess,
        handleFailure,
        handleLoading
      );
    }

    // eslint-disable-next-line
  }, [sessionId]);

  const handleSuccess = (result) => {
    setReport(result);
  };

  const handleFailure = (err) => {
    props.onError(err);
  };

  const handleLoading = (state) => {
    props.onLoading(state, true);
  };

  const handleExitSession = () => {
    props.onExitSession();
  };

  const handlePrint = () => {
    if (pdfLoading) return;
    setPdfLoading(true);
    const reportCardElement = document.querySelector("#report-card");

    // Hide buttons before taking the screenshot
    const buttons = reportCardElement.querySelectorAll("button");
    buttons.forEach((button) => {
      button.style.display = "none";
    });

    const headingElement = document.createElement("h1");
    headingElement.style.textAlign = "center"; // Align heading text to the center
    headingElement.textContent = `${title.toUpperCase()}-${type} Exam Report`;
    reportCardElement.prepend(headingElement);

    html2canvas(reportCardElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      const timeStamp = new Date().toDateString();
      const fileName = `${title}_${type}_${timeStamp}.pdf`;
      pdf.save(fileName);

      reportCardElement.removeChild(headingElement);

      buttons.forEach((button) => {
        button.style.display = "";
      });

      setPdfLoading(false);
    });
  };

  const details = [
    { title: "Title", value: title },
    { title: "Level", value: level },
    { title: "Type", value: type },
    { title: "Total Questions", value: totalQuestions },
    { title: "AttemptedQuestions", value: report?.attemptedQuestionsCount },
    { title: "Correct Answers", value: report?.correctAnswersCount },
    { title: "Completion Date", value: finishedDate },
    {
      title: "Time Taken",

      value: `${
        timeTaken <= 1 ? timeTaken * 60 + " seconds" : timeTaken + " minutes"
      }`,
    },

    {
      title: "Status",
      value: report && report?.percentage >= passPercentage ? "PASSED" : "FAILED",
      color: report && report?.percentage >= passPercentage ? "darkgreen" : "red",
    },
  ];

  return (
    <Container maxWidth="md" component="main">
      <Card id="report-card">
        <CardContent>
          {!props.loading ? (
            <Grid container spacing={2}>
              <Grid item xs={6} sx={{ marginTop: "3rem" }}>
                {details.map((detail, index) => (
                  <Grid container spacing={1} key={index}>
                    <Grid item xs={6}>
                      <Typography align="right" sx={{ fontWeight: 500 }}>
                        {detail.title}:
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography align="left" sx={{ color: detail.color }}>
                        {detail.value}
                      </Typography>
                    </Grid>
                  </Grid>
                ))}
              </Grid>

              <Grid item xs={6}>
                <Grid
                  item
                  sx={{
                    alignItems: "center",
                    display: "grid",
                    justifyContent: "flex-end",
                  }}
                >
                  <Stack direction={"column"} spacing={2}>
                    <Button
                      disableRipple
                      size="small"
                      variant="contained"
                      onClick={handlePrint}
                      startIcon={<WorkspacePremium />}
                      disabled={pdfLoading}
                    >
                      Download Report
                    </Button>
                  </Stack>
                </Grid>

                <CardHeader title="Score" sx={{ textAlign: "center" }} />

                <Box display="flex" justifyContent="center" alignItems="center">
                  <CircularStatic result ={report?.percentage >= passPercentage ? "PASSED" : "FAILED"} perc={report?.percentage} size={150} />

                  <Typography
                    style={{
                      fontWeight: "bold",
                      color: "black",
                      position: "absolute",
                    }}
                    fontSize={12}
                    variant="caption"
                    component="div"
                    color="text.secondary"
                  >
                    {`${Math.round(report?.percentage)}%`}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          ) : (
            <React.Fragment>
              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <CircularProgress size={70} />
              </Grid>

              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <Typography component="h6" variant="h6">
                  Generating Report...
                </Typography>
              </Grid>
            </React.Fragment>
          )}
        </CardContent>

        <CardActions sx={{ justifyContent: "end" }}>
          <Button
            variant="contained"
            size="small"
            disabled={props.loading}
            type="button"
            onClick={handleExitSession}
          >
            EXIT SESSION
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
}
