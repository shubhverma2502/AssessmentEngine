import { Card, CardContent, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { Fragment } from "react";

export default function QuestionCreation(props) {
  const { formData } = props;

  const questionData = [
    {
      title: "QUESTION",
      value: formData?.question,
    },
    {
      title: "COURSE",
      value: formData?.course?.courseName,
    },
    {
      title: "LEVEL",
      value: formData?.level,
    },
    {
      title: "QUESTION TYPE",
      value: formData?.questionType,
    },
    {
      title: " Tags",
      value: formData?.tags ? formData.tags.join(", ") : [],
    },
  ];

  return (
    <Container>
      <Card sx={{ border: "1px solid #8eb2a4" }}>
        <CardContent>
          <Grid container spacing={1}>
            {questionData.map((detail, index) => {
              return (
                <Fragment key={index}>
                  <Grid item xs={6} sx={{ textAlign: "start" }}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      sx={{ color: "#546E7A", fontWeight: "bold" }}
                    >
                      {detail.title}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} sx={{ textAlign: "start" }}>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      sx={{ color: "#1976d2", fontWeight: "normal" }}
                    >
                      : {detail.value}
                    </Typography>
                  </Grid>
                </Fragment>
              );
            })}
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
