import InfoIcon from '@mui/icons-material/Info';
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Container,
    Grid,
    Stack,
    Typography
} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import CircularStatic from "../../edvenswa.ae.reports/report/CircularStatic";
import UserInfoBox from "./UserInfoBox";
import { useState } from 'react';

ExamAnalysisCard.propTypes = {
    report: PropTypes.object.isRequired,
};

export default function ExamAnalysisCard(props) {

    const { report } = props;
    const [users, setUsers] = useState([]);
    const total = report.assignedUsers.length;
    const arr = [
        {
            name: "Assigned Users",
            users: report.assignedUsers,
            value: report.assignedUsers,
            color: "success"
        },
        {
            name: "Attempted Users",
            users: report.attemptedUsers,
            value: report.attemptedUsers,
            color: "info"
        },
        {
            name: "Passed Users",
            users: report.passedUsers,
            value: report.passedUsers,
            color: "warning"
        },
        {
            name: "Failed Users",
            users: report.failedUsers,
            value: report.failedUsers,

        },
    ];
    const size = 80;
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = (a) => {
        setUsers(a);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Container maxWidth="lg" component={"main"}>
            <Card sx={{ border: "0.1px solid #428c98" }}>
                <CardContent sx={{ justifyContent: "center" }}>
                    <Grid container spacing={10} justifyContent="center">
                        <Grid item justifyItems="center">
                            <CardMedia
                                component={'img'}
                                alt={report.examTitle}
                                image={report.image}
                                sx={{ objectFit: "contain", height: "70px" }}
                            />
                            <Typography marginTop={1}>
                                {report.examTitle}
                            </Typography>

                        </Grid>

                        {
                            Array.isArray(arr) && arr.map((a) => {
                                return (
                                    <Grid item>
                                        <Box display="flex" justifyContent="center" alignItems="center">
                                            <CircularStatic color={a.color} size={size} perc={(a.users.length / total) * 100}></CircularStatic>
                                            <Typography style={{
                                                fontWeight: "bold",
                                                color: "black",
                                                position: "absolute",
                                            }}
                                                fontSize={12}
                                                variant="caption"
                                                component="div"
                                                color="text.secondary" sx={{ fontWeight: "500", color: "#428c98" }}>
                                                {a.users.length}
                                            </Typography>
                                        </Box>
                                        <Stack marginTop={1} direction="row" spacing={1}>
                                            <InfoIcon
                                                fontSize="small"
                                                onClick={() => handleClickOpen(a)}
                                                sx={{ alignSelf: "center" }}
                                            ></InfoIcon>
                                            <Typography >{a.name}</Typography>
                                        </Stack>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </CardContent>
            </Card>
            {
                open ?
                    <UserInfoBox a={users} open={open} onClose={() => setOpen(!open)}></UserInfoBox>
                    :
                    <React.Fragment />
            }
        </Container>
    );
}
