import React, { useState } from "react";

import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";

// Icons
import Fab from "@mui/material/Fab";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import EditExerciseModal from "../../modal/workout/EditExerciseModal";

function CalendarWorkoutListItem({
  handleEditInfo,
  handleDelete,
  showButtons,
  exercise,
}) {
  const [showMore, setShowMore] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null); // Anchor for edit button popover

  // Handles open state for edit popover
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const exerciseName = exercise.name;
  const exerciseId = exercise.exercise_id;
  const { instructions, type, intensity, duration, weight, sets, reps } =
    exercise;

  let intensityName = "";
  if (intensity === 1) {
    intensityName = "Low";
  } else if (intensity === 2) {
    intensityName = "Medium";
  } else {
    intensityName = "High";
  }

  function truncateText(exerciseName, maxLength) {
    if (exerciseName.length <= maxLength) {
      return exerciseName;
    }
    return (
      <Typography noWrap component="span">
        {exerciseName.substr(0, maxLength)}&hellip;
      </Typography>
    );
  }

  // Toggles popover
  const handleEditClick = (e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };
  // Handles when we click out of edit
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = (e, exerciseId) => {
    e.stopPropagation();
    handleDelete(exerciseId);
  };

  return (
    <>
      <ListItemButton
        onMouseDown={() => setShowMore(!showMore)}
        disableGutters
        sx={{ mr: 1 }}
      >
        <ListItemAvatar sx={{ minWidth: 40 }}>
          <Avatar sx={{ backgroundColor: "white" }}>
            {type === "cardio" ? (
              <DirectionsRunIcon
                color="primary"
                sx={{ "&:hover": { color: "#006edc" } }}
              />
            ) : (
              <FitnessCenterIcon
                color="primary"
                sx={{ "&:hover": { color: "#006edc" } }}
              />
            )}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={showMore ? exerciseName : truncateText(exerciseName, 28)}
          secondary={
            <div style={{ fontSize: 12 }}>
              {type === "cardio" ? (
                <span className="workout-details">
                  <span>{`Intensity: ${intensityName}`}</span> |
                  <span>{`Duration: ${duration} min(s)`}</span>
                </span>
              ) : (
                <span className="workout-details">
                  <span>{`Weight: ${weight} lb(s)`}</span>|
                  <span>{`Sets: ${sets}`}</span>|<span>{`Reps: ${reps}`}</span>
                </span>
              )}
              {showMore && <div>Instructions: {instructions}</div>}
            </div>
          }
        />
        {showButtons && (
          <ListItemSecondaryAction onMouseDown={(e) => e.stopPropagation()}>
            {showMore ? null : (
              <>
                <Fab
                  color="secondary"
                  aria-label="edit"
                  size="small"
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
                  <EditExerciseModal
                    exerciseId={exerciseId}
                    exerciseName={exerciseName}
                    type={type}
                    handleClose={handleClose}
                    handleEditInfo={handleEditInfo}
                    intensity={intensity}
                    duration={duration}
                    weight={weight}
                    sets={sets}
                    reps={reps}
                  />
                </Popover>
                <Fab
                  color="error"
                  aria-label="edit"
                  size="small"
                  sx={{ ml: 1 }}
                  onClick={(e) => handleDeleteClick(e, exerciseId)}
                >
                  <ClearIcon />
                </Fab>
              </>
            )}
          </ListItemSecondaryAction>
        )}
      </ListItemButton>
      <Divider />
    </>
  );
}

export default CalendarWorkoutListItem;
