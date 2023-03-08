import React, { useState, useEffect } from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";

// Icons
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";

// React Components
import DayWorkoutList from "./DayWorkoutList";
import ChooseMuscleModal from "./ChooseMuscleModal";
import "../../../css/workout.css";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: "50%",
  // height: "50%",
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

// Component for Dashboard (Showing today's workout)
function Workout({ currDateInt, userID }) {
  const [exercises, setExercises] = useState([]); // Today's exercises
  const [currNotes, setCurrNotes] = useState(undefined); // Today's notes
  const [showButtons, setShowButtons] = useState(false); // Shows edit and clear button
  const [open, setOpen] = useState(false); // Opens add ChooseMuscleModal
  const handleOpen = () => setOpen(true); // Handles when Add (+) is clicked
  const handleClose = () => setOpen(false); // Handles modal outside click (closes)
  console.log(exercises);

  const totalWorkoutDuration = exercises.reduce((acc, exercise) => {
    return (acc += exercise.duration);
  }, 0);

  const totalCalsBurned = exercises.reduce((acc, exercise) => {
    return (acc += exercise.calories_burned);
  }, 0);
  // console.log(totalCalsBurned);
  // Should get a list of the current days exercises on initial render and anytime it updates
  useEffect(() => {
    // Make an axios call here to fetch the current day's workout
    // Finish the axios call with setting exercises using setExercises(data);
    //=== Need to give as a query object, date and userId ===//
    axios
      .get("http://localhost:3000/daily-workout", {
        params: {
          date: currDateInt,
          userId: userID,
        },
      })
      .then(({ data }) => {
        // console.log(data);
        setExercises(data);
      });
  }, [currDateInt]);

  // Should also grab notes from the database
  useEffect(() => {
    // Make an axios call here to fetch the current day's notes
    // Finish axios call with setCurrNotes(data);
    //=== Need to give as a body: userId, notes, date ===//
    // axios.post("http://localhost:3000/notes", {
    //   userId: userID,
    //   notes: currNotes,
    //   currDateInt: 1,
    // });
  }, [currDateInt]);

  const handleNoteSave = () => {
    // Send an axios request to the database to update the notes saved so it persists
    // Do not save in state
    console.log(
      "Sending an axios request to PUT to the database and edit the note",
      "The currNotes is:",
      currNotes
    );

    // axios.put("http://localhost:3000/edit-notes", {
    //   notes: currNotes,
    //   date: currDateInt
    // })
  };

  // Find a way to calculate today's workout duration
  // Find a way to calculate calories burned today via exercises combined

  return (
    <>
      <Box
        sx={{
          minHeight: 600,
          backgroundColor: "primary.light",
          borderRadius: 4,
          margin: 4,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography variant="h4" component="div" align="center">
              Today's Workout
            </Typography>
          </Grid>
          <Grid item xs={4} align="end" sx={{ pr: 4 }}>
            <Fab
              color="primary"
              onClick={() => {
                setShowButtons(!showButtons);
              }}
              sx={{ mr: 2 }}
            >
              <EditIcon />
            </Fab>
            <Fab color="primary" onClick={handleOpen}>
              <AddIcon />
            </Fab>
          </Grid>
          <DayWorkoutList
            showButtons={showButtons}
            exercises={exercises}
            setExercises={setExercises}
            currDateInt={currDateInt}
            userID={userID}
          />
          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <Typography sx={{ ml: 4 }} variant="h6" component="div">
              Estimated Calories Burned: {totalCalsBurned}
            </Typography>
            <Typography
              sx={{ mt: 2, mb: 3, ml: 4 }}
              variant="h6"
              component="div"
            >
              Estimated Workout Duration: {totalWorkoutDuration} min(s)
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              justifyContent: "center",
              paddingRight: 4,
              paddingBottom: 3,
            }}
          >
            <TextField
              id="outlined-basic"
              label="Notes"
              variant="outlined"
              value={currNotes}
              onChange={(e) => setCurrNotes(e.target.value)}
              multiline
              sx={{ width: 300 }}
              rows={8}
            />
            <Button
              variant="contained"
              sx={{ mt: 2, width: 150 }}
              onClick={handleNoteSave}
            >
              Save Notes
            </Button>
          </Grid>
        </Grid>
      </Box>
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

export default Workout;
