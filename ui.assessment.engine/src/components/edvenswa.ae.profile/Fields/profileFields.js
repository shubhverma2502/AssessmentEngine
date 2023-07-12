import {  AssignmentInd, Celebration, Dns , Notes } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import { DATE_OF_BIRTH_FIELD_ID,FIRSTNAME_FIELD_ID, LASTNAME_FIELD_ID, PROFESSION_FIELD_ID,PROFILE_IMAGE_FIELD_ID } from "../constants/constants";

export const profileFields = {
    [FIRSTNAME_FIELD_ID]: {
        id: FIRSTNAME_FIELD_ID,
        name: FIRSTNAME_FIELD_ID,
        type: "text",
        label: "profile.FIRSTNAME_FIELD_TEXT",
        placeholder: "profile.FIRSTNAME_FIELD_PLACEHOLDER_TEXT",
        variant: "standard",
        autoFocus: false,
        required: true,
        inputProps:
        {
            startAdornment: (
                <InputAdornment position="start">
                    <Dns fontSize="small" />
                </InputAdornment>
            )
        }
    },
    [LASTNAME_FIELD_ID]: {
        id: LASTNAME_FIELD_ID,
        name: LASTNAME_FIELD_ID,
        type: "text",
        label: "profile.LASTNAME_FIELD_TEXT",
        placeholder: "profile.LASTNAME_FIELD_PLACEHOLDER_TEXT",
        variant: "standard",
        autoFocus: false,
        required: true,
        inputProps:
        {
            startAdornment: (
                <InputAdornment position="start">
                    <Dns fontSize="small" />
                </InputAdornment>
            )
        }
    },
    [DATE_OF_BIRTH_FIELD_ID]: {
        id: DATE_OF_BIRTH_FIELD_ID,
        name: DATE_OF_BIRTH_FIELD_ID,
        type: "date",
        label: "profile.DATE_OF_BIRTH_FIELD_TEXT",
        placeholder: "profile.DATE_OF_BIRTH_PLACEHOLDER_TEXT",
        variant: "standard",
        required: true,
        inputProps:
        {
            startAdornment: (
                <InputAdornment position="start">
                    <Celebration fontSize="small" />
                </InputAdornment>
            )
        }
    },
    [PROFESSION_FIELD_ID]: {
        id: PROFESSION_FIELD_ID,
        name: PROFESSION_FIELD_ID,
        type: "text",
        label: "profile.PROFESSION_FIELD_TEXT",
        placeholder: "profile.PROFESSION_FIELD_PLACEHOLDER_TEXT",
        variant: "standard",
        autoFocus: false,
        required: true,
        inputProps:
        {
            startAdornment: (
                <InputAdornment position="start">
                    <AssignmentInd fontSize="small" />
                </InputAdornment>
            )
        }
    },
    [PROFILE_IMAGE_FIELD_ID]: {
        id: PROFILE_IMAGE_FIELD_ID,
        name: PROFILE_IMAGE_FIELD_ID,
        type: "file",
        label: "profile.PROFILE_IMAGE_FIELD_TEXT",
        placeholder: "profile.PROFILE_IMAGE_FIELD_PLACEHOLDER_TEXT",
        variant: "standard",
        autoFocus: false,
        required: true,
        inputProps:
        {
            startAdornment: (
                <InputAdornment position="start">
                    <Notes fontSize="small" />
                </InputAdornment>
            )
        }
    },
    
}    