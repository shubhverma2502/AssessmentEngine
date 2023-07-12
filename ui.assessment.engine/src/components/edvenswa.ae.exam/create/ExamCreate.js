import { Delete } from "@mui/icons-material";
import { Box, Card, CardContent, Chip, Container, Grid, MenuItem, Stack, TextField } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { isValidDate, isValidDuration, isValidTitle } from "../../edvenswa.ae.common/validation/Validation";
import { EXAM_TYPE_ALL } from "../../edvenswa.ae.home/constants/constants";
import { doGetCourses, doGetExamLevels, doGetExamTypes } from "../actions/actions";
import { DEFAULT_IMAGE, EXAM_COURSES_FIELD_ID, EXAM_DURATION_FIELD_ID, EXAM_END_DATE_FIELD_ID, EXAM_IMAGE_FIELD_ID, EXAM_LEVEL_FIELD_ID, EXAM_PASSPERCENTAGE_FIELD_ID, EXAM_TITLE_FIELD_ID, EXAM_TYPE_FIELD_ID } from "../constants/constants";
import { getExamFields } from "../forms/GetFields";

export default function CreateExam(props) {
    const { formData, setFormData, selectedCourses, setSelectedCourses, setCount, setFieldsCount } = props;
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();
    const fields = [EXAM_TITLE_FIELD_ID, EXAM_COURSES_FIELD_ID, EXAM_LEVEL_FIELD_ID, EXAM_TYPE_FIELD_ID, EXAM_DURATION_FIELD_ID, EXAM_END_DATE_FIELD_ID, EXAM_PASSPERCENTAGE_FIELD_ID, EXAM_IMAGE_FIELD_ID];
    const formFields = getExamFields(fields);
    const [courses, setCourses] = useState([]);
    const [levels, setLevels] = useState([]);
    const [types, setTypes] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setCount(fields.length - 1);
        setFieldsCount(fields.length - 1);

        if (courses.length === 0) {
            doGetCourses(handleSuccess, handleFailure);
        }
        if (levels.length === 0) {
            doGetExamLevels(handleSuccess, handleFailure);
        }
        if (types.length === 0) {
            doGetExamTypes(handleSuccess, handleFailure);
        }
        // eslint-disable-next-line
    }, []);

    const handleSuccess = (data, type) => {
        switch (type) {
            case "GET_COURSES": {
                setCourses(data);
                break;
            }
            case "GET_LEVELS": {
                setLevels(data);
                break;
            }
            case "GET_TYPES": {
                setTypes(data);
                break;
            }
            default: {
                navigate("/console/exams", {
                    state: {
                        examType: EXAM_TYPE_ALL
                    }
                });
            }
        }
    }

    const handleFailure = (error) => {
        props.onError(error);
    };
    // Handler function to delete a selected option
    const handleDeleteCourse = (courseId) => {
        const newSelectedCourses = formData.courses.filter((course) => course.id !== courseId);
        setSelectedCourses(newSelectedCourses);
        const newFormData = { ...formData, courses: newSelectedCourses };
        setFormData(newFormData);
    };
    // Handling change event of select input
    const handleChange = (field_name, value) => {
        switch (field_name) {
            case EXAM_TITLE_FIELD_ID: {
                if (!isValidTitle(value)) {
                    setErrors({ [field_name]: { message: 'Title should be atleast 4 characters' } });
                } else {
                    setErrors(delete [field_name]);
                    setFormData({ ...formData, [field_name]: value });
                }
                break;
            }
            case EXAM_COURSES_FIELD_ID: {
                const isCourseExists = selectedCourses.find((course) => course.courseName === value);
                if (isCourseExists && isCourseExists.id) {
                    return;
                }
                setSelectedCourses([...selectedCourses, courses.find((course) => course.courseName === value)]);
                setFormData({ ...formData, [field_name]: [...selectedCourses, courses.find((course) => course.courseName === value)] });
                break;
            }
            case EXAM_LEVEL_FIELD_ID: {
                setFormData({ ...formData, [field_name]: value });
                break;
            }
            case EXAM_TYPE_FIELD_ID: {
                setFormData({ ...formData, [field_name]: value });
                break;
            }
            case EXAM_DURATION_FIELD_ID: {
                if (!isValidDuration(value)) {
                    setErrors({ [field_name]: { message: 'Duration must be greater than 10' } });
                } else {
                    setErrors(delete [field_name]);
                    setFormData({ ...formData, [field_name]: value });
                }
                break;
            }
            case EXAM_END_DATE_FIELD_ID: {
                if (!isValidDate(value)) {
                    setErrors({ [field_name]: { message: 'Date should not be past date' } });
                } else {
                    setErrors(delete [field_name]);
                    setFormData({ ...formData, [field_name]: value });
                }
                break;
            }
            case EXAM_PASSPERCENTAGE_FIELD_ID: {
                if (!isValidDuration(value)) {
                    setErrors({ [field_name]: { message: 'Duration must be greater than 10' } });
                } else {
                    setErrors(delete [field_name]);
                    setFormData({ ...formData, [field_name]: value });
                }
                break;
            }
            case EXAM_IMAGE_FIELD_ID: {
                setFormData({ ...formData, [field_name]: value });
                break;
            }
            default: {
                console.error('Invalid field name: ', field_name);
            }
        }
    };

    return (
        <Container maxWidth={"md"} component={"main"} sx={{ marginTop: "1rem" }}>
            <Card>
                <CardContent>
                    <Box component="form">
                        <Grid container spacing={2}>
                            {
                                formFields.map((field, key) => {
                                    return (
                                        <Grid item xs={12} key={key}>
                                            {
                                                field.type !== "radio"
                                                    ? <TextField
                                                        {...field}
                                                        key={key}
                                                        fullWidth
                                                        label={t(field.label)}
                                                        error={errors[field.name] ? true : false}
                                                        helperText={t(errors?.[field.name]?.message)}
                                                        defaultValue={location && location.state ?
                                                            location.state && location.state.exam
                                                                ? field.name === EXAM_END_DATE_FIELD_ID && location.state.exam[field.name]
                                                                    ? moment(location.state.exam[field.name]).subtract(1, "M").format("YYYY-MM-DD")
                                                                    : location.state.exam[field.name]
                                                                : '' :
                                                            formData
                                                                ? field.name === EXAM_END_DATE_FIELD_ID && formData[field.name]
                                                                    ? moment(formData[field.name]).format("YYYY-MM-DD")
                                                                    : field.name === EXAM_IMAGE_FIELD_ID ? DEFAULT_IMAGE : formData[field.name]
                                                                : ''
                                                        }
                                                        onChange={(event) => handleChange(field.name, event.target.value)}
                                                    >
                                                        {
                                                            field.select
                                                                && field.id === EXAM_COURSES_FIELD_ID
                                                                ? courses.map((course, idx1) => {
                                                                    return (
                                                                        <MenuItem value={course?.courseName} key={idx1}>{course?.courseName}</MenuItem>
                                                                    )
                                                                })
                                                                : field.id === EXAM_LEVEL_FIELD_ID
                                                                    ? levels.map((level, idx2) => {
                                                                        return (
                                                                            <MenuItem value={level} key={idx2}>{level}</MenuItem>
                                                                        )
                                                                    })
                                                                    : field.id === EXAM_TYPE_FIELD_ID
                                                                        ? types.map((type, idx3) => {
                                                                            return (
                                                                                <MenuItem value={type} key={idx3}>{type}</MenuItem>
                                                                            )
                                                                        })
                                                                        : <React.Fragment></React.Fragment>
                                                        }
                                                    </TextField>
                                                    : <React.Fragment />
                                            }
                                            {
                                                (field.id === EXAM_COURSES_FIELD_ID && formData.courses && formData.courses.length > 0)
                                                    ? <Stack direction={"row"} spacing={1} mt={1}>
                                                        {
                                                            formData.courses.map((selectedCourse) => (
                                                                <Chip
                                                                    key={selectedCourse.id}
                                                                    label={selectedCourse.courseName}
                                                                    size="small"
                                                                    sx={{ backgroundColor: "#2c6b79 !important" }}
                                                                    deleteIcon={<Delete sx={{ color: "#d19c9c !important" }}></Delete>}
                                                                    onDelete={() => handleDeleteCourse(selectedCourse.id)}
                                                                />
                                                            ))
                                                        }

                                                    </Stack>
                                                    : <></>
                                            }
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    )
};