import { TENANT_NAME_FIELD_ID, TENANT_IMAGE_URL_FIELD_ID, GROUP_NAME_FIELD_ID, GROUP_IMAGE_URL_FIELD_ID, USER_EMAIL_FIELD_ID, USER_LASTNAME_FIELD_ID, USER_FIRSTNAME_FIELD_ID, USER_TENANT_FIELD_ID, USER_GROUP_FIELD_ID } from "../constants/Constants";

export const consoleFileds = {
    [TENANT_NAME_FIELD_ID]: {
        id: TENANT_NAME_FIELD_ID,
        name: TENANT_NAME_FIELD_ID,
        type: "text",
        label: "Tenant Name",
        placeholder: "Enter tenant name",
        variant: "outlined",
        autoFocus: true,
        required: true,
        InputLabelProps: { shrink: true }
    },
    [TENANT_IMAGE_URL_FIELD_ID]: {
        id: TENANT_IMAGE_URL_FIELD_ID,
        name: TENANT_IMAGE_URL_FIELD_ID,
        type: "text",
        label: 'Tenant Image',
        placeholder: "Enter image location",
        variant: "outlined",
        InputLabelProps: { shrink: true }
    },
    [GROUP_NAME_FIELD_ID]: {
        id: GROUP_NAME_FIELD_ID,
        name: GROUP_NAME_FIELD_ID,
        type: "text",
        label: "Group Name",
        placeholder: "Enter group name",
        variant: "outlined",
        autoFocus: true,
        required: true,
        InputLabelProps: { shrink: true }
    },
    [GROUP_IMAGE_URL_FIELD_ID]: {
        id: GROUP_IMAGE_URL_FIELD_ID,
        name: GROUP_IMAGE_URL_FIELD_ID,
        type: "text",
        label: 'Group Image',
        placeholder: "Enter image location",
        variant: "outlined",
        InputLabelProps: { shrink: true }
    },
    [USER_EMAIL_FIELD_ID]: {
        id: USER_EMAIL_FIELD_ID,
        name: USER_EMAIL_FIELD_ID,
        required:true,
        type: "text",
        label: 'Email',
        placeholder: "Enter Email",
        variant: "outlined",
        InputLabelProps: { shrink: true }
    },
    [USER_FIRSTNAME_FIELD_ID]: {
        id: USER_FIRSTNAME_FIELD_ID,
        name: USER_FIRSTNAME_FIELD_ID,
        required:true,
        type: "text",
        label: 'FirstName',
        placeholder: "FirstName",
        variant: "outlined",
        InputLabelProps: { shrink: true }
    },
    [USER_LASTNAME_FIELD_ID]: {
        id: USER_LASTNAME_FIELD_ID,
        name: USER_LASTNAME_FIELD_ID,
        required:true,
        type: "text",
        label: 'LastName',
        placeholder: "LastName",
        variant: "outlined",
        InputLabelProps: { shrink: true }
    },
    [USER_TENANT_FIELD_ID]: {
        id: USER_TENANT_FIELD_ID,
        name: USER_TENANT_FIELD_ID,
        select: true,
        required:true,
        multiple: false,
        label: 'Tenant',
        placeholder: "Select Tenant",
        variant: "outlined",
        InputLabelProps: { shrink: true }
    },
    [USER_GROUP_FIELD_ID]: {
        id: USER_GROUP_FIELD_ID,
        name: USER_GROUP_FIELD_ID,
        select: true,
        required:true,
        multiple: false,
        type: "text",
        label: 'Group',
        placeholder: "Select Group",
        variant: "outlined",
        InputLabelProps: { shrink: true }
    },
}    