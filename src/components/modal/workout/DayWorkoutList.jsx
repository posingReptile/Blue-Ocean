import React, { useState } from "react";
import axios from "axios";

import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";

// React Components
import DayWorkoutListItem from "./DayWorkoutListItem";
import "../../../css/workout.css";

// Show Modal here
function DayWorkoutList({
  exercises,
  setExercises,
  showButtons,
  currDateInt,
  userID,
  handleOpen,
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
      <DayWorkoutListItem
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
      <Grid item xs={12} md={12}>
        <List sx={{ ml: 4, mr: 4, height: 300, overflow: "auto" }}>
          {!listItems.length ? (
            <ListItemButton onMouseDown={() => handleOpen()}>
              <Typography variant="h6" sx={{ fontSize: 18 }}>
                Let's get Shredded 💪 Click to add a workout!
              </Typography>
            </ListItemButton>
          ) : null}
          {listItems}
        </List>
      </Grid>
    </>
  );
}

export default DayWorkoutList;
