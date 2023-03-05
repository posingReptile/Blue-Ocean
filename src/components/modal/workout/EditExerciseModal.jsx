import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

function EditExerciseModal({ type = "strength", handleClose }) {
  const handleEditSave = () => {
    handleClose();
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
        {type === "strength" ? (
          <>
            <TextField label="Weight (lb)" variant="outlined"></TextField>
            <TextField label="Sets" variant="outlined"></TextField>
            <TextField label="Reps" variant="outlined"></TextField>
          </>
        ) : (
          <>
            <TextField label="Intensity" variant="outlined"></TextField>
            <TextField label="Duration" variant="outlined"></TextField>
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
