/*
This component is a form that allows a user to select an invitation mode (either "Users", "Groups", or "Tenants") 
and then displays a badge indicating the number of invitations selected for that mode. Clicking on the badge opens
a dialog box where the user can select or search for invitations based on the selected mode.
*/
import { GroupsOutlined, HubOutlined, MailOutlined } from "@mui/icons-material";
import { Badge, Box, Card, CardContent, CardHeader, Container, FormControl, FormControlLabel, Grid, Radio, RadioGroup, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { EXAM_INVITATION_FIELD_ID, EXAM_INVITATION_MODES, EXAM_INVITATION_MODE_GROUP, EXAM_INVITATION_MODE_USERS } from "../constants/constants";
import { getExamFields } from "../forms/GetFields";
import InvitationDialogBox from "./InvitationDialogBox";

export default function UserInvitation(props) {
    const { formData, setFormData } = props;
    const { t } = useTranslation();
    const fields = [EXAM_INVITATION_FIELD_ID];
    const formFields = getExamFields(fields);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    // A function to handle changes in the radio buttons
    const handleOnChange = (value) => {
        setFormData({
            ...formData,
            invitationMode: value,
            invitations: null,
            groups: null,
            tenants: null
        });
        setIsDialogOpen(true);
    };

    return (
        <Container maxWidth={"md"} component={"main"} sx={{ marginTop: "2rem" }}>
            <Card>
                <CardHeader
                    title={
                        <Stack direction={"row-reverse"} spacing={2}>
                            {formData?.invitationMode && (
                                <Badge badgeContent={formData?.invitationMode === EXAM_INVITATION_MODE_USERS ? formData.invitations?.length || 0 : formData?.invitationMode === EXAM_INVITATION_MODE_GROUP ? formData.groups?.length || 0 : formData.tenants?.length || 0} color="secondary" showZero>
                                    {formData.invitationMode === EXAM_INVITATION_MODE_USERS ? (
                                        <MailOutlined color="action" onClick={() => setIsDialogOpen(true)} />
                                    ) : formData.invitationMode === EXAM_INVITATION_MODE_GROUP ? (
                                        <GroupsOutlined color="action" onClick={() => setIsDialogOpen(true)} />
                                    )
                                        : <HubOutlined color="action" onClick={() => setIsDialogOpen(true)} />
                                    }
                                </Badge>
                            )}
                        </Stack>
                    }
                    sx={{ textAlign: "end", marginRight: "1rem", cursor: "pointer" }}
                />
                <CardContent>
                    <Box component="form">
                        <Grid container spacing={2}>
                            {formFields.map((field, key) => (
                                <Grid item xs={12} key={key}>
                                    <FormControl>
                                        <Typography variant="body1">{t(field.label)}:</Typography>
                                        <RadioGroup name={field.name} row>
                                            {EXAM_INVITATION_MODES.map((option, key) => (
                                                <FormControlLabel
                                                    key={key}
                                                    value={option}
                                                    control={<Radio />}
                                                    label={option}
                                                    checked={option === formData.invitationMode}
                                                    onChange={() => handleOnChange(option)}
                                                />
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            ))}
                        </Grid>
                        {isDialogOpen && (
                            <InvitationDialogBox
                                type={formData.invitationMode}
                                formData={formData}
                                setFormData={setFormData}
                                onError={props?.onError}
                                onLoading={props?.onLoading}
                                invitations={formData.invitations || []}
                                open={isDialogOpen}
                                onClose={() => setIsDialogOpen(false)}
                            />
                        )}
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
};
