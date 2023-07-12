/*
This is a component is responsible for displaying the details of a new exam that 
is being created and allowing the user to create the exam by clicking a button.
*/
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import moment from "moment";
import React, { Fragment, useEffect } from "react";

export default function ExamCreation(props) {

    const { formData } = props;

    const details = [
        {
            title: "Title:",
            value: formData?.title
        },
        {
            title: "Level:",
            value: formData?.level
        },
        {
            title: "Type:",
            value: formData?.examType
        },
        {
            title: "End Date:",
            value: moment(formData?.endDate).format("YYYY-MM-DD")
        },
        {
            title: "Total Questions:",
            value: formData?.questions?.length
        },
        {
            title: "Duration:",
            value: formData?.duration
        },
        {
            title: "Pass Percentage:",
            value: formData?.passPercentage +"%"
        },
    ];

    return (
        <Container>
            <Card sx={{ border: "1px solid #8eb2a4" }}>
                <CardContent>
                    <Grid container spacing={1}>
                        {
                            details.map((detail, index) => {
                                return (
                                    <Fragment key={index}>
                                        <Grid item xs={6} sx={{ textAlign: "end" }}>
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
                                                {detail.value}
                                            </Typography>
                                        </Grid>
                                    </Fragment>
                                )
                            })
                        }
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    );
}
