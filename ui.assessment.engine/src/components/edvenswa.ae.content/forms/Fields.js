import { Assessment, FileCopy, Layers, Notes } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import { CONTENT_FIELD_ID, QUESTION_CORRECT_OPTIONS_FIELD_ID, QUESTION_COURSE_FIELD_ID, QUESTION_LEVEL_FIELD_ID, QUESTION_OPTIONS_FIELD_ID, QUESTION_QUESTION_FIELD_ID, QUESTION_TYPE_FIELD_ID } from "../constants/constants";

export const contentFields = {
    [CONTENT_FIELD_ID]: {
        id: CONTENT_FIELD_ID,
        type: "file",
        label: "content.CONTENT_FIELD_TEXT",
        variant: "outlined",
        required: true,
        InputLabelProps: { shrink: true },
        InputProps:
        {
            accept: "application/json",
            startAdornment: (
                <InputAdornment position="start">
                    <FileCopy
                     fontSize="small" />
                </InputAdornment>
            )
        }
    },
  
    [QUESTION_QUESTION_FIELD_ID]: {
        id: QUESTION_QUESTION_FIELD_ID,
        type: "text",
        label: "content.QUESTION_FIELD_TEXT",
        variant: "outlined",
        placeholder: "Enter title",
        autoFocus: true,
        required: true,
        InputLabelProps: { shrink: true },
        InputProps:
        {
            startAdornment: (
                <InputAdornment position="start">
                    <FileCopy fontSize="small" />
                </InputAdornment>
            )
        }
    },
 [QUESTION_LEVEL_FIELD_ID]: {
        id: QUESTION_LEVEL_FIELD_ID,
        select:true,
        required: true,
        label: "content.QUESTION_LEVEL_TEXT",
        variant: "outlined",
        multiple: false,
        InputLabelProps: { shrink: true },
        InputProps:
        {
            startAdornment: (
                <InputAdornment position="start">
                    <Assessment
                     fontSize="small" />
                </InputAdornment>
            )
        }
    }, [QUESTION_COURSE_FIELD_ID]: {
        id: QUESTION_COURSE_FIELD_ID,
        select:true,
        required: true,
        label: "content.QUESTION_COURSE_TEXT",
        variant: "outlined",
        InputLabelProps: { shrink: true },
        InputProps:
        {
            startAdornment: (
                <InputAdornment position="start">
                    <Layers
                     fontSize="small" />
                </InputAdornment>
            )
        }
    },  [QUESTION_TYPE_FIELD_ID]: {
        id: QUESTION_TYPE_FIELD_ID,
        select:true,
        required: true,
        label: "content.QUESTION_QUESTION_TYPE_TEXT",
        variant: "outlined",
        InputLabelProps: { shrink: true },
        InputProps:
        {
            startAdornment: (
                <InputAdornment position="start">
                    <Layers fontSize="small" />
                </InputAdornment>
            )
        }
    },
    [QUESTION_OPTIONS_FIELD_ID]: {
        id: QUESTION_OPTIONS_FIELD_ID,
        type: "text",
        label: "content.QUESTION_OPTIONS_TEXT",
        variant: "outlined",
        required: true,
        multiple:true,
        InputLabelProps: { shrink: true },
        InputProps:
        {
            startAdornment: (
                <InputAdornment position="start">
                    <Notes fontSize="small" />
                </InputAdornment>
            )
        }
    }, [QUESTION_CORRECT_OPTIONS_FIELD_ID]: {
        id: QUESTION_CORRECT_OPTIONS_FIELD_ID,
        type: "text",
        label: "content.QUESTION_CORRECT_OPTIONS_TEXT",
        variant: "outlined",
        multiple: true,
        required: true,
        InputLabelProps: { shrink: true },
        InputProps:
        {
            startAdornment: (
                <InputAdornment position="start">
                    <Assessment fontSize="small" />
                </InputAdornment>
            )
        }
    }
}