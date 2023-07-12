import { Card, CardContent, CardMedia, Chip, FormControlLabel, Grid, Switch, Typography } from "@mui/material";
import DefaultUserImage from '../../../assets/ae_user.png';
import PropTypes from "prop-types";
import { Group, Hub, ModeEdit } from "@mui/icons-material";
import { Stack } from "@mui/system";
import RolePopover from "../role/RolePopover";
import { useState } from "react";
import { doDeleteUser } from "../actions/action";

UserCard.propTypes = {
    user: PropTypes.object.isRequired
};

export default function UserCard(props) {

    const { user } = props;
    const [isActive, setIsActive] = useState(user?.active);
    const [rolePopoverEl, setRolePopoverEl] = useState(null);

    const handleUserStatus = (data, state) => {
        doDeleteUser(data, state);
    }

    return (
        <Card sx={{ border: "0.1px solid #428c98" }}>
            <CardContent>
                <Grid container spacing={1} sx={{ justifyContent: "space-evenly", display: "flex" }}>
                    <Grid item xs={1} sx={{ alignItems: "center", display: "grid" }}>
                        <CardMedia
                            component={'img'}
                            alt={user?.username}
                            image={user?.profileImage ? user.profileImage : DefaultUserImage}
                            sx={{ height: "70px", clipPath: "circle()", objectFit: "contain" }}
                        />
                    </Grid>
                    <Grid item xs={3} sx={{ alignItems: "center", display: "grid" }}>
                        <Stack direction={"column"} spacing={1}>
                            <Typography gutterBottom sx={{ fontWeight: "500", color: "#428c98" }}>{user?.username}</Typography>
                            <Typography gutterBottom sx={{ fontWeight: "400", color: "#428c98" }}>{user?.firstName} {user?.lastName}</Typography>
                        </Stack>
                    </Grid>
                    <Grid item xs={3} sx={{ alignItems: "center", display: "grid" }}>
                        <Stack direction={"row"} spacing={2}>
                            <Group sx={{ color: "#49759e" }}></Group>
                            <Typography gutterBottom variant="body1" component="h6">{user?.group?.groupName}</Typography>
                        </Stack>
                        <Stack direction={"row"} spacing={2}>
                            <Hub sx={{ color: "#b48b57" }}></Hub>
                            <Typography gutterBottom variant="body1" component="h6">{user?.group?.tenant?.tenantName}</Typography>
                        </Stack>
                    </Grid>
                    <Grid item sx={{ alignItems: "center", display: "grid" }} xs={3}>
                        <Stack direction={"row"} spacing={1}>
                            <Stack direction={"column"} spacing={1}>
                                {
                                    user?.roles.map((role, idx) => {
                                        return (
                                            <Chip label={role.name} size="small" key={idx} sx={{ background: "#518575 !important" }} />
                                        )
                                    })
                                }
                                {
                                    rolePopoverEl
                                        ? <RolePopover assignedRoles={user?.roles} el={rolePopoverEl} user={user}
                                            handleClose={() => {
                                                setRolePopoverEl(null);
                                            }} />
                                        : <></>
                                }
                            </Stack>
                            <ModeEdit fontSize="small" onClick={(event) => { setRolePopoverEl(event.target) }}
                                sx={{ alignSelf: "center" }}
                            />
                        </Stack>
                    </Grid>
                    <Grid item sx={{ display: "grid", alignItems: "center" }} xs={2}>
                        <FormControlLabel
                            label={isActive ? "Disable" : "Enable"}
                            control={<Switch
                                size="small"
                                onChange={(event) => {
                                    setIsActive(event.target.checked);
                                    handleUserStatus(user?.id, !isActive);
                                }}
                                checked={isActive}
                            />} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}