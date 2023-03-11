import React, { useState } from "react";
import axios from "axios";
import { Grid, List } from "@mui/material";
import CalendarWorkoutListItem from "./CalendarWorkoutListItem";

function CalendarWorkoutList({
  exercises,
  setExercises,
  showButtons,
  currDateInt,
  userID,
}) {
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
