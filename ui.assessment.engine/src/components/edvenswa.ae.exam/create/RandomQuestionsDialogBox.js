import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Slider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../../interceptors/AxiosInterceptor';
import { doGetRandomQuestions } from '../actions/actions';

export default function RandomQuestionsDialogBox(props) {

    const { courses, level, setSelectedQuestions, onError, onLoading } = props;
    const [open, setOpen] = useState(true);
    const [questionsCount, setQuestionsCount] = useState({});
    const [questions, setQuestions] = useState([]);
    const [showCount, setShowCount] = useState(false);
    const [data, setData] = useState({});

    useEffect(() => {
        if (courses && level) {
            axiosInstance.post("/exam/questions/count", { courses: courses, level: level }).then((res) => {
                setData(res?.data);
            })
        }
        // eslint-disable-next-line
    }, [courses]);

    const handleChange = (event, course) => {
        setShowCount(true);
        if (event.target.value > 0) {
            setQuestionsCount({ ...questionsCount, [course]: event.target.value });
        } else {
            const updatedQuestionsCount = { ...questionsCount };
            delete updatedQuestionsCount[course];
            setQuestionsCount(updatedQuestionsCount);
        }
    };

    const handleApply = () => {
        if (Object.keys(questionsCount).length !== 0) {
            doGetRandomQuestions({ questionsCount: questionsCount, level: level }, handleSuccess, handleFailure, handleLoading);
        } else {
            let error = {
                response: {
                    data: "Please select question count"
                }
            };
            onError(error);
        }
    };

    const handleSuccess = (data) => {
        setQuestions(...questions, data.map((q) => q.id));
        setSelectedQuestions(...questions, data.map((q) => q.id));
        props.onClose();
    }

    const handleLoading = (state) => {
        onLoading(state);
    }

    const handleFailure = (data) => {
        onError(data);
    }

    return (
        <Dialog open={open} onClose={props.onClose}>
            <DialogTitle sx={{ textAlign: "center", backgroundColor: "#1f2125", color: '#fff' }} >Questions Count</DialogTitle>
            <DialogContent style={{ marginTop: '1rem' }}>
                <Grid container spacing={2}>
                    {courses?.map((course, key) => (
                        <Grid item xs={12} key={key}>
                            <Grid container justifyContent="space-between" alignItems="center">
                                <Typography gutterBottom>
                                    {course.courseName}
                                </Typography>
                            </Grid>
                            <Slider
                                value={questionsCount[course.courseName] || 0}
                                onChange={(event) => handleChange(event, course.courseName)}
                                valueLabelDisplay={showCount ? "on" : "off"}
                                step={1}
                                min={0}
                                max={data[course?.courseName]}
                            />
                        </Grid>
                    ))}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    size="small"
                    variant="contained"
                    onClick={handleApply}
                >
                    Apply
                </Button>
            </DialogActions>
        </Dialog>
    );
};
