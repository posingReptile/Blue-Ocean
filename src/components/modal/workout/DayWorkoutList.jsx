import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";

// React Components
import DayWorkoutListItem from "./DayWorkoutListItem";
import "../../../css/workout.css";

// Show Modal here
function DayWorkoutList({ exercises, showButtons }) {
  const [showEditModal, setShowEditModal] = useState(false); // Shows edit exercise modal
  return (
    <>
      <Grid item xs={12} md={12}>
        <List sx={{ ml: 4, mr: 4, height: 200, overflow: "auto" }}>
          <DayWorkoutListItem
            type="cardio"
            exerciseName={"Running Exercise 1"}
            showButtons={showButtons}
          />
          <DayWorkoutListItem
            type="strength"
            exerciseName={"Bicep Curls"}
            showButtons={showButtons}
          />
          {showEditModal && <></>}
        </List>
      </Grid>
    </>
  );
}

export default DayWorkoutList;
