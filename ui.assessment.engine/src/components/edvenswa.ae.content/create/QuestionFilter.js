import {
  Alert,
  Card,
  CardContent,
  Chip,
  FormControlLabel,
  Grid,
  InputAdornment,
  LinearProgress,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doGetQuestionbyTag, doSearchQuestions } from "../actions/actions";
import { Close, Edit, SearchRounded } from "@mui/icons-material";

export default function QuestionFilter(props) {

  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [searchOption, setSearchOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [tagTerm, setTagTerm] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm && searchTerm.length > 3) {
      const searchData = {
        searchTerm: searchTerm,
      };

      doSearchQuestions(
        searchData,
        handleSuccess,
        handleFailure,
        handleLoading
      );
    }
    if (tagTerm && tagTerm.length > 3) {
      const tagData = {
        tags: [tagTerm],
      };

      doGetQuestionbyTag(
        tagData,
        handleSuccess,
        handleFailure,
        handleLoading
      );
    } // eslint-disable-next-line
  }, [searchTerm, tagTerm]);

  const handleClear = () => {
    setSearchTerm(" ");
    setTagTerm("");
    setFilteredData([]);
  };

  const handleSuccess = (data) => {
    setFilteredData(data);
  };

  const handleFailure = (err) => {
    props.onError(err);
  };

  const handleLoading = (state) => {
    setLoading(state);
  };

  const handleEditQuestion = (question) => {
    props?.setActiveStep(props?.activeStep + 2);
    props?.setFormData(question);
    navigate("/content/dashboard/managequestion/question", {
      state: { question: question },
    });
  };

  const handleChange = (event) => {
    const value = event.target.value;
    if (searchOption === "tagName") {
      setTagTerm(value);
    } else if (searchOption === "question") {
      setSearchTerm(value);
    }
  };

  const handleSelect = (event) => {
    const selectedValue = event.target.value;
    setSearchOption(selectedValue);
    setShowSearch(true);
    setFilteredData([]);
    setSearchTerm("");
    setTagTerm("");
  };

  return (
    <Card sx={{ border: "0.1px solid #428c98" }}>
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={12} sx={{ justifyContent: "center", display: "flex" }}>
            <RadioGroup value={searchOption} onChange={handleSelect} row>
              <FormControlLabel
                value="tagName"
                control={<Radio />}
                label="Search by Tags"
              />

              <FormControlLabel
                value="question"
                control={<Radio />}
                label="Search by Question"
              />
            </RadioGroup>
          </Grid>
          <Grid item xs={12}>
            {showSearch && (
              <TextField
                label={
                  searchOption === "tagName"
                    ? "Search by Tag"
                    : "Search by Question"
                }
                fullWidth
                onChange={handleChange}
                value={searchOption === "tagName" ? tagTerm : searchTerm}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchRounded
                        fontSize="medium"
                        sx={{ color: "#1C243C" }}
                      />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <Close
                        fontSize="small"
                        sx={{ color: "#1C243C" }}
                        onClick={(e) => {
                          handleClear();
                        }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            )}
            {filteredData && filteredData.length > 0 ? (
              <List
                component="div"
                disablePadding
                style={{
                  backgroundColor: "aliceblue",
                  zIndex: 999,
                  maxHeight: "200px",
                  overflow: "auto",
                }}
              >
                {filteredData.map((question, key) => (
                  <ListItemButton key={key}>
                    <ListItemText
                      primary={question?.question}
                    />
                    <ListItemIcon>
                      <Edit
                        sx={{ color: "#428c98" }}
                        onClick={() => handleEditQuestion(question)}
                      />
                    </ListItemIcon>
                  </ListItemButton>
                ))}
              </List>
            ) : loading ? <LinearProgress /> : <></>}
            {(searchTerm.length > 3 || tagTerm.length > 3) &&
              !loading && filteredData.length === 0 && (
                <Alert severity="warning">
                  No questions found with given keyword/tag {" "} {searchTerm ? searchTerm : tagTerm}
                </Alert>
              )}
          </Grid>
          <Grid item xs={12}>
            {(searchTerm.length > 3 || tagTerm.length > 3) &&
              !loading && filteredData.length === 0 && (
                <Chip
                  label="Create Question"
                  onClick={(event) => {
                    event.preventDefault();
                    props?.setActiveStep(props?.activeStep + 1);
                    navigate("/content/dashboard/managequestion/question");
                  }}
                />
              )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
