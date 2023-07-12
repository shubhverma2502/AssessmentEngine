/*
This component represents a stepper for creating a new exam. It contains several steps, including
creating the exam, selecting questions, and inviting users to the exam. The StepperComponent
is responsible for rendering the content of each step based on the active step index. The component
also handles navigation between steps and submission of the exam creation form.
*/
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, Container, Grid, Step, StepLabel, Stepper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { doCreateExam } from "../actions/actions";
import { DEFAULT_IMAGE, EXAM_CREATION_STEPS } from "../constants/constants";
import CreateExam from "./ExamCreate";
import ExamCreation from "./ExamCreation";
import QuestionSelection from "./QuestionSelection";

const steps = EXAM_CREATION_STEPS;

const StepperComponent = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { onError, onLoading, onSuccess } = props;
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [invitationMode, setInvitationMode] = useState();
  const [fieldsCount, setFieldsCount] = useState(0);
  const [count, setCount] = useState(0);
  const [isExamCreated, setIsExamCreated] = useState(false);
  const [invitationSent, setInvitationSent] = useState(false);
  // useEffect hook for setting form data from location state when available
  useEffect(() => {
    if (location && location.state && location.state.exam && Object.keys(formData).length === 0) {
      setFormData(location.state.exam);
    }
  }, [formData]);
  // function for handling next step button click
  const handleNext = () => {
    if (Object.keys(formData).length >= fieldsCount) {
      if (activeStep === 2) {
        if (!formData.id) {
          formData.id = "";
        }
        if (!formData.examImage) {
          formData.examImage = DEFAULT_IMAGE;
        }
        // Call the "doCreateExam" action to create the exam
        doCreateExam(formData, handleSuccess, handleFailure, handleLoading);
        return;
      }
      if (activeStep < steps.length - 1) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
    else {
      // if form fields not filled, display error message
      let error = {
        response: {
          data: "Please fill all fields to proceed to the next step"
        }
      };
      handleFailure(error)
    }
  };
  // function for handling back button click
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSuccess = (data) => {
    setFormData(data);
    setIsExamCreated(true);
    if (formData?.id) {
      props?.onSuccess("Exam modified successfully");
    }
    else {
      props?.onSuccess("Exam created successfully");
    }
    navigate("/console/examtypes/exams", {
      state: {
        examType: formData.examType
      }
    });
  }

  const handleLoading = (state) => {
    onLoading(state);
  }

  const handleFailure = (data) => {
    onError(data);
  }
  // function for rendering step content based on active step index
  const renderStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return <CreateExam formData={formData} setFormData={setFormData} setCount={setCount}
          setFieldsCount={setFieldsCount} selectedCourses={selectedCourses} setSelectedCourses={setSelectedCourses} />;
      case 1:
        return <QuestionSelection formData={formData} setFormData={setFormData} count={count}
          setFieldsCount={setFieldsCount} onError={onError} onLoading={onLoading} />;
      case 2:
        return <ExamCreation formData={formData} setFormData={setFormData}
          onError={onError} onSuccess={onSuccess} />;
      default:
        return null;
    }
  };

  return (
    <Container maxWidth={"md"} component={"main"} sx={{ marginTop: "0.5rem" }}>
      <Card sx={{ marginBottom: "0.5rem" }}>
        <CardContent>
          <Stepper activeStep={activeStep} alternativeLabel sx={{ marginTop: "1rem" }} orientation="horizontal">
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </CardContent>
      </Card>
      <Card>
        <CardContent>{renderStepContent(activeStep)}</CardContent>
        <CardActions>
          <Grid container spacing={2} justifyContent="space-between">
            {!isExamCreated ?
              <Grid item>
                {
                  (activeStep !== 0)
                    ? <Button disabled={activeStep === 0} variant="contained" onClick={handleBack} size="small"
                      startIcon={<ArrowBack />}
                    >
                      Back
                    </Button>
                    : <></>
                }
              </Grid> : <React.Fragment></React.Fragment>
            }
            <Grid item sx={{ flexGrow: 1 }} />
            <Grid item sx={{ textAlign: "right" }}>
              <Button variant="contained" onClick={handleNext} size="small" endIcon={<ArrowForward />}>
                {activeStep === 2 ? formData?.id ? "Modify and Finish" : "Save and Finish" : "Next"}
              </Button>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Container>
  );
};

export default StepperComponent;
