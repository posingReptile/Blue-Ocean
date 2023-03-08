import React, { useState } from "react";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function EditExerciseModal({
  exerciseId,
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
  const [durationInput, setDurationInput] = useState(duration);
  const [weightInput, setWeightInput] = useState(weight);
  const [setsInput, setSetsInput] = useState(sets);
  const [repsInput, setRepsInput] = useState(reps);

  const handleEditSave = () => {
    handleClose();
    // handleEditInfo needs an object
    const editExerciseObj = {
      exerciseId: exerciseId,
      weight: weightInput,
      sets: setsInput,
      reps: repsInput,
      duration: durationInput,
      intensity: intensityInput,
    };
    handleEditInfo(editExerciseObj);
  };
  return (
    <Paper>
      <Typography variant="h4" sx={{ pr: 4, pl: 4, pt: 4 }}>
        Exercise Name
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
              label="Duration (min)"
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
              label="Weight (lb)"
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
