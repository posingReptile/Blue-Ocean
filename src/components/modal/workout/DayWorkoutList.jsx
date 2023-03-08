import React, { useState } from "react";
import axios from "axios";

import Grid from "@mui/material/Grid";
import List from "@mui/material/List";

// React Components
import DayWorkoutListItem from "./DayWorkoutListItem";
import "../../../css/workout.css";

// Show Modal here
function DayWorkoutList({ exercises, setExercises, showButtons }) {
  console.log(exercises);
  // Handler for saving edits
  const handleEditInfo = (editExerciseObj) => {
    // Make an axios call here to edit the specified exercise by id? (Change weight etc...)
    console.log(
      "Specific exercise in DayWorkoutList editted via axios call to db"
    );
    axios.put("http://localhost:3000/edit-workout", editExerciseObj);
  };

  const handleDelete = (exerciseId) => {
    // Make an axios call here to delete the specified exercise by id
    console.log(exerciseId);

    axios
      .delete("http://localhost:3000/delete", {
        params: {
          exerciseId: exerciseId,
        },
      })
      .then(() => {
        // Fetch the new workout list and set it into our exercises list in our workout dash
        axios
          .get("http://localhost:3000/daily-workout", {
            params: {
              date: 20230307,
              userId: 1,
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

  // Dynamically render DayWorkoutListItem according to exercises
  // console.log(exercises);
  const listItems = exercises.map((exercise) => {
    return (
      <DayWorkoutListItem
        key={exercise.exercise_id}
        type="cardio"
        exercise={exercise}
        exerciseName={"Running Exercise TEST"}
        showButtons={showButtons}
        handleEditInfo={handleEditInfo}
        handleDelete={handleDelete}
      />
    );
  });

  return (
    <>
      <Grid item xs={12} md={12}>
        <List sx={{ ml: 4, mr: 4, height: 300, overflow: "auto" }}>
          {listItems}
        </List>
      </Grid>
    </>
  );
}

export default DayWorkoutList;
