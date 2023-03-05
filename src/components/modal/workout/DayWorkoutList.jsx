import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";

import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

// Components
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
