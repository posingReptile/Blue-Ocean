import React, { useState } from "react";
import axios from "axios";

import Grid from "@mui/material/Grid";
import List from "@mui/material/List";

// React Components
import DayWorkoutListItem from "./DayWorkoutListItem";
import "../../../css/workout.css";

// Show Modal here
function DayWorkoutList({ exercises, showButtons }) {
  // Handler for saving edits
  const handleEditInfo = () => {
    // Make an axios call here to edit the specified exercise by id? (Change weight etc...)
    console.log(
      "Specific exercise in DayWorkoutList editted via axios call to db"
    );
  };

  const handleDelete = () => {
    // Make an axios call here to delete the specified exercise by id
    console.log(
      "Deleting specific exercise from the DayWorkoutList via axios call"
    );
  };

  // Dynamically render DayWorkoutListItem according to exercises
  const listItems = [];

  return (
    <>
      <Grid item xs={12} md={12}>
        <List sx={{ ml: 4, mr: 4, height: 300, overflow: "auto" }}>
          <DayWorkoutListItem
            type="cardio"
            exerciseName={"Running Exercise 1"}
            showButtons={showButtons}
            handleEditInfo={handleEditInfo}
            handleDelete={handleDelete}
          />
          <DayWorkoutListItem
            type="strength"
            exerciseName={"Bicep Curls"}
            showButtons={showButtons}
            handleEditInfo={handleEditInfo}
            handleDelete={handleDelete}
          />
          <DayWorkoutListItem
            type="strength"
            exerciseName={"Chest Press"}
            showButtons={showButtons}
            handleEditInfo={handleEditInfo}
            handleDelete={handleDelete}
          />
          <DayWorkoutListItem
            type="strength"
            exerciseName={"Chest Press"}
            showButtons={showButtons}
            handleEditInfo={handleEditInfo}
            handleDelete={handleDelete}
          />
          <DayWorkoutListItem
            type="strength"
            exerciseName={"Chest Press"}
            showButtons={showButtons}
            handleEditInfo={handleEditInfo}
            handleDelete={handleDelete}
          />
        </List>
      </Grid>
    </>
  );
}

export default DayWorkoutList;
