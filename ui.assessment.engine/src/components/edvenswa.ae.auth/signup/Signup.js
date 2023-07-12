import {
  Container,
  Card,
  CardContent,
  TextField,
  Grid,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
  MenuItem,
} from "@mui/material";

import { Box } from "@mui/material";

import { Link, useNavigate } from "react-router-dom";

import { doGenerateOTP, doResetPassword, doSignup } from "../actions/actions";

import React, { useState } from "react";

import { getFormFields } from "../forms/getFields";

import { useTranslation } from "react-i18next";

import {
  AUTH_BRANCH_FIELD_ID,
  AUTH_CONFRIM_PASSWORD_FIELD_ID,
  AUTH_FIRSTNAME_FIELD_ID,
  AUTH_GENDER_FIELD_ID,
  AUTH_LASTNAME_FIELD_ID,
  AUTH_MOBILE_FIELD_ID,
  AUTH_OTP_FIELD_ID,
  AUTH_PASSWORD_FIELD_ID,
  AUTH_PROCEED_SIGNUP,
  AUTH_ROLE_FIELD_ID,
  AUTH_SEND_OTP,
  AUTH_USERNAME_FIELD_ID,
} from "../constants/constants";

import AuthLogoContainer from "../common/AuthLogoContainer";

import {
  comparePasswords,
  isValidEmail,
  isValidMoblie,
  isValidOTP,
  isValidPassword,
  isValidString,
} from "../../edvenswa.ae.common/validation/Validation";

import PropTypes from "prop-types";

import "../styles/Auth.css";

Signup.propTypes = {
  type: PropTypes.string,

  container_title: PropTypes.string,

  otp_button_label: PropTypes.string,

  reset_button_label: PropTypes.string,
};

