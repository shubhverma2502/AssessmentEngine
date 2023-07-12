import React from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import moment from "moment";
import { AUTH_SECURE_USER_DETAILS_LS_LEY } from "../../edvenswa.ae.auth/constants/constants";
import LogoIcon from "../../../assets/ae_logo.png";
import CertificateTemplate from "../../../assets/ae_certificate.png";
import SignatureImage from "../../../assets/ae_signature.png";


export default function ReportDownload(props) {
  
  const { report, certificateRef } = props;
  const user = JSON.parse(
    sessionStorage.getItem(AUTH_SECURE_USER_DETAILS_LS_LEY));

  return (
    <Container component={"main"} maxWidth={"lg"} sx={{mt: 1}}>
      <Card>
        <CardContent
          sx={{
            position: "relative",
            height: "470px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            border: "3px solid #428c98",
          }}
          ref={certificateRef}
        >
          <Box
            component="div"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `url(${CertificateTemplate})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              pointerEvents: "none",
            }}
          />
           <Avatar
            src={SignatureImage}
            alt="Signature"
            sx={{
              position: "absolute",
              bottom: "50px",
              width: "150px",
              height: "auto",
              pointerEvents: "none",
            }}
          />
          <Grid container direction="column" spacing={3}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} md={1}>
                <Avatar
                  alt="image"
                  src={LogoIcon}
                  sx={{ width: 80, height: 80, marginTop: "7rem" }}
                />
              </Grid>
            </Grid>
            <Grid item>
              <Typography
                variant="h3"
                sx={{
                  textTransform: "uppercase",
                  fontSize: "30px",
                }}
              >
                Certificate of Excellence
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="h3"
                sx={{ fontSize: "25px", marginBottom: "1rem" }}
              >
                This is to certify that
              </Typography>
              <Typography
                variant="p"
                sx={{
                  fontSize: "25px",
                  marginTop: "1rem",
                  fontWeight: "bold",
                  fontFamily: "monaco",
                  textTransform: "uppercase",
                  borderBottom: "2px solid #4682B4",
                  display: "flow",
                  color: "#8e6c77",
                  paddingBottom: "2px",
                }}
              >
                {user?.firstName} {user?.lastName}
              </Typography>
            </Grid>
            <Grid item sx={{ marginLeft: "100px", marginRight: "100px" }}>
              <Typography
                variant="h3"
                sx={{ fontSize: "18px" }}
              >
                Has Completed his{" "}
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "18px",
                    color: "#948e57"
                  }}
                >
                  {report.exam.title} Exam
                </Typography>{" "}
                in the{" "}
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  {report.exam.level}
                </Typography>{" "}
                level with a percentage of{" "}
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "18px",
                    fontFamily: "monaco",
                  }}
                >
                  {report.percentage}%
                </Typography>{" "}
                on{" "}
                {moment(report?.examFinished)
                  .subtract(1, "M")
                  .format("YYYY-MM-DD")}{" "}
                in the{" "}
                <Typography
                  variant="caption"
                  component="label"
                  sx={{ fontWeight: "bold", fontSize: "18px" }}
                >
                  ASSESSMENT ENGINE
                </Typography>{" "}
                . Keep up the great work and continue to strive for success in
                all your future endeavors.
              </Typography>
            </Grid>
            <Grid item justifyContent="center" >
              <Typography
                variant="h3"
                sx={{
                  fontSize: "18px",
                  marginTop: "4rem",
                  fontWeight: "bold",
                  fontFamily: "monaco",
                  marginBottom: "3.5rem",
                }}
              >
                Signature
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
