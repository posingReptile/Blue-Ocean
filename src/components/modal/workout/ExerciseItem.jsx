import React, { useState } from "react";

import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// Needs userId and date prop drilled down to each item
// Need to implement a formula for calories burned
function ExerciseItem({ handleAddExercise, exercise, userID, currDateInt }) {
  const [showMore, setShowMore] = useState(false); // Shows the full details of the exercise clicked
  const [intensity, setIntensity] = useState(undefined);
  const [duration, setDuration] = useState(undefined);
  const [weight, setWeight] = useState(undefined);
  const [sets, setSets] = useState(undefined);
  const [reps, setReps] = useState(undefined);
  // console.log(exercise);

  const { type, instructions, name, difficulty } = exercise;
  const exerciseId = exercise.exercise_detail_id;

  const handleAdd = (event) => {
    event.stopPropagation();
    setShowMore(false);
    const newExerciseObj = {
      exerciseDetail: exerciseId,
      userId: userID,
      date: currDateInt,
      weight: weight || null,
      sets: sets || null,
      reps: reps || null,
      duration: duration || null,
      intensity: intensity || null,
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
                    <FormControl sx={{ width: 130 }}>
                      <InputLabel>Intensity</InputLabel>
                      <Select
                        value={intensity}
                        label="Intensity"
                        onChange={(e) => setIntensity(e.target.value)}
                      >
                        <MenuItem value={1}>Low</MenuItem>
                        <MenuItem value={2}>Medium</MenuItem>
                        <MenuItem value={3}>High</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      label="Duration (mins)"
                      variant="outlined"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      type="number"
                      inputProps={{ min: 0 }}
                    />
                  </div>
                ) : (
                  <div style={{ display: "flex", gap: 10 }}>
                    <TextField
                      label="Weight (lbs)"
                      variant="outlined"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      type="number"
                      inputProps={{ min: 0 }}
                    />
                    <TextField
                      label="Sets"
                      variant="outlined"
                      value={sets}
                      onChange={(e) => setSets(e.target.value)}
                      type="number"
                      inputProps={{ min: 0 }}
                    />
                    <TextField
                      label="Reps"
                      variant="outlined"
                      value={reps}
                      onChange={(e) => setReps(e.target.value)}
                      type="number"
                      inputProps={{ min: 0 }}
                    />
                  </div>
                )}
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  disabled={
                    (weight && sets && reps) || (intensity && duration)
                      ? false
                      : true
                  }
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