export default function Signup(props) {
  const navigate = useNavigate();

  const { t, i18n } = useTranslation();

  const [loading, setLoading] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [errorMessage, setErrorMessage] = useState(null);

  const [buttonType, setButtonType] = useState(AUTH_SEND_OTP);

  const [errors, setErrors] = useState({});

  const [email, setEmail] = useState(null);

  const [password, setPassword] = useState(null);

  const [enableOTPField, setEnableOTPField] = useState(false);

  const gender = ["MALE", "FEMALE"];

  const roles = [
    {
      value: "ROLE_USER",
      name: "Direct User",
    },

    {
      value: "ROLE_CAMPUS_USER",
      name: "Campus User",
    },
  ];

  const [selectedRole, setSelectedRole] = useState("");

  const Signupfields = [
    AUTH_USERNAME_FIELD_ID,

    AUTH_OTP_FIELD_ID,

    AUTH_FIRSTNAME_FIELD_ID,

    AUTH_LASTNAME_FIELD_ID,

    AUTH_PASSWORD_FIELD_ID,

    AUTH_CONFRIM_PASSWORD_FIELD_ID,

    AUTH_ROLE_FIELD_ID,

    AUTH_BRANCH_FIELD_ID,

    AUTH_MOBILE_FIELD_ID,

    AUTH_GENDER_FIELD_ID,
  ];

  const ResetPasswordfields = [
    AUTH_USERNAME_FIELD_ID,

    AUTH_OTP_FIELD_ID,

    AUTH_PASSWORD_FIELD_ID,

    AUTH_CONFRIM_PASSWORD_FIELD_ID,
  ];

  const SignupformFields = getFormFields(Signupfields);

  const ResetPasswordformFields = getFormFields(ResetPasswordfields);

  const handleOnChange = (event, field_name) => {
    const value = event.target.value;

    switch (field_name) {
      case AUTH_USERNAME_FIELD_ID: {
        if (!isValidEmail(value)) {
          setErrors({ [field_name]: { message: "auth.INVALID_EMAIL_TEXT" } });
        } else {
          setErrors(delete [field_name]);

          setEmail(value);
        }

        break;
      }

      case AUTH_PASSWORD_FIELD_ID: {
        if (!isValidPassword(value)) {
          setErrors({
            [field_name]: { message: "auth.INVALID_PASSWORD_TEXT" },
          });
        } else {
          setErrors(delete [field_name]);
        }

        setPassword(value);

        break;
      }

      case AUTH_FIRSTNAME_FIELD_ID:
      case AUTH_BRANCH_FIELD_ID:
      case AUTH_LASTNAME_FIELD_ID: {
        if (!isValidString(value)) {
          setErrors({
            ...errors,

            [field_name]: { message: "profile.INVALID_FIELD_TEXT" },
          });
        } else {
          const updatedErrors = { ...errors };

          delete updatedErrors[field_name];

          setErrors(updatedErrors);
        }

        break;
      }

      case AUTH_OTP_FIELD_ID: {
        if (!isValidOTP(value)) {
          setErrors({ [field_name]: { message: "auth.INVALID_OTP_TEXT" } });
        } else {
          setErrors(delete [field_name]);
        }

        break;
      }
      case AUTH_MOBILE_FIELD_ID: {
        if (!isValidMoblie(value)) {
          setErrors({ [field_name]: { message: "Mobile number must be 10 digits " } });
        } else {
          setErrors(delete [field_name]);
        }

        break;
      }

      case AUTH_CONFRIM_PASSWORD_FIELD_ID: {
        if (comparePasswords(password, value)) {
          setErrors({
            [field_name]: { message: "auth.INVALID_CONFIRM_PASSWORD_TEXT" },
          });
        } else {
          setErrors(delete [field_name]);
        }

        break;
      }

      case AUTH_ROLE_FIELD_ID: 
      case AUTH_GENDER_FIELD_ID:{
        break;
      }

      default: {
        throw new Error("Invalid field name " + field_name);
      }
    }
  };

  const handleSendOTP = (event) => {
    event.preventDefault();

    if (email && isValidEmail(email)) {
      setErrors(delete [AUTH_USERNAME_FIELD_ID]);

      const data = {
        username: email,

        validate: props.type === "RESET" ? false : true,
      };

      setLoading(true);
      doGenerateOTP(data)
        .then((res) => {
          setLoading(false);

          setEnableOTPField(!enableOTPField);

          setButtonType(AUTH_PROCEED_SIGNUP);
        })

        .catch((err) => {
          setLoading(false);

          if (err.response && err.response.data) {
            // application specific error

            handleFailure(err.response?.data);
          } else {
            // generic axios error

            handleFailure(err.message);
          }
        });
    } else {
      setErrors({
        [AUTH_USERNAME_FIELD_ID]: { message: "auth.INVALID_EMAIL_TEXT" },
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    event.stopPropagation();

    if (Object.keys(errors).length === 0) {
      const formData = new FormData(event.currentTarget);

      props.type === "RESET"
        ? doResetPassword(formData, handleSuccess, handleFailure, handleLoading)
        : doSignup(formData, handleSuccess, handleFailure, handleLoading);
    }
  };

  const handleSuccess = () => {
    navigate("/signin");
  };

  const handleFailure = (error) => {
    setErrorMessage(error);

    setSnackbarOpen(!snackbarOpen);
  };

  const handleLoading = (state) => {
    setLoading(state);
  };

  return (
    <Container
      style={styles.ae_signup_container}
      component={"main"}
      maxWidth="xs"
    >
      <Card style={styles.ae_signup_card}>
        <CardContent>
          <Box component={"form"} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <AuthLogoContainer
                title={
                  props && props.container_title
                    ? t(props.container_title)
                    : t("auth.signup.SIGNUP_TEXT")
                }
              />

              {(props && props.container_title
                ? ResetPasswordformFields
                : SignupformFields
              ).map((field, key) => {
                if (
                  !enableOTPField &&
                  [
                    AUTH_OTP_FIELD_ID,

                    AUTH_PASSWORD_FIELD_ID,

                    AUTH_CONFRIM_PASSWORD_FIELD_ID,
                  ].includes(field.name)
                ) {
                  return <React.Fragment key={key} />;
                }

                if (
                  !enableOTPField &&
                  [
                    AUTH_OTP_FIELD_ID,

                    AUTH_PASSWORD_FIELD_ID,

                    AUTH_CONFRIM_PASSWORD_FIELD_ID,

                    AUTH_FIRSTNAME_FIELD_ID,

                    AUTH_LASTNAME_FIELD_ID,

                    AUTH_ROLE_FIELD_ID,
                  ].includes(field.name)
                ) {
                  return <React.Fragment key={key} />;
                }
                if (
                  [
                    AUTH_BRANCH_FIELD_ID,
                    AUTH_MOBILE_FIELD_ID,
                    AUTH_GENDER_FIELD_ID,
                  ].includes(field.name) &&
                  selectedRole !== "ROLE_CAMPUS_USER"
                ) {
                  return <React.Fragment key={key} />;
                }

                return (
                  <Grid item key={key} xs={12}>
                    <TextField
                      key={key}
                      type={field.type}
                      id={field.id}
                      fullWidth
                      disabled={loading}
                      label={t(field.label)}
                      name={field.name}
                      placeholder={t(field.placeholder)}
                      variant={field.variant}
                      autoFocus={field.autoFocus}
                      InputLabelProps={{ shrink: true }}
                      InputProps={field.inputProps}
                      required={field.required}
                      onChange={(event) => {
                        handleOnChange(event, field.name);

                        if (field.id === AUTH_ROLE_FIELD_ID) {
                          setSelectedRole(event.target.value);
                        }
                      }}
                      error={errors[field.name] ? true : false}
                      helperText={t(errors?.[field.name]?.message)}
                      select={field.select}

                      // value={selectedRole}
                    >
                      {field.select && field.id === AUTH_GENDER_FIELD_ID ? (
                        gender.map((course, idx1) => {
                          return (
                            <MenuItem value={course} key={idx1}>
                              {course}
                            </MenuItem>
                          );
                        })
                      ) : field.id === AUTH_ROLE_FIELD_ID ? (
                        roles.map((level, idx2) => {
                          return (
                            <MenuItem value={level.value} key={idx2}>
                              {level.name}
                            </MenuItem>
                          );
                        })
                      ) : (
                        <></>
                      )}
                    </TextField>
                  </Grid>
                );
              })}

              <Grid item xs>
                {loading ? (
                  <CircularProgress />
                ) : (
                  <Button
                    variant="contained"
                    type={buttonType === AUTH_SEND_OTP ? "button" : "submit"}
                    size="small"
                    onClick={
                      buttonType === AUTH_SEND_OTP ? handleSendOTP : () => {}
                    }
                  >
                    {buttonType === AUTH_SEND_OTP
                      ? props && props.otp_button_label
                        ? t(props.otp_button_label)
                        : t("auth.signup.SIGNUP_BUTTON_SEND_OTP_TEXT")
                      : props && props.reset_button_label
                      ? t(props.reset_button_label)
                      : t("auth.signup.SIGNUP_BUTTON_FINISH_SIGNUP_TEXT")}
                  </Button>
                )}
              </Grid>

              <Grid item xs={12}>
                <Link
                  to="/signin"
                  style={styles.ae_signup_link_styles}
                  hidden={loading}
                >
                  {t("auth.signup.ACCOUNT_SIGNIN_TEXT")}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>

      <Snackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(!snackbarOpen)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={3000}
      >
        <Alert severity="warning">{errorMessage}</Alert>
      </Snackbar>
    </Container>
  );
}

const styles = {
  ae_signup_link_styles: {
    color: "#1976d2",

    fontWeight: 400,

    fontSize: "0.875rem",
  },

  ae_signup_container: {
    marginTop: "3rem",

    textAlign: "center",

    justifyContent: "center",

    display: "flex",
  },

  ae_signup_card: {
    borderRadius: "0.85rem",
  },
};
