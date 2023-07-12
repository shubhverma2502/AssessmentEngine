/*
This is a React component that renders a dialog box used to invite users to an exam. 
The dialog box contains a form that allows the user to add users to the exam by selecting a tenant, 
a group or adding an email address. The selected options are displayed as chips and can be deleted. 
The component also fetches the necessary data from the API and sends the data back to the parent component via props.
*/
import { Delete } from "@mui/icons-material";
import { Button, Chip, Dialog, DialogActions, DialogContent, Grid, MenuItem, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { axiosInstance } from "../../../interceptors/AxiosInterceptor";
import { AUTH_USERNAME_FIELD_ID } from "../../edvenswa.ae.auth/constants/constants";
import { getFormFields } from "../../edvenswa.ae.auth/forms/getFields";
import { isValidEmail } from "../../edvenswa.ae.common/validation/Validation";
import { doGetTenants } from "../../edvenswa.ae.console/actions/action";
import { USER_GROUP_FIELD_ID, USER_TENANT_FIELD_ID } from "../../edvenswa.ae.console/constants/Constants";
import { getConsoleFields } from "../../edvenswa.ae.console/forms/GetFields";
import { doGetGroups } from "../actions/actions";
import { EXAM_INVITATION_MODE_GROUP, EXAM_INVITATION_MODE_TENANT, EXAM_INVITATION_MODE_USERS } from "../constants/constants";

export default function InvitationDialogBox(props) {
    const { type, formData, setFormData } = props;
    const fields = (type === EXAM_INVITATION_MODE_TENANT ? [USER_TENANT_FIELD_ID] : type === EXAM_INVITATION_MODE_USERS ? [AUTH_USERNAME_FIELD_ID] : [USER_GROUP_FIELD_ID]);
    const formFields = (type === EXAM_INVITATION_MODE_USERS ? getFormFields(fields) : getConsoleFields(fields));
    const { t } = useTranslation();
    const [error, setError] = useState(null);
    const [invitation, setInvitation] = useState(null);
    const [options, setOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    //  Effect hook to fetch tenants or groups data based on the invitation mode
    //  and to set selected options based on form data
    useEffect(() => {
        if (type === EXAM_INVITATION_MODE_TENANT && formData && formData?.tenants && formData?.tenants.length > 0) {
            setSelectedOptions(...selectedOptions, formData?.tenants);
        }
        if (type === EXAM_INVITATION_MODE_GROUP && formData && formData?.groups && formData?.groups.length > 0) {
            setSelectedOptions(...selectedOptions, formData?.groups)
        }
        if (type === EXAM_INVITATION_MODE_USERS && formData && formData?.invitations && formData?.invitations.length > 0) {
            setSelectedOptions(...selectedOptions, formData?.invitations)
        }
        if (options.length === 0) {
            if (type === EXAM_INVITATION_MODE_TENANT) {
                doGetTenants(handleSuccess, handleFailure, handleLoading);
            }
            else {
                doGetGroups(handleSuccess, handleFailure);

            }
        }
        // eslint-disable-next-line
    }, []);

    const handleSuccess = (data, type) => {
        switch (type) {
            case "GET_GROUPS":
            case "GET_TENANTS": {
                setOptions(data);
                break;
            }
            default: break;
        };
    }
    const handleLoading = (state) => {
        props.onLoading(state);
    };

    const handleFailure = (error) => {
        props.onError(error);
    };
    // Handler function to delete a selected option
    const handleDeleteOption = (optionId) => {
        let newSelectedOptions;
        if (formData?.invitationMode === EXAM_INVITATION_MODE_USERS) {
            newSelectedOptions = selectedOptions.filter((option) => option !== optionId);
            setFormData({ ...formData, invitations: newSelectedOptions });
        }
        else {
            newSelectedOptions = selectedOptions.filter((option) => option.id !== optionId);
            if (formData?.invitationMode === EXAM_INVITATION_MODE_TENANT) {
                setFormData({ ...formData, tenants: newSelectedOptions });
            }
            else {
                setFormData({ ...formData, groups: newSelectedOptions });
            }
        }
        setSelectedOptions(newSelectedOptions);
    };
    // Handling change event of select input
    const handleChange = (value) => {
        let isOptionExists;
        if (type === EXAM_INVITATION_MODE_TENANT) {
            isOptionExists = selectedOptions.find((option) => option.tenantName === value);
        } else {
            isOptionExists = selectedOptions.find((option) => option.groupName === value);
        }
        if (isOptionExists && isOptionExists.id) {
            return;
        }
        let newSelectedOptions;
        if (type === EXAM_INVITATION_MODE_TENANT) {
            newSelectedOptions = [...selectedOptions, options.find((option) => option.tenantName === value)];
        }
        else {
            newSelectedOptions = [...selectedOptions, options.find((option) => option.groupName === value)];
        }
        setSelectedOptions(newSelectedOptions);
        if (type === EXAM_INVITATION_MODE_TENANT) {
            setFormData({ ...formData, tenants: newSelectedOptions });
        } else {
            setFormData({ ...formData, groups: newSelectedOptions });
        }
    };
    // Handling change event of select input
    const handleEmailChange = (event) => {
        if (!isValidEmail(invitation)) {
            setError("Invalid email address");
            return;
        }
        setError(null);
        const isInvitationExists = selectedOptions.includes(invitation);
        if (!isInvitationExists) {
            const newSelectedOptions = [...selectedOptions, invitation];
            setSelectedOptions(newSelectedOptions);
            setFormData(({ ...formData, invitations: newSelectedOptions }));
        }
    };

    const handleApply = () => {
        if (type === EXAM_INVITATION_MODE_USERS) {
            setFormData({ ...formData, invitations: selectedOptions });
        }
        else {
            if (type === EXAM_INVITATION_MODE_TENANT) {
                var data = {
                    tenants: formData?.tenants
                }
            } else {
                var data = {
                    groups: formData?.groups
                }
            }
            axiosInstance.post("/exam/get/invitations", data).then((res) => {
                setFormData({ ...formData, invitations: res?.data });
            });
        }
        props.onClose();
    }

    return (
        <Dialog open={props.open} onClose={props.onClose} PaperProps={{ sx: { width: '40%', height: '45%' } }}>
            <DialogContent sx={{ marginTop: "1rem" }}>
                <Grid container spacing={1}>
                    {
                        formFields.map((field, key) => {
                            return (
                                <Grid item xs={12} key={key}>
                                    <TextField
                                        {...field}
                                        key={key}
                                        fullWidth
                                        label={t(field.label)}
                                        placeholder={t(field.placeholder)}
                                        helperText={error}
                                        error={error}
                                        onChange={(event) => type === EXAM_INVITATION_MODE_USERS ?
                                            setInvitation(event.target.value) :
                                            handleChange(event.target.value)}
                                    >
                                        {
                                            field.select && options
                                                ? options.map((option, idx1) => {
                                                    return (
                                                        type === EXAM_INVITATION_MODE_TENANT ?
                                                            <MenuItem value={option?.tenantName} key={idx1}>{option?.tenantName}</MenuItem>
                                                            :
                                                            <MenuItem value={option?.groupName} key={idx1}>{option?.groupName}</MenuItem>

                                                    )
                                                })
                                                : <React.Fragment></React.Fragment>
                                        }
                                    </TextField>

                                    {
                                        (formData && Object.keys(formData).length > 0)
                                            ? <Stack direction={"row"} spacing={1} mt={1}>
                                                {
                                                    formData && formData?.invitationMode && formData?.invitationMode === EXAM_INVITATION_MODE_USERS ?
                                                        formData?.invitations && formData?.invitations.map((invitation, idx) => (
                                                            <Chip
                                                                key={idx}
                                                                label={invitation}
                                                                size="small"
                                                                sx={{ backgroundColor: "#2c6b79 !important" }}
                                                                deleteIcon={<Delete sx={{ color: "#d19c9c !important" }}></Delete>}
                                                                onDelete={() => handleDeleteOption(invitation)}
                                                            />
                                                        )) :
                                                        formData && formData?.invitationMode && formData?.invitationMode === EXAM_INVITATION_MODE_TENANT ?
                                                            formData?.tenants && formData?.tenants.map((tenant, idx) => (
                                                                <Chip
                                                                    key={idx}
                                                                    label={tenant?.tenantName}
                                                                    size="small"
                                                                    sx={{ backgroundColor: "#2c6b79 !important" }}
                                                                    deleteIcon={<Delete sx={{ color: "#d19c9c !important" }}></Delete>}
                                                                    onDelete={() => handleDeleteOption(tenant.id)}
                                                                />
                                                            )) :
                                                            formData?.groups && formData?.groups.map((group, idx) => (
                                                                <Chip
                                                                    key={idx}
                                                                    label={group?.groupName}
                                                                    size="small"
                                                                    sx={{ backgroundColor: "#2c6b79 !important" }}
                                                                    deleteIcon={<Delete sx={{ color: "#d19c9c !important" }}></Delete>}
                                                                    onDelete={() => handleDeleteOption(group.id)}
                                                                />
                                                            ))
                                                }

                                            </Stack>
                                            : <></>
                                    }
                                </Grid>
                            )
                        })
                    }
                    {type === EXAM_INVITATION_MODE_USERS ?
                        <Grid item xs={12}>
                            <Button
                                size="small"
                                variant="contained"
                                onClick={handleEmailChange}
                            >
                                Add
                            </Button>
                        </Grid> : <React.Fragment />
                    }
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    size="small"
                    variant="contained"
                    onClick={handleApply}
                >
                    Apply
                </Button>
            </DialogActions>
        </Dialog>
    )
};