import { Card, CardContent, Chip, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchFilter from "../../edvenswa.ae.common/search/SearchFilter";
import { doGetUsersByGroupId } from "../actions/action";
import UserCard from "./UserCard";

export default function TenantUsers(props) {
  const location = useLocation();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [group, setGroup] = useState({});
  const [loading, setLoading] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleLoading = (state) => {
    setLoading(state);
    props.onLoading(state);
  };

  const handleSuccess = (data) => {
    setUsers(data);
    setFilteredUsers(data);
  };

  const handleFailure = (error) => {
    props.onError(error);
  };

  useEffect(() => {
    if (location && location.state) {
      const t = location.state.group;
      setGroup(t);
    }
    if (group && group?.id) {
      doGetUsersByGroupId(
        group?.id,
        handleSuccess,
        handleFailure,
        handleLoading
      );
    }
    // eslint-disable-next-line
  }, [group]);
  return (
    <Container
      component={"main"}
      maxWidth={"lg"}
    >
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Chip
                label="Create User"
                size="small"
                onClick={(event) => {
                  event.preventDefault();
                  navigate("/console/tenant/group/user/create");
                }}
              />
            </Grid>
            <Grid item xs={6} sx={{ textAlign: "end" }}>
              <SearchFilter
                elements={users}
                searchKey="username"
                filteredElements={filteredUsers}
                setFilteredElements={setFilteredUsers}
              />
            </Grid>
            {filteredUsers && filteredUsers.length > 0 ? (
              filteredUsers.map((user, idx) => {
                return (
                  <Grid item key={idx} xs={12} sm={12} md={12} lg={12}>
                    <UserCard user={user} />
                  </Grid>
                );
              })
            ) : (
              <Grid item xs={12} sx={{ textAlign: "center" }}>
                {
                  !loading && filteredUsers.length > 0
                    ? <Typography variant="subtitle1" mt={2} gutterBottom>
                      No users found. Please check either the search criteria or user does not exists.
                    </Typography>
                    : <></>
                }
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
