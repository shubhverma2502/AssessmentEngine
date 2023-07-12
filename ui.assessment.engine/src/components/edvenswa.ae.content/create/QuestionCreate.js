import { Delete, OnlinePrediction, Tag } from "@mui/icons-material";
import {
  Badge,
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Container,
  Grid,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { isValidTitle } from "../../edvenswa.ae.common/validation/Validation";
import {
  COMMON_WORDS_OR_BLACKLISTED_TAGS,
  QUESTION_COURSE_FIELD_ID,
  QUESTION_LEVEL_FIELD_ID,
  QUESTION_QUESTION_FIELD_ID,
  QUESTION_TYPE_FIELD_ID,
} from "../../edvenswa.ae.content/constants/constants";
import {
  doGetCourses,
  doGetExamLevels,
} from "../../edvenswa.ae.exam/actions/actions";
import { doGetQuestionTypes } from "../actions/actions";
import { getContentFields } from "../forms/GetFields";
import OptionsDialogBox from "./OptionsDialogBox";

export default function QuestionCreate(props) {
  const location = useLocation();
  const { t } = useTranslation();
  const { onError, formData, setFormData, setFieldsCount } = props;
  const fields = [
    QUESTION_QUESTION_FIELD_ID,
    QUESTION_LEVEL_FIELD_ID,
    QUESTION_COURSE_FIELD_ID,
    QUESTION_TYPE_FIELD_ID,
  ];
  const formFields = getContentFields(fields);

  const [course, setCourse] = useState([]);
  const [levels, setLevels] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState({});
  const [question, setQuestion] = useState("");
  const [questionType, setQuestionType] = useState([]);
  const [selectedQuestionType, setSelectedQuestionType] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [level, setLevel] = useState("");
  const [newTag, setNewTag] = useState("");
  const [addTag, setAddTag] = useState(false);
  const [selectedCorrectoptions, setSelectedCorrectOptions] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFieldsCount(formFields.length + 2);
    setQuestion(formData.question);
    if (course.length === 0) {
      doGetCourses(handleSuccess, handleFailure);
    }
    if (levels.length === 0) {
      doGetExamLevels(handleSuccess, handleFailure);
    }
    if (questionType.length === 0) {
      doGetQuestionTypes(handleSuccess, handleFailure, handleLoading);
    }

    const state = location.state;
    const question = state && state.question ? state.question : {};

    if (Object.keys(question).length > 0) {
      setQuestion(question.question);
      setLevel(question.level);
      setSelectedQuestionType(question.questionType);
      setSelectedCorrectOptions(question.correctOptions);
      setSelectedOptions(question.options);
      setSelectedCourse(question.course);
      return;
    }
    // eslint-disable-next-line
  }, []);

  const handleSuccess = (data, type) => {
    switch (type) {
      case "GET_COURSES": {
        setCourse(data);
        break;
      }
      case "GET_LEVELS": {
        setLevels(data);
        break;
      }
      case "GET_QUESTION_TYPES": {
        setQuestionType(data);
        break;
      }
      case "QUESTION_OPTIONS_FIELD_ID": {
        setOptions(data);
        break;
      }
      default: {
        props.onSuccess(data);
      }
    }
  };

  const handleFailure = (error) => {
    onError(error);
  };
  const handleLoading = (state) => {};

  const handleChange = (field_name, value) => {
    switch (field_name) {
      case QUESTION_QUESTION_FIELD_ID: {
        if (!isValidTitle(value)) {
          setErrors({ [field_name]: { message: "Set a proper Question." } });
        } else {
          setErrors(delete [field_name]);

          const words = value.toLowerCase().split(" ");
          // Filtering out common words and create a set of unique tags
          const tag = [
            ...new Set(
              words.filter(
                (word) =>
                  !COMMON_WORDS_OR_BLACKLISTED_TAGS.includes(word) &&
                  word.length > 3
              )
            ),
          ];
          setFormData({ ...formData, [field_name]: value, tags: tag });
        }
        break;
      }
      case QUESTION_COURSE_FIELD_ID: {
        setFormData({ ...formData, [field_name]: value });
        break;
      }
      case QUESTION_LEVEL_FIELD_ID: {
        setFormData({ ...formData, [field_name]: value });
        break;
      }
      case QUESTION_TYPE_FIELD_ID: {
        setFormData({ ...formData, [field_name]: value });
        setSelectedQuestionType(value);
        break;
      }
      default: {
        console.error("Invalid question: ", field_name);
      }
    }
  };

  const handleAddTag = () => {
    if (newTag.toLowerCase() !== "") {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.toLowerCase()],
      });
      setNewTag("");
    }
    setAddTag(false); // Reset the isAddingTag state
  };

  return (
    <Container maxWidth={"md"} component={"main"}>
      <Card>
        <CardHeader
          title={
            <Stack direction={"row-reverse"} spacing={2}>
              {selectedQuestionType ? (
                <React.Fragment>
                  <Badge
                    badgeContent={selectedOptions.length}
                    color="primary"
                    showZero
                  >
                    <OnlinePrediction
                      color="action"
                      onClick={() => setDialogOpen(true)}
                    ></OnlinePrediction>
                  </Badge>
                </React.Fragment>
              ) : (
                <React.Fragment></React.Fragment>
              )}
            </Stack>
          }
          sx={{ textAlign: "end", marginRight: "1rem", cursor: "pointer" }}
        ></CardHeader>
        <CardContent>
          <Box component="form">
            <Grid container spacing={2}>
              {formFields.map((field, key) => {
                return (
                  <Grid item xs={12} key={key}>
                    {
                      <TextField
                        {...field}
                        key={key}
                        fullWidth
                        label={t(field.label)}
                        required
                        error={errors[field.id] ? true : false}
                        helperText={t(errors?.[field.id]?.message)}
                        defaultValue={
                          location.state && location.state.question
                            ? location.state.question[field.id]
                            : formData
                            ? formData[field.id]
                            : ""
                        }
                        onChange={(event) =>
                          handleChange(field.id, event.target.value)
                        }
                      >
                        {field.select &&
                        field.id === QUESTION_COURSE_FIELD_ID ? (
                          course.map((course, idx1) => {
                            return (
                              <MenuItem value={course} key={idx1}>
                                {course?.courseName}
                              </MenuItem>
                            );
                          })
                        ) : field.id === QUESTION_LEVEL_FIELD_ID ? (
                          levels.map((level, idx2) => {
                            return (
                              <MenuItem value={level} key={idx2}>
                                {level}
                              </MenuItem>
                            );
                          })
                        ) : field.id === QUESTION_TYPE_FIELD_ID ? (
                          questionType.map((type, idx3) => {
                            return (
                              <MenuItem value={type} key={idx3}>
                                {type}
                              </MenuItem>
                            );
                          })
                        ) : (
                          <React.Fragment></React.Fragment>
                        )}
                      </TextField>
                    }
                    {field.id === QUESTION_COURSE_FIELD_ID &&
                    Object.keys(formData).length > 0 ? (
                      <Stack direction="row" spacing={1} mt={1}>
                        {formData.course && (
                          <Chip
                            label={formData.course.courseName}
                            size="small"
                            sx={{ backgroundColor: "#2c6b79 !important" }}
                            deleteIcon={
                              <Delete sx={{ color: "#d19c9c !important" }} />
                            }
                            onDelete={() => setSelectedCourse({})}
                          />
                        )}
                      </Stack>
                    ) : (
                      <></>
                    )}
                    {field.id === QUESTION_QUESTION_FIELD_ID &&
                    Object.keys(formData).length > 0 ? (
                      <Stack direction="row" spacing={1} mt={1}>
                        <Grid >
                          {" "}
                          {formData.tags && formData.tags.map((tag) => (
                            <>
                              <Chip
                                label={tag}
                                size="small"
                                sx={{ backgroundColor: "#2c6b79 !important" }}
                                icon={<Tag style={{ color: "#FFFFFF" }} />}
                                deleteIcon={
                                  <Delete
                                    sx={{ color: "#d19c9c !important" }}
                                  />
                                }
                                onDelete={() =>
                                  setFormData({
                                    ...formData,
                                    tags: formData.tags.filter(
                                      (selectedtag) => selectedtag !== tag
                                    ),
                                  })
                                }
                              />
                            </>
                          ))}
                          {addTag && (
                            <TextField
                              size="small"
                              label="Enter New Tag"
                              value={newTag}
                              variant="standard"
                              onChange={(e) => setNewTag(e.target.value)} // Update the 'newTag' state when the input value changes
                              autoFocus // Automatically focuses the input field when the component mounts
                              onBlur={handleAddTag} // Event handler triggered when the input field loses focus (when the user clicks outside the input)
                            />
                          )}
                          <Chip
                            label="+"
                            size="small"
                            sx={{ backgroundColor: "#2c6b79 !important" }}
                            onClick={() => setAddTag(true)}
                          />
                        </Grid>
                      </Stack>
                    ) : (
                      <></>
                    )}
                  </Grid>
                );
              })}
            </Grid>
            {dialogOpen && selectedQuestionType ? (
              <OptionsDialogBox
                setOptions={setSelectedOptions}
                setCorrectOptions={setSelectedCorrectOptions}
                options={selectedOptions}
                correctOptions={selectedCorrectoptions}
                questionType={selectedQuestionType}
                setDialogOpen={setDialogOpen}
                dialogOpen={dialogOpen}
                formData={formData}
                setFormData={setFormData}
              />
            ) : (
              <React.Fragment />
            )}
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
