import { Email, Key, Output } from "@mui/icons-material";

import PersonIcon from "@mui/icons-material/Person";

import { InputAdornment } from "@mui/material";

import {
  AUTH_BRANCH_FIELD_ID,
  AUTH_CONFRIM_PASSWORD_FIELD_ID,
  AUTH_FIRSTNAME_FIELD_ID,
  AUTH_GENDER_FIELD_ID,
  AUTH_LASTNAME_FIELD_ID,
  AUTH_MOBILE_FIELD_ID,
  AUTH_OTP_FIELD_ID,
  AUTH_PASSWORD_FIELD_ID,
  AUTH_ROLE_FIELD_ID,
  AUTH_USERNAME_FIELD_ID,
} from "../constants/constants";

export const authFields = {
  [AUTH_USERNAME_FIELD_ID]: {
    id: AUTH_USERNAME_FIELD_ID,

    name: AUTH_USERNAME_FIELD_ID,

    type: "text",

    label: "auth.EMAIL_FIELD_TEXT",

    placeholder: "auth.EMAIL_FIELD_PLACEHOLDER_TEXT",

    variant: "outlined",

    autoFocus: true,

    required: true,

    inputProps: {
      startAdornment: (
        <InputAdornment position="start">
          <Email fontSize="small" />
        </InputAdornment>
      ),
    },
  },

  [AUTH_FIRSTNAME_FIELD_ID]: {
    id: AUTH_FIRSTNAME_FIELD_ID,

    name: AUTH_FIRSTNAME_FIELD_ID,

    type: "text",

    label: "auth.FIRSTNAME_FIELD_TEXT",

    placeholder: "auth.FIRSTNAME_FIELD_PLACEHOLDER_TEXT",

    variant: "outlined",

    autoFocus: true,

    required: true,

    inputProps: {
      startAdornment: (
        <InputAdornment position="start">
          <PersonIcon fontSize="small" />
        </InputAdornment>
      ),
    },
  },

  [AUTH_LASTNAME_FIELD_ID]: {
    id: AUTH_LASTNAME_FIELD_ID,

    name: AUTH_LASTNAME_FIELD_ID,

    type: "text",

    label: "auth.LASTNAME_FIELD_TEXT",

    placeholder: "auth.LASTNAME_FIELD_PLACEHOLDER_TEXT",

    variant: "outlined",

    autoFocus: true,

    required: true,

    inputProps: {
      startAdornment: (
        <InputAdornment position="start">
          <PersonIcon fontSize="small" />
        </InputAdornment>
      ),
    },
  },

  [AUTH_GENDER_FIELD_ID]: {
    id: AUTH_GENDER_FIELD_ID,

    name: AUTH_GENDER_FIELD_ID,

    select: true,

    label: "Gender",

    placeholder: "select Gender",

    variant: "outlined",

    autoFocus: true,

    required: true,

    inputProps: {
      startAdornment: (
        <InputAdornment position="start">
          <PersonIcon fontSize="small" />
        </InputAdornment>
      ),
    },
  },

  [AUTH_ROLE_FIELD_ID]: {
    id: AUTH_ROLE_FIELD_ID,

    name: AUTH_ROLE_FIELD_ID,

    select: true,

    label: "Role",

    placeholder: "select Role",

    variant: "outlined",

    autoFocus: true,

    required: true,

    inputProps: {
      startAdornment: (
        <InputAdornment position="start">
          <PersonIcon fontSize="small" />
        </InputAdornment>
      ),
    },
  },

  [AUTH_MOBILE_FIELD_ID]: {
    id: AUTH_MOBILE_FIELD_ID,

    name: AUTH_MOBILE_FIELD_ID,

    type: "text",

    label: "Mobile",

    placeholder: "Mobile Number",

    variant: "outlined",

    autoFocus: true,

    required: true,

    inputProps: {
      startAdornment: (
        <InputAdornment position="start">
          <PersonIcon fontSize="small" />
        </InputAdornment>
      ),
    },
  },

  [AUTH_BRANCH_FIELD_ID]: {
    id: AUTH_BRANCH_FIELD_ID,

    name: AUTH_BRANCH_FIELD_ID,

    type: "text",

    label: "Branch",

    placeholder: "Branch Name",

    variant: "outlined",

    autoFocus: true,

    required: true,

    inputProps: {
      startAdornment: (
        <InputAdornment position="start">
          <PersonIcon fontSize="small" />
        </InputAdornment>
      ),
    },
  },

  [AUTH_OTP_FIELD_ID]: {
    id: AUTH_OTP_FIELD_ID,

    name: AUTH_OTP_FIELD_ID,

    type: "number",

    label: "auth.OTP_FIELD_TEXT",

    placeholder: "auth.OTP_FIELD_PLACEHOLDER_TEXT",

    variant: "outlined",

    required: true,

    inputProps: {
      startAdornment: (
        <InputAdornment position="start">
          <Output fontSize="small" />
        </InputAdornment>
      ),
    },
  },

  [AUTH_PASSWORD_FIELD_ID]: {
    id: AUTH_PASSWORD_FIELD_ID,

    name: AUTH_PASSWORD_FIELD_ID,

    type: "password",

    label: "auth.PASSWORD_FIELD_TEXT",

    placeholder: "auth.PASSWORD_FIELD_PLACEHOLDER_TEXT",

    variant: "outlined",

    required: true,

    inputProps: {
      startAdornment: (
        <InputAdornment position="start">
          <Key fontSize="small" />
        </InputAdornment>
      ),
    },
  },

  [AUTH_CONFRIM_PASSWORD_FIELD_ID]: {
    id: AUTH_CONFRIM_PASSWORD_FIELD_ID,

    name: AUTH_CONFRIM_PASSWORD_FIELD_ID,

    type: "password",

    label: "auth.CONFIRM_PASSWORD_FIELD_TEXT",

    placeholder: "auth.CONFIRM_PASSWORD_FIELD_PLACEHOLDER_TEXT",

    variant: "outlined",

    required: true,

    inputProps: {
      startAdornment: (
        <InputAdornment position="start">
          <Key fontSize="small" />
        </InputAdornment>
      ),
    },
  },
};
