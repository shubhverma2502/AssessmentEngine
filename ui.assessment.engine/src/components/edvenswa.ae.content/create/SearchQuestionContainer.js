import { Card,  CardContent, Container, Grid, MenuItem, Typography } from "@mui/material";
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { doGetCourses, doGetExamLevels } from '../../edvenswa.ae.exam/actions/actions';
import { QUESTION_COURSE_FIELD_ID, QUESTION_LEVEL_FIELD_ID } from '../constants/constants';
import { getContentFields } from '../forms/GetFields';
import { useNavigate } from "react-router-dom";

export default function SearchQuestionContainer(props) {

    const { formData, setFormData, setFieldsCount } = props;
    const navigate = useNavigate();
    const { t } = useTranslation();
    const fields = [QUESTION_COURSE_FIELD_ID, QUESTION_LEVEL_FIELD_ID];
    const formFields = getContentFields(fields);

    const [course, setCourse] = useState([]);
    const [level, setLevel] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState([]);
    const [selectedLevel, setSelectedLevel] = useState(null);

    useEffect(() => {
        setFieldsCount(fields.length)
        if (course.length === 0) {
            doGetCourses(handleSuccess, handleFailure);
        }
        if (level.length === 0) {
            doGetExamLevels(handleSuccess, handleFailure);
        }
    }, [selectedCourse, selectedLevel]);

    const handleSuccess = (data, type) => {
        switch (type) {
            case "GET_COURSES": {
                setCourse(data);
                break;
            }
            case "GET_LEVELS": {
                setLevel(data);
                break;
            }
            default: {
                console.error("Invalid type:", type);
            }
        };
    };

    const handleFailure = (err) => {
        props.onError(err);
    };

    const handleChange = (field_name, value) => {
        switch (field_name) {
            case QUESTION_COURSE_FIELD_ID: {
                setSelectedCourse([...selectedCourse, course.find(course => (course.courseName === value))]);
                setFormData({ ...formData, [field_name]: value });
                break;
            }
            case QUESTION_LEVEL_FIELD_ID: {
                setFormData({ ...formData, [field_name]: value });
                break;
            }
            default: {
                console.error("Invalid field name", field_name);
            }
        }
    };
    return (
        <Container maxWidth="lg" component="main" sx={{ marginTop: "1rem" }}>
            <Card>
                <CardContent>
                    <Grid container spacing={2} >
                        <Grid item xs={12} align="center">
                            <Typography
                                variant="body1"
                                component="body"
                            >
                                Select the Course And Level of the Question
                            </Typography>
                        </Grid>
                        {formFields.map((field, key) => (
                            <Grid item xs={12} key={key}>
                                <TextField
                                    {...field}
                                    key={key}
                                    fullWidth
                                    label={t(field.label)}
                                    sx={{ marginBottom: "1rem", marginRight: "2rem" }}
                                    onChange={(event) => handleChange(field.id, event.target.value)}
                                >
                                    {field.select && field.id === QUESTION_COURSE_FIELD_ID ? (
                                        course.map((course, idx1) => (
                                            <MenuItem value={course} key={idx1}>
                                                {course?.courseName}
                                            </MenuItem>
                                        ))
                                    ) : field.id === QUESTION_LEVEL_FIELD_ID ? (
                                        level.map((level, idx2) => (
                                            <MenuItem value={level} key={idx2}>
                                                {level}
                                            </MenuItem>
                                        ))
                                    ) : (
                                        <React.Fragment></React.Fragment>
                                    )}
                                </TextField>
                            </Grid>
                        ))}
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    );
};