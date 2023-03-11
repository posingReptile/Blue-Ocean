import React, { useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  Box,
  Button,
  ButtonGroup,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";

function EditExerciseModal({
  exerciseId,
  exerciseName,
  type,
  handleClose,
  handleEditInfo,
  intensity,
  duration,
  weight,
  sets,
  reps,
}) {
  const [intensityInput, setIntensityInput] = useState(intensity);
  const [durationInput, setDurationInput] = useState(
    type === "cardio" ? duration : 0
  );
  const [weightInput, setWeightInput] = useState(weight);
  const [setsInput, setSetsInput] = useState(sets);
  const [repsInput, setRepsInput] = useState(reps);

  const handleEditSave = () => {
    handleClose();
    const estimatedStrCals = setsInput * repsInput * 1; // Cals from str exercises
    const estimatedCardioCals = intensityInput * durationInput * 5; // Cals from cardio

    let estimatedTotalCals = 0;
    if (estimatedStrCals) {
      estimatedTotalCals += estimatedStrCals;
    }
    if (estimatedCardioCals) {
      estimatedTotalCals += estimatedCardioCals;
    }

    const estimatedStrDuration = Math.ceil(2 * setsInput * (repsInput / 10));
    let estimatedTotalDuration = 0;
    if (durationInput) {
      estimatedTotalDuration += durationInput;
    }
    if (estimatedStrDuration) {
      estimatedTotalDuration += estimatedStrDuration;
    }

    const editExerciseObj = {
      weight: weightInput,
      sets: setsInput,
      reps: repsInput,
      duration: estimatedTotalDuration,
      intensity: intensityInput,
      caloriesBurned: estimatedTotalCals,
      exerciseId: exerciseId,
    };
    handleEditInfo(editExerciseObj);
  };

  return (
    <Paper>
      <Typography
        variant="h4"
        align="center"
        sx={{ pr: 4, pl: 4, pt: 4, maxWidth: 250, fontSize: 20 }}
      >
        {exerciseName}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 4,
          gap: 2,
        }}
      >
        {type === "cardio" ? (
          <>
            <FormControl sx={{ width: 130 }}>
              <InputLabel>Intensity</InputLabel>
              <Select
                value={intensityInput}
                label="Intensity"
                onChange={(e) => setIntensityInput(e.target.value)}
              >
                <MenuItem value={1}>Low</MenuItem>
                <MenuItem value={2}>Medium</MenuItem>
                <MenuItem value={3}>High</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Duration ( min(s) )"
              variant="outlined"
              value={durationInput}
              onChange={(e) => setDurationInput(e.target.value)}
              type="number"
              inputProps={{ min: 0 }}
            ></TextField>
          </>
        ) : (
          <>
            <TextField
              label="Weight ( lb(s) )"
              variant="outlined"
              value={weightInput}
              onChange={(e) => setWeightInput(e.target.value)}
              type="number"
              inputProps={{ min: 0 }}
            ></TextField>
            <TextField
              label="Sets"
              variant="outlined"
              value={setsInput}
              onChange={(e) => setSetsInput(e.target.value)}
              type="number"
              inputProps={{ min: 0 }}
            ></TextField>
            <TextField
              label="Reps"
              variant="outlined"
              value={repsInput}
              onChange={(e) => setRepsInput(e.target.value)}
              type="number"
              inputProps={{ min: 0 }}
            ></TextField>
          </>
        )}
        <ButtonGroup variant="contained">
          <Button color="primary" onClick={handleEditSave}>
            Save
          </Button>
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
        </ButtonGroup>
      </Box>
    </Paper>
  );
}

export default EditExerciseModal;
