import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { QUESTION_CREATION_STEPS } from "../constants/constants";
import QuestionCreate from "./QuestionCreate";
import QuestionCreation from "./QuestionCreation";
import QuestionFilter from "./QuestionFilter";
import SearchQuestionContainer from "./SearchQuestionContainer";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { doCreateQuestion } from "../actions/actions";

const steps = QUESTION_CREATION_STEPS;

const StepperComponent = (props) => {

  const location = useLocation();
  const navigate = useNavigate();
  const { onError, onSuccess } = props;
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [fieldsCount, setFieldsCount] = useState(0);

  useEffect(() => {
    if (
      location &&
      location.state &&
      location.state.question &&
      Object.keys(formData).length === 0
    ) {
      setFormData(location.state.question);
    }
  }, []);

  const handleNext = () => {
    if (activeStep === 3) {
      
    
      doCreateQuestion(formData, handleSuccess, handleFailure, handleLoading)
    }
    if (Object.keys(formData).length >= fieldsCount) {
      if (activeStep < steps.length - 1) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else {
      let error = {
        response: {
          data: "Please fill all details to go to next step",
        },
      };
      onError(error);
    }
  };
  const handleBack = () => {
    if(activeStep === 2){
      setFormData({})
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }

  const handleSuccess = (data) => {
    onSuccess(data);
    setActiveStep(activeStep - 3);
    setFormData({});
    navigate('/content/dashboard/managequestion/question');
};

const handleFailure = (data) => {
    onError(data);
};

  const handleLoading = (state) => {
};
  const renderStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <QuestionFilter
            formData={formData}
            setFormData={setFormData}
            course={formData.course}
            level={formData.level}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            setFieldsCount={setFieldsCount}
          />
        );
      case 1:
        return (
          <SearchQuestionContainer
            formData={formData}
            setFormData={setFormData}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            setFieldsCount={setFieldsCount}
          />
        );
      case 2:
        return (
          <QuestionCreate
            formData={formData}
            setFormData={setFormData}
            setFieldsCount={setFieldsCount}
          />
        );
      case 3:
        return (
          <QuestionCreation
            formData={formData}
            setFormData={setFormData}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            onError={onError}
            onSuccess={onSuccess}
            setFieldsCount={setFieldsCount}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth={"md"} component={"main"}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Stepper
                sx={{ marginTop: "2rem" }}
                activeStep={activeStep}
                alternativeLabel
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>{renderStepContent(activeStep)}</CardContent>
            <CardActions>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  {activeStep > 0 && (
                    <Button
                      variant="contained"
                      onClick={handleBack}
                      size="small"
                      startIcon={<ArrowBack />}
                    >
                      Back
                    </Button>
                  )}
                </Grid>

                <Grid item xs={6} sx={{ textAlign: "end" }}>
                {activeStep > 0 && (
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      size="small"
                      endIcon={<ArrowForward />}
                    >
                      {activeStep === steps.length - 1 ? "Create Question" : "Next"}
                    </Button>
                )}
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default StepperComponent;