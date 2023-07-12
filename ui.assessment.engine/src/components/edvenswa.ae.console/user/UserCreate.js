import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import { Box } from "@mui/material";
import { doCreateUser, doGetGroupsByTenantId } from "../actions/action";
import {
  USER_EMAIL_FIELD_ID,
  USER_FIRSTNAME_FIELD_ID,
  USER_GROUP_FIELD_ID,
  USER_LASTNAME_FIELD_ID,
  USER_TENANT_FIELD_ID,
} from "../constants/Constants";
import { getConsoleFields } from "../forms/GetFields";
import {
  isValidEmail,
  isValidString,
} from "../../edvenswa.ae.common/validation/Validation";
import { useState } from "react";
import { useEffect } from "react";
import { doGetTenants } from "../actions/action";
import { useNavigate } from "react-router-dom";

export default function UserCreate(props) {

  const fields = getConsoleFields([
    USER_EMAIL_FIELD_ID,
    USER_FIRSTNAME_FIELD_ID,
    USER_LASTNAME_FIELD_ID,
    USER_TENANT_FIELD_ID,
    USER_GROUP_FIELD_ID,
  ]);

  const [tenants, setTenants] = useState([]);
  const navigate = useNavigate();
  // If you are not using the below state variable, remove it.
  // eslint-disable-next-line
  const [selectedTenants, setSelectedTenants] = useState();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [groups, setGroups] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    doGetTenants(handleSuccess, handleFailure, handleLoading);
    // eslint-disable-next-line
  }, []);

  const handleOnChange = (value, field_name) => {
    switch (field_name) {
      case USER_FIRSTNAME_FIELD_ID: {
        if (!isValidString(value)) {
          setErrors({
            [field_name]: { message: "Title should be atleast 4 characters" },
          });
        } else {
          setErrors(delete [field_name]);
          setFirstName(value);
        }
        break;
      }
      case USER_LASTNAME_FIELD_ID: {
        if (!isValidString(value)) {
          setErrors({
            [field_name]: { message: "Title should be atleast 4 characters" },
          });
        } else {
          setErrors(delete [field_name]);
          setLastName(value);
        }
        break;
      }
      case USER_GROUP_FIELD_ID: {
        setSelectedGroups(value);
        break;
      }
      case USER_TENANT_FIELD_ID: {
        setSelectedTenants(value);
        doGetGroupsByTenantId(
          value.id,
          handleSuccess,
          handleFailure,
          handleLoading
        );
        break;
      }
      case USER_EMAIL_FIELD_ID: {
        if (!isValidEmail(value)) {
          setErrors({
            [field_name]: { message: "Enter valid email" },
          });
        } else {
          setErrors(delete [field_name]);
          setEmail(value);
        }
        break;
      }
      default: {
        console.error("Invalid field name: ", field_name);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (Object.keys(errors).length === 0) {
      const data = {
        [USER_FIRSTNAME_FIELD_ID]: firstname,
        [USER_LASTNAME_FIELD_ID]: lastname,
        username: email,
        [USER_GROUP_FIELD_ID]: selectedGroups,
      };
      doCreateUser(data, handleSuccess, handleLoading);
    }
  };

  const handleLoading = (state) => {
    props.onLoading(state);
  };
  const handleFailure = (data) => {
    props.onError(data);
  };

  const handleSuccess = (data, type) => {
    switch (type) {
      case "GET_TENANTS":
        setTenants(data);
        break;
      case "GET_GROUPS":
        setGroups(data);
        break;
      default: {
        props.onSuccess(data);
        navigate("/console/users");
      }
    }
  };

  return (
    <Container maxWidth={"sm"} component={"main"} sx={{ marginTop: "2rem" }}>
      <Card>
        <CardHeader title={"User Registration"} sx={{ textAlign: "center" }} />
        <CardContent>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {fields && fields.length > 0 ? (
                fields.map((field, idx) => {
                  return (
                    <Grid item xs={12} key={idx}>
                      <TextField
                        {...field}
                        fullWidth
                        onChange={(event) =>
                          handleOnChange(event.target.value, field.name)
                        }
                        error={errors[field.name] ? true : false}
                        helperText={errors?.[field.name]?.message}
                      >
                        {field.select && field.id === USER_TENANT_FIELD_ID ? (
                          tenants.map((tenant, idx1) => {
                            return (
                              <MenuItem value={tenant} key={idx1}>
                                {tenant?.tenantName}
                              </MenuItem>
                            );
                          })
                        ) : field.id === USER_GROUP_FIELD_ID ? (
                          groups.map((group, idx2) => {
                            return (
                              <MenuItem value={group} key={idx2}>
                                {group?.groupName}
                              </MenuItem>
                            );
                          })
                        ) : (
                          <></>
                        )}
                      </TextField>
                    </Grid>
                  );
                })
              ) : (
                <></>
              )}
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  type="submit"
                  size="small"
                  disabled={props.loading}
                >
                  Create User
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
