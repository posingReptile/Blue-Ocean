import React, { useState } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// Modal Stuff
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import MuscleItem from "./MuscleItem";
import ChooseExerciseModal from "./ChooseExerciseModal";

function ChooseMuscleModal({ handleClose }) {
  const [currMuscle, setCurrMuscle] = useState("Test Muscle");
  const [exerciseOpen, setExerciseOpen] = useState(false); // Open ChooseExerciseModal

  const handleExerciseOpen = (muscleName) => {
    setCurrMuscle(muscleName);
    setExerciseOpen(true);
  };

  const handleExerciseClose = () => {
    setExerciseOpen(false);
  };

  // Dynamically load from database types maybe?
  const muscles = [
    "Biceps",
    "Triceps",
    "Chest",
    "Abdominals",
    "Lats",
    "Trapezius",
    "Lower Back",
    "Glutes",
    "Quadriceps",
    "Hamstring",
    "Calves",
  ];

  // MuscleItem elements created from muscles array.
  const muscleItems = muscles.map((muscle) => {
    return (
      <MuscleItem
        key={muscle}
        muscleName={muscle}
        handleExerciseOpen={handleExerciseOpen}
      />
    );
  });

  return (
    <>
      <Typography align="center" variant="h4">
        Choose Muscle
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{ overflow: "auto" }}
        // sx={{ justifyContent: "center", alignItems: "center" }}
      >
        {muscleItems}
      </Grid>
      <Button onClick={handleClose} variant="contained">
        Cancel
      </Button>
      <ChooseExerciseModal
        muscleName={currMuscle}
        open={exerciseOpen}
        handleClose={handleExerciseClose}
        handleOpen={handleExerciseOpen}
      />
    </>
  );
}

export default ChooseMuscleModal;
