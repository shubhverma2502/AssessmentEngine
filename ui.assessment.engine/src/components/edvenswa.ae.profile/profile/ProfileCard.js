import React, { useRef, useState } from "react";
import {
  Container,
  Box,
  Card,
  CardContent,
  TextField,
  Grid,
  Button,
  Avatar,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/material";
import { getFormFields } from "../Fields/getFields";
import { useTranslation } from "react-i18next";
import {
  DATE_OF_BIRTH_FIELD_ID,
  FIRSTNAME_FIELD_ID,
  LASTNAME_FIELD_ID,
  PROFESSION_FIELD_ID,
} from "../constants/constants";
import { doPutProfile } from "../actions/actions";
import moment from "moment";
import { Edit } from "@mui/icons-material";
import {
  isValidString,
  isValidDate,
} from "../../edvenswa.ae.common/validation/Validation";
import { useNavigate } from "react-router-dom";
import { AUTH_SECURE_USER_DETAILS_LS_LEY } from "../../edvenswa.ae.auth/constants/constants";

export default function ProfileCard(props) {

  const { t } = useTranslation();
  const { user } = props;

  const fields = [
    FIRSTNAME_FIELD_ID,
    LASTNAME_FIELD_ID,
    DATE_OF_BIRTH_FIELD_ID,
    PROFESSION_FIELD_ID,
  ];

  const formFields = getFormFields(fields);
  const [image, setImage] = useState(user?.profileImage);
  const inputRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function getBase64(file) {
    return new Promise(function (resolve, reject) {
      const reader = new FileReader();
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (Object.keys(errors).length === 0) {
      const formData = new FormData(event.currentTarget);
      formData.append("profileImage", image);
      doPutProfile(formData, handleSuccess, handleFailure,
        (state) => { setLoading(state); props.onLoading(state) });
    }
  };

  const handleSuccess = (newDetails) => {
    const previousDetails = JSON.parse(sessionStorage.getItem(AUTH_SECURE_USER_DETAILS_LS_LEY));
    // compare and set algorithm
    Object.keys(previousDetails).forEach((key) => {
      if (key === 'roles' || key === 'token' || key === 'type' || key === 'username') {
        return;
      }
      if (!newDetails[key]) {
        return;
      }
      if (newDetails[key] !== previousDetails[key]) {
        previousDetails[key] = newDetails[key];
      }
    })
    sessionStorage.setItem(AUTH_SECURE_USER_DETAILS_LS_LEY, JSON.stringify(previousDetails));
    props.onSuccess("Profile updated successfully");
    navigate("/home");
  };

  const handleOnChange = (event, field_name) => {
    const value = event.target.value;
    switch (field_name) {
      case FIRSTNAME_FIELD_ID:
      case LASTNAME_FIELD_ID:
      case PROFESSION_FIELD_ID:
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
      case DATE_OF_BIRTH_FIELD_ID:
        if (isValidDate(value)) {
          setErrors({
            ...errors,
            [field_name]: { message: "profile.INVALID_DOB_FIELD_TEXT" },
          });
        } else {
          const updatedErrors = { ...errors };
          delete updatedErrors[field_name];
          setErrors(updatedErrors);
        }
        break;
      default: {
        console.log("Invalid field name.", field_name);
      }
    }
  };

  const handleEditClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) {
      getBase64(file)
        .then((base64Version) => {
          setImage(base64Version);
        }).catch((err) => {
          console.error("An error occured during base64 conversion.", err);
        })
    }
  };

  const handleFailure = (error) => {
    props.onFailure("Failed to update profile");
  };

  return (
    <Container
      component={"main"}
      maxWidth="xs"
    >
      <Card >
        <CardContent>
          <Box>
            <Grid item xs={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                style={{ position: "relative" }}
              >
                <Avatar
                  alt="image"
                  src={image}
                  sx={{ width: 100, height: 100 }}
                />

                <Box
                  style={{ position: "absolute", bottom: 0, width: "100%" }}
                >
                  <Stack direction="row" spacing={2} justifyContent="center">
                    <Tooltip title="Edit Image">
                      <IconButton
                        sx={{
                          color: "#fff",
                          backgroundColor: "#555",
                          fontSize: "small",
                          opacity: 0.8,
                        }}
                        onClick={handleEditClick}
                      >
                        <Edit />
                        <input
                          type="file"
                          id="profile-image-input"
                          hidden
                          ref={inputRef}
                          onChange={handleFileChange}
                        />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Box>

              </Box>
            </Grid>
          </Box>
          <Box component={"form"} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {formFields.map((field, key) => (
                <Grid item key={key} xs={12}>
                  <TextField
                    key={key}
                    type={field.type}
                    id={field.id}
                    fullWidth
                    label={t(field.label)}
                    name={field.name}
                    placeholder={t(field.placeholder)}
                    variant={field.variant}
                    autoFocus={field.autoFocus}
                    InputLabelProps={{ shrink: true }}
                    InputProps={field.inputProps}
                    required={field.required}
                    onChange={(event) => handleOnChange(event, field.name)}
                    error={errors[field.name] ? true : false}
                    helperText={t(errors?.[field.name]?.message)}
                    defaultValue={
                      field.id === DATE_OF_BIRTH_FIELD_ID
                        ? moment(user?.[field.id])
                          .subtract(1, "M")
                          .format("YYYY-MM-DD")
                        : user?.[field.id]
                    }
                  />
                </Grid>
              ))}
              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <Button type="submit" variant="contained" color="primary"
                  size="small"
                  disabled={loading}
                >
                  {t("profile.UPDATE_BUTTON_TEXT")}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
