// This component renders a form field for selecting question generation mode
// It includes a radio group with options for manual or random question generation
// If the user selects manual generation mode, a dialog box is opened for selecting questions manually
// If the user selects random generation mode, a dialog box is opened for selecting questions randomly based on the user's chosen level and courses

import { QuestionAnswerRounded } from "@mui/icons-material";
import { Badge, Box, Card, CardContent, CardHeader, Container, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { doGetQuestionsGenerateModes } from "../actions/actions";
import { EXAM_QUESTIONS_FIELD_ID, QUESTION_GENERATION_MODE_MANUAL, QUESTION_GENERATION_MODE_RANDOM } from "../constants/constants";
import { getExamFields } from "../forms/GetFields";
import QuestionsDialogBox from "./QuestionsDialogBox";
import RandomQuestionsDialogBox from "./RandomQuestionsDialogBox";

export default function QuestionSelection(props) {
    const { formData, setFormData, setFieldsCount, count } = props;
    const { t } = useTranslation();
    const fields = [EXAM_QUESTIONS_FIELD_ID];
    const formFields = getExamFields(fields);
    const [questionsGenerateModes, setQuestionsGenerateModes] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [isRandomQuestionsDialogOpen, setIsRandomQuestionsDialogOpen] = useState(false);

    useEffect(() => {
        setFieldsCount(count + fields.length + 1)
        if (questionsGenerateModes.length === 0) {
            doGetQuestionsGenerateModes(handleSuccess, handleFailure);
        }
        // eslint-disable-next-line
    }, []);

    const handleSuccess = (data, type) => {
        switch (type) {
            case "GET_QUESTIONS_GENERATE_MODES": {
                setQuestionsGenerateModes(data);
                break;
            }
            default: break;
        }
    };

    const handleFailure = (error) => {
        props.onError(error);
    };
    // Handle change event for radio group
    const handleOnChange = (value) => {
        setFormData({ ...formData, questions: [], questionsGenerateMode: value });
        if (value === QUESTION_GENERATION_MODE_RANDOM) {
            setIsRandomQuestionsDialogOpen(true);
        }
        else {
            setDialogOpen(true);
        }
    }
    // Handle selection of questions in dialog box
    const onSelect = (questions) => {
        if (questions.length > 0) {
            setSelectedQuestions(questions);
            setFormData({ ...formData, questions: questions });
        }
    };

    return (
        <Container maxWidth={"md"} component={"main"} sx={{ marginTop: "2rem" }}>
            <Card>
                <CardHeader
                    title={
                        <Stack direction={"row-reverse"} spacing={2}>
                            {
                                formData.questionsGenerateMode && formData.courses.length > 0 && formData.level
                                    ? <Badge badgeContent={formData && formData?.questions ? formData?.questions.length : 0} color="secondary" showZero>
                                        <QuestionAnswerRounded color="action"
                                            onClick={() => formData?.questionsGenerateMode === QUESTION_GENERATION_MODE_MANUAL ? setDialogOpen(!dialogOpen) : setIsRandomQuestionsDialogOpen(!isRandomQuestionsDialogOpen)} />
                                    </Badge>
                                    : <React.Fragment></React.Fragment>
                            }
                        </Stack>
                    }
                    sx={{ textAlign: "end", marginRight: "1rem", cursor: "pointer" }}
                >
                </CardHeader>
                <CardContent>
                    <Box component="form">
                        <Grid container spacing={2}>
                            {
                                formFields.map((field, key) => {
                                    return (
                                        <Grid item xs={12} key={key}>
                                            <FormControl>
                                                <Typography variant="body1">{t(field.label)}:</Typography>
                                                <RadioGroup name={field.name} row>
                                                    {questionsGenerateModes.map((option, key) => (
                                                        <FormControlLabel
                                                            key={key}
                                                            value={option}
                                                            control={<Radio />}
                                                            label={option}
                                                            checked={option === formData?.questionsGenerateMode}
                                                            onChange={(e) => {
                                                                handleOnChange(option);
                                                            }}
                                                        />
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                        {
                            dialogOpen && formData.level && formData.courses.length > 0
                                ? <QuestionsDialogBox
                                    open={dialogOpen}
                                    courses={formData?.courses}
                                    level={formData?.level}
                                    onSelect={onSelect}
                                    selectedQuestions={formData && formData.questions ? formData.questions : []}
                                    onClose={() => setDialogOpen(false)}
                                />
                                : <React.Fragment />
                        }
                        {isRandomQuestionsDialogOpen && formData.level && formData.courses.length > 0 ?
                            <RandomQuestionsDialogBox
                                open={isRandomQuestionsDialogOpen}
                                onClose={() => setIsRandomQuestionsDialogOpen(false)}
                                onError={props.onError}
                                onLoading={props.onLoading}
                                courses={formData.courses}
                                level={formData.level}
                                setSelectedQuestions={onSelect}
                            /> : <React.Fragment />
                        }
                    </Box>
                </CardContent>
            </Card>
        </Container>
    )
};