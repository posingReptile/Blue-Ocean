import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Fab,
  Grid,
  Typography,
  TextField,
  Modal,
  Divider,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DayWorkoutList from "../modal/workout/DayWorkoutList";
import CalendarWorkoutList from "./CalendarWorkoutList";
import ChooseMuscleModal from "../modal/workout/ChooseMuscleModal";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 2,
  width: "60%",
  minWidth: 400,
};

function CalendarWorkout({ currDateInt, userID }) {
  const [exercises, setExercises] = useState([]); // Today's exercises
  const [currNotes, setCurrNotes] = useState(""); // Today's notes
  const [showButtons, setShowButtons] = useState(false); // Shows edit and clear button
  const [open, setOpen] = useState(false); // Opens add ChooseMuscleModal
  const handleOpen = () => setOpen(true); // Handles when Add (+) is clicked
  const handleClose = () => setOpen(false); // Handles modal outside click (closes)

  const totalWorkoutDuration = exercises.reduce((acc, exercise) => {
    return (acc += exercise.duration);
  }, 0);

  const totalCalsBurned = exercises.reduce((acc, exercise) => {
    return (acc += exercise.calories_burned);
  }, 0);

  // Grab today's workout (A list of exercises)
  useEffect(() => {
    axios
      .get("http://localhost:3000/daily-workout", {
        params: {
          date: currDateInt,
          userId: userID,
        },
      })
      .then(({ data }) => {
        setExercises(data);
      });
  }, [currDateInt]);

  // Grab the current day's workout notes
  useEffect(() => {
    axios
      .get("http://localhost:3000/notes", {
        params: {
          date: currDateInt,
          userId: userID,
        },
      })
      .then(({ data }) => {
        if (!data[0].notes) {
          setCurrNotes("");
        } else {
          setCurrNotes(data[0].notes);
        }
      })
      .catch(() => {
        console.log("Error gathering notes for the day");
      });
  }, [currDateInt]);

  // Send a put request when clicking save notes
  const handleNoteSave = () => {
    axios
      .put("http://localhost:3000/edit-notes", {
        notes: currNotes,
        date: currDateInt,
        type: "workout",
      })
      .then(({ data }) => {
        setCurrNotes(data[0].notes);
      })
      .catch(() => {
        console.log("Error updating notes");
      });
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Grid item xs={12} sx={{ display: "flex" }}>
            <Grid item xs={8}>
              <Typography
                variant="h4"
                component="div"
                sx={{
                  display: "flex",
                }}
              >
                Today's Workout
              </Typography>
            </Grid>
            <Grid item xs={4} align="end" sx={{}}>
              <Fab
                color="primary"
                onClick={() => {
                  setShowButtons(!showButtons);
                }}
                sx={{ mr: 1.5 }}
                size="small"
              >
                <EditIcon />
              </Fab>
              <Fab color="primary" onClick={handleOpen} size="small" sx={{}}>
                <AddIcon />
              </Fab>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ fontSize: 16 }} variant="h6" component="div">
                <span style={{ fontWeight: 700 }}>Calories 🔥:</span> ~
                {totalCalsBurned} cals
              </Typography>
              <Typography sx={{ fontSize: 16 }} variant="h6" component="div">
                <span style={{ fontWeight: 700 }}>Workout 🕛:</span> ~
                {totalWorkoutDuration} min(s)
              </Typography>
            </div>
          </Grid>
        </Grid>

        <CalendarWorkoutList
          showButtons={showButtons}
          exercises={exercises}
          setExercises={setExercises}
          currDateInt={currDateInt}
          userID={userID}
        />
      </Grid>
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <ChooseMuscleModal
            handleClose={handleClose}
            currDateInt={currDateInt}
            userID={userID}
            setExercises={setExercises}
          />
        </Box>
      </Modal>
    </>
  );
}

export default CalendarWorkout;
