import React, { useState } from "react";
import axios from "axios";
import { Box, Modal, Button, Grid, List } from "@mui/material";

// import Box from "@mui/material/Box";
// import Modal from "@mui/material/Modal";
// import Button from "@mui/material/Button";
// import Grid from "@mui/material/Grid";
// import List from "@mui/material/List";

// React Components
import ExerciseItem from "./ExerciseItem";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function ChooseExerciseModal({
  muscleName,
  open,
  handleClose,
  handleOpen,
  exerciseList,
  currDateInt,
  userID,
  setExercises,
}) {
  // Pass down function to post a new exercise to the table
  const handleAddExercise = (newExerciseObj) => {
    // Make an axios post request here
    console.log("Exercise added to database");
    axios
      .post("http://localhost:3000/new-exercise", newExerciseObj)
      .then(() => {
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
      })
      .catch(() => {
        console.log("Error adding exercise to users workouts");
      });
  };

  console.log(exerciseList);
  const exerciseItems = exerciseList.map((exercise) => {
    return (
      <ExerciseItem
        key={exercise.exercise_detail_id}
        exercise={exercise}
        handleAddExercise={handleAddExercise}
        userID={userID}
        currDateInt={currDateInt}
      />
    );
  });

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, minWidth: 300, width: "60%", height: 600 }}>
          <h1 align="center">{`Choose ${muscleName} Exercise`}</h1>
          <Grid container>
            <Grid item xs={12}>
              <List sx={{ height: 450, overflow: "auto" }}>
                {exerciseItems}
              </List>
            </Grid>
          </Grid>
          <Button
            onClick={handleClose}
            variant="contained"
            sx={{ ml: 2, mt: 2 }}
          >
            Exit
          </Button>
        </Box>
      </Modal>
    </>
  );
}
export default ChooseExerciseModal;
