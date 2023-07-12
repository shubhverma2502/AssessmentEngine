import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import jsPDF from "jspdf";
import moment from "moment";
import CircularStatic from "./CircularStatic";
import { ExpandMore, WorkspacePremium } from "@mui/icons-material";
import ReportDownload from "./ReportDownload";
import html2canvas from "html2canvas";

ReportCard.propTypes = {
  report: PropTypes.object.isRequired,
};

export default function ReportCard(props) {

  const { report } = props;
  const [showCertificate, setShowCertificate] = useState(false);
  const certificateRef = useRef();

  useEffect(() => {
    if (showCertificate) {
      const input = certificateRef.current;
      html2canvas(input, { dpi: 300 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("l", "mm", [canvas.height, canvas.width]);
        pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
        pdf.save("certificate.pdf");
        setTimeout((function () {
          setShowCertificate(false); // To hide the Report.pdf after generating the certificate
        }), 5000);
      });
    }
  }, [showCertificate]);

  const handleDownloadCertificate = () => {
    if (report?.percentage < 5) {
      props.onError(
        {
          severity: "warning",
          message: "You need to score more than 60% to download the certificate. Best of luck next time!"
        });
      return;
    }
    setShowCertificate(true);
  };

  return (
    <>
      <Card sx={{ border: "0.1px solid #428c98" }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Typography sx={{ fontWeight: "500", color: "#428c98" }}>
                {report.exam?.title}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <CircularStatic result ={report?.examResult} perc={report?.percentage}></CircularStatic>
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
            <Grid item xs={3}>
              <Stack direction={"column"} sx={{ color: "#8c6038" }}>
                <Typography variant="body2">
                  {"Completion Date: " +
                    moment(report?.examFinished)
                      .subtract(1, "M")
                      .format("YYYY-MM-DD")}
                </Typography>
                <Typography variant="body2">
                  {"Total Questions: " + report?.totalQuestions}
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={2}>
              <Button
                disableRipple
                size="small"
                variant="contained"
                startIcon={<WorkspacePremium></WorkspacePremium>}
                onClick={handleDownloadCertificate}
              >
                Certificate
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Accordion elevation={0} disableGutters>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography variant="body1">More</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack direction={"column"} sx={{ color: "#8c6038" }}>
                    <Typography variant="body2">
                      {"Type: " + report?.exam?.examType}
                    </Typography>
                    <Typography variant="body2">
                      {"Level: " + report?.exam?.level}
                    </Typography>
                  </Stack>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {showCertificate && (
        <ReportDownload report={report} certificateRef={certificateRef} />
      )}
    </>
  );
}
