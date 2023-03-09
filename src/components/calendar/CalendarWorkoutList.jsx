import React, { useState } from "react";
import axios from "axios";

import Grid from "@mui/material/Grid";
import List from "@mui/material/List";

// React Components
// import DayWorkoutListItem from "../modal/workout/DayWorkoutList";
import CalendarWorkoutListItem from "./CalendarWorkoutListItem";
// import "../../../css/workout.css";

// Show Modal here
function CalendarWorkoutList({
  exercises,
  setExercises,
  showButtons,
  currDateInt,
  userID,
}) {
  // Handler for saving edits
  const handleEditInfo = (editExerciseObj) => {
    axios
      .put("http://localhost:3000/edit-workout", editExerciseObj)
      .then(() => {
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
      })
      .catch(() => {
        console.log("Error editting current workout");
      });
  };

  const handleDelete = (exerciseId) => {
    axios
      .delete("http://localhost:3000/delete", {
        params: {
          exerciseId: exerciseId,
        },
      })
      .then(() => {
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
      })
      .catch(() => {
        console.log("Error deleting the exercise from our daily workout");
      });
  };

  const listItems = exercises.map((exercise) => {
    return (
      <CalendarWorkoutListItem
        key={exercise.exercise_id}
        exercise={exercise}
        showButtons={showButtons}
        handleEditInfo={handleEditInfo}
        handleDelete={handleDelete}
      />
    );
  });

  return (
    <>
      <Grid xs={12} md={12} sx={{ ml: 1, pl: 1 }}>
        <List
          sx={{
            height: "20vh",
            overflow: "auto",
          }}
        >
          {listItems}
        </List>
      </Grid>
    </>
  );
}

export default CalendarWorkoutList;
