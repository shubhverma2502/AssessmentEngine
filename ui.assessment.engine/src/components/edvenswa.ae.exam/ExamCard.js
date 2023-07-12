import { Delete, Edit, MailOutline, PlayCircleSharp, QuestionMark } from "@mui/icons-material";
import { Badge, Button, Card, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Stack, Switch, Tooltip, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DefaultExamImage from '../../assets/ae_exam.png';
import { EXAM_ISFINISHED } from "../edvenswa.ae.home/constants/constants";
import InvitationsDialogBox from "./InvitationsDialogBox";
import { doModifyExamStatus } from "./actions/actions";
import { Link } from "react-router-dom";

ExamCard.propTypes = {
  exam: PropTypes.object.isRequired
};

export default function ExamCard(props) {

  const { exam, onLoading, onError, onSuccess } = props;
  const [formData, setFormData] = useState(exam);
  const navigate = useNavigate();
  const [isActive, SetIsActive] = useState(exam?.active);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [newExam, setNewExam] = useState(null);

  const handleClick = (event) => {
    event.preventDefault();
    if (props.hasAdminAccess || isExamFinished(props?.examSession?.examStatus)) {
      return;
    }
    navigate('/user/exams/instructions', {
      state: { exam: exam }
    });
  };

  const handleExamStatus = (status, id) => {
    doModifyExamStatus({
      id: id,
      active: status
    })
  };

  const isExamFinished = (data) => {
    if(data && Object.keys(data).length === 0) {
      return false;
    }
    var status = data && data[exam?.id];
    if (status === EXAM_ISFINISHED) {
      return true;
    }
    return false;
  }

  const handleDeleteExam = (examId) => {
    //write logic to delete the exam
  };

  const handleEditExam = (exam) => {
    navigate('/console/exams/create', {
      state: { exam: exam }
    });
  };

  const handleLink = () => {
    if (!exam.examAttempted) {
      console.log(exam.examAttempted);
      handleEditExam(exam)
    }
    else {
      setEditDialogOpen(true)
      setOpen(true);
      const { id, ...newexam } = exam;
      setNewExam(newexam)
    }
  }

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Tooltip title={isExamFinished(props?.examSession?.examStatus) ? "Exam is Finished" : ""} placement="top" >
      <Card sx={{ borderLeft: "3px solid rgb(220 192 192)", opacity: isExamFinished(props?.examSession?.examStatus) ? 0.7 : 1 }}>
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={9}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography gutterBottom variant="h6" component="h4">{exam?.title}</Typography>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: "start" }}>
                  <Typography variant="body2" color="textSecondary" component="p">FOR {exam?.level}</Typography>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: "start" }}>
                  <Typography variant="body2" color="textSecondary" component="p">{exam?.examType} EXAM</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={3} sx={{ alignSelf: "center" }}>
              <CardMedia
                component={'img'}
                alt={exam?.title}
                image={exam?.examImage ? exam.examImage : DefaultExamImage}
                sx={{ objectFit: "contain", height: "100px" }}
              />
            </Grid>
            <Grid item xs={12} sx={{ justifyContent: "flex-end", display: "flex" }}>
              {
                props?.hasAdminAccess
                  ?
                  <Stack direction={"row"} spacing={1} sx={{ cursor: "pointer" }}>
                    <MailOutline fontSize="small" sx={{ color: "#1d756c" }} onClick={() => setIsDialogOpen(true)} />
                    <Switch
                      size="small"
                      onChange={(event) => {
                        SetIsActive(event.target.checked);
                        handleExamStatus(event.target.checked, exam?.id);
                      }}
                      checked={isActive}
                    />
                    <Edit fontSize="small" sx={{ color: "#1d756c" }} onClick={handleLink}></Edit>
                    <Delete onClick={() => handleDeleteExam(exam?.id)} fontSize="small" sx={{ color: "#911919" }} />
                  </Stack>
                  : <Stack direction={"row"} spacing={2} sx={{ cursor: "pointer" }}>
                    <Badge badgeContent={exam?.questions.length} color="success">
                      <QuestionMark fontSize="small" sx={{ color: "#79380c" }} />
                    </Badge>
                    <PlayCircleSharp fontSize="small" sx={{ color: "#38739e" }} onClick={handleClick} />
                  </Stack>
              }
            </Grid>
            {
              isDialogOpen ?
                <Grid item xs={12}>
                  <InvitationsDialogBox
                    open={isDialogOpen}
                    formData={formData}
                    setFormData={setFormData}
                    onLoading={onLoading}
                    onError={onError}
                    onSuccess={onSuccess}
                    onClose={() => setIsDialogOpen(false)}
                  />
                </Grid> :
                <React.Fragment />
            }
          </Grid>
          {editDialogOpen ? <Dialog
            open={open}
            onClose={handleClose}
          >
            <DialogTitle style={{ cursor: 'move' }}>
              Alert
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Exam has been started by one of the user. Do you wish to Clone exam?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Stack direction="row" spacing={2}>
                <Button autoFocus onClick={handleClose}>
                  Cancel
                </Button>
                <Button component={Link} to="/console/exams/create" state={{ exam: newExam }} color="primary">
                  Clone
                </Button>
              </Stack>

            </DialogActions>
          </Dialog> : <></>}
        </CardContent>

      </Card>
    </Tooltip>
  );
}