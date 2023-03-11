import React, { useState } from "react";
import {
  ListItemAvatar,
  Avatar,
  ListItemButton,
  ListItemText,
  TextField,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";

function ExerciseItem({ handleAddExercise, exercise, userID, currDateInt }) {
  const [showMore, setShowMore] = useState(false); // Shows the full details of the exercise clicked
  const [intensity, setIntensity] = useState(undefined);
  const [duration, setDuration] = useState(undefined);
  const [weight, setWeight] = useState(undefined);
  const [sets, setSets] = useState(undefined);
  const [reps, setReps] = useState(undefined);

  const { type, instructions, name, difficulty } = exercise;
  const exerciseId = exercise.exercise_detail_id;

  const handleAdd = (event) => {
    const estimatedStrCals = sets * reps * 1; // Cals from str exercises
    const estimatedCardioCals = intensity * duration * 5; // Cals from cardio
    let estimatedTotalCals = 0;
    if (estimatedStrCals) {
      estimatedTotalCals += estimatedStrCals;
    }
    if (estimatedCardioCals) {
      estimatedTotalCals += estimatedCardioCals;
    }

    const estimatedStrDuration = Math.ceil(2 * sets * (reps / 10));
    let estimatedTotalDuration = 0;
    if (duration) {
      estimatedTotalDuration += duration;
    }
    if (estimatedStrDuration) {
      estimatedTotalDuration += estimatedStrDuration;
    }

    event.stopPropagation();
    setShowMore(false);
    const newExerciseObj = {
      exerciseDetail: exerciseId,
      userId: userID,
      date: currDateInt,
      weight: weight || null,
      sets: sets || null,
      reps: reps || null,
      duration: estimatedTotalDuration || null,
      intensity: intensity || null,
      caloriesBurned: estimatedTotalCals,
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
