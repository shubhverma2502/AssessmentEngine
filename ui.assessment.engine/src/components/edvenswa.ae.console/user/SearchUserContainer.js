import { Card, CardContent, Chip, Container, Grid } from "@mui/material";
import { useState } from "react";
import SearchPicker from "../../edvenswa.ae.common/search/SearchPicker";
import UserCard from "./UserCard";
import { useNavigate } from "react-router-dom";

export default function SearchUserContainer(props) {

    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const handleSelect = (user) => {
        if (user) {
            setUser(user);
        }
    };

    const handleClear = () => {
        setUser({});
    };

    return (
        <Container maxWidth={"lg"} component="main">
            <Card>
                <CardContent sx={{ mt: "0.5rem" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <SearchPicker onSelect={handleSelect} onClear={handleClear} />
                        </Grid>
                        <Grid item xs={6} sx={{ textAlign: "end" }}>
                            <Chip label="Create User"
                                size="small"
                                onClick={(event) => {
                                    event.preventDefault();
                                    navigate("/console/tenant/group/user/create");
                                }} />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            {
                                user && user.id
                                    ? <UserCard user={user} />
                                    : <></>
                            }
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    )
}