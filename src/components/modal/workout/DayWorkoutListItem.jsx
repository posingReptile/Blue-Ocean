import React, { useState } from "react";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Divider from "@mui/material/Divider";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import "../../../css/workout.css";
import EditExerciseModal from "./EditExerciseModal";

function DayWorkoutListItem({
  // Current expected props
  showButtons,
  exerciseName = "Test Exercise Name",
  instructions = "Test Instructions",
  type = "cardio",
  intensity = "High",
  duration = 999,
  weight = 400,
  sets = 4,
  reps = 20,
}) {
  const [showMore, setShowMore] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null); // Anchor for edit button popover

  // Handles open state for popover
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  // Toggles popover
  const handleEditClick = (e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };
  // Handles when we click out of edit
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <ListItemButton
        onMouseDown={() => setShowMore(!showMore)}
        // onMouseEnter={() => setShowEdit(true)}
        // onMouseLeave={() => setShowEdit(false)}
      >
        <ListItemAvatar>
          <Avatar sx={{ backgroundColor: "orange" }}>
            <DirectionsRunIcon color="error" />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={exerciseName}
          secondary={
            <>
              {type === "cardio" ? (
                <span className="workout-details">
                  <span>{`Intensity: ${intensity}`}</span> |
                  <span>{`Duration: ${duration} Hour(s)`}</span>
                </span>
              ) : (
                <span className="workout-details">
                  <span>{`Weight: ${weight}`}</span>|
                  <span>{`Sets: ${sets}`}</span>|<span>{`Reps: ${reps}`}</span>
                </span>
              )}
              {showMore && <div>{instructions}</div>}
            </>
          }
        />
        {showButtons && (
          <ListItemSecondaryAction onMouseDown={(e) => e.stopPropagation()}>
            <Fab
              color="secondary"
              aria-label="edit"
              size="medium"
              onClick={handleEditClick}
            >
              <EditIcon />
            </Fab>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "center",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              style={{ marginRight: 4 }}
            >
              {/* <Paper sx={{ width: 300, height: 300 }}>Hello</Paper> */}
              <EditExerciseModal type={"strength"} handleClose={handleClose} />
            </Popover>
            <Fab color="error" aria-label="edit" size="medium" sx={{ ml: 1 }}>
              <ClearIcon />
            </Fab>
          </ListItemSecondaryAction>
        )}
      </ListItemButton>
      <Divider />
    </>
  );
}

export default DayWorkoutListItem;
