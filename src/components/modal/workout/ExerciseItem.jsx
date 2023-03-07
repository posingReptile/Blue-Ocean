import React, { useState } from "react";

import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function ExerciseItem({ handleAddExercise, exercise }) {
  const [showMore, setShowMore] = useState(false); // Shows the full details of the exercise clicked
  // console.log(exercise);

  const { type, instructions, name, difficulty } = exercise;
  const exerciseId = exercise.exercise_detail_id;

  const handleAdd = (e) => {
    e.stopPropagation();
    setShowMore(false);
    const newExerciseObj = {
      exerciseDetail: exerciseId,
      userId: 1,
      date: 20230307,
      weight: 50,
      sets: 50,
      reps: 50,
      duration: 100,
      intensity: 3,
      caloriesBurned: 999,
    };
    handleAddExercise(newExerciseObj);
  };

  return (
    <>
      <ListItemButton onMouseDown={() => setShowMore(!showMore)}>
        <ListItemAvatar>
          <Avatar>
            {type === "cardio" ? (
              <DirectionsRunIcon color="secondary" />
            ) : (
              <FitnessCenterIcon color="secondary" />
            )}
          </Avatar>
        </ListItemAvatar>
        <div>
          <ListItemText primary={`${name}`} />
          <ListItemText secondary={`Type: ${type}`} />
          {showMore && (
            <>
              <ListItemText primary={`${instructions}`} />
              <div
                onMouseDown={(e) => e.stopPropagation()}
                style={{ marginTop: 10 }}
              >
                {type === "cardio" ? (
                  <div style={{ display: "flex", gap: 10 }}>
                    <TextField label="Intensity" variant="outlined" />
                    <TextField label="Duration" variant="outlined" />
                  </div>
                ) : (
                  <div style={{ display: "flex", gap: 10 }}>
                    <TextField label="Weight (lbs)" variant="outlined" />
                    <TextField label="Sets" variant="outlined" />
                    <TextField label="Reps" variant="outlined" />
                  </div>
                )}
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  onMouseDown={(e) => handleAdd(e)}
                  sx={{ mt: 2 }}
                >
                  Add to workout
                </Button>
              </div>
            </>
          )}
        </div>
      </ListItemButton>
    </>
  );
}

export default ExerciseItem;
