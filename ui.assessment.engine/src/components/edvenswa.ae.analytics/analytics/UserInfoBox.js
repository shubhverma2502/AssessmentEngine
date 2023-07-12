import {
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    TextField,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import SortFilter from "../../edvenswa.ae.common/filter/SortFilter";

function UserInfoBox(props) {
    const { a, open, onClose } = props;
    const [searchText, setSearchText] = useState("");

    const dialogTitleStyle = {
        cursor: "move",
        borderBottom: "1px solid black",
        marginBottom: "10px",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "black",
        color: "#FFFFFF",
    };

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const filteredUsers = a.users.filter((users) => {
        if (typeof users === 'object') {
            const userValues = Object.values(users);
            const stringValue = userValues.join(' ');
            return stringValue.toLowerCase().includes(searchText.toLowerCase()) || Object.keys(users).join(' ').toLowerCase().includes(searchText.toLowerCase());
        } else {
            return users.toLowerCase().includes(searchText.toLowerCase());
        }
    });

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle style={dialogTitleStyle} id="draggable-dialog-title">
                {a.name}
            </DialogTitle>

            <DialogContent>
                <TextField
                    label="Search"
                    variant="outlined"
                    size="small"
                    value={searchText}
                    onChange={handleSearchChange}
                    style={{ marginBottom: "10px" }}
                />
                
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user, key) => {
                        const userKey = Object.keys(user)[0];
                        const userValue = user[userKey];

                        const isPassedUser = a.name === "Passed Users";
                        const isFailedUser = a.name === "Failed Users";
                        const textColor = isPassedUser ? "green" : isFailedUser ? "red" : "inherit";

                        return (
                            <List
                                component="div"
                                key={key}
                                sx={{
                                    backgroundColor: "aliceblue",
                                    zIndex: 999,
                                    maxHeight: "200px",
                                    overflow: "auto",
                                    marginBottom: "10px",
                                }}
                                disablePadding
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <Avatar color="primary" />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            isPassedUser || isFailedUser ? (
                                                <React.Fragment>
                                                    <Typography variant="body1" component="span" display="block">
                                                        {userKey}
                                                    </Typography>
                                                    <Typography variant="body1" component="span" display="block">
                                                        <Typography variant="body1" component="span" fontWeight="bold">
                                                            Status:{" "}
                                                            <span style={{ color: textColor }}>
                                                                {isPassedUser ? "PASSED" : "FAILED"}
                                                            </span>{" "}
                                                            Percentage: {userValue}%
                                                        </Typography>
                                                    </Typography>
                                                </React.Fragment>

                                            ) : (
                                                user
                                            )
                                        }
                                    />
                                </ListItemButton>
                            </List>
                        );
                    })
                ) : (
                    <Typography>No users found.</Typography>
                )}
            </DialogContent>

            <DialogActions>
                <Button autoFocus onClick={onClose}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default UserInfoBox;
