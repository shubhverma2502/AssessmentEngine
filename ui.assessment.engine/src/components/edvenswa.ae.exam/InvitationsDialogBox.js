import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';
import { doCreateExam } from './actions/actions';
import UserInvitation from './create/UserInvitation';

export default function InvitationsDialogBox(props) {
    const { open, formData, setFormData, onLoading, onError, onSuccess } = props;
    const handleApply = () => {
        if (formData?.invitations && formData?.invitations.length > 0) {
            doCreateExam(formData, handleSuccess, handleFailure, handleLoading);
        } else {
            // if no invitations selected, display error message
            let error = {
                response: {
                    data: "No invitations selected"
                }
            };
            handleFailure(error)
        }
    }

    const handleSuccess = () => {
        props.onClose();
        onSuccess("Invitation sent successfully");
    }

    const handleLoading = (state) => {
        onLoading(state);
    }

    const handleFailure = (data) => {
        onError(data);
    }

    return (
        <Dialog open={open} onClose={props.onClose} maxWidth="sm">
            <DialogTitle sx={{ textAlign: "center", backgroundColor: "#1f2125", color: '#fff' }} >Invite Users</DialogTitle>
            <DialogContent>
                <UserInvitation
                    formData={formData}
                    setFormData={setFormData}
                    onLoading={onLoading}
                    onError={onError}
                />
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
    );
};
