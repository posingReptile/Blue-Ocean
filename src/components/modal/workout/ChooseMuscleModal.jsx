import React, { useState } from "react";
import axios from "axios";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// Modal Stuff
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import MuscleItem from "./MuscleItem";
import ChooseExerciseModal from "./ChooseExerciseModal";

function ChooseMuscleModal({ handleClose, currDateInt, userID, setExercises }) {
  const [currMuscle, setCurrMuscle] = useState("Test Muscle");
  const [exerciseOpen, setExerciseOpen] = useState(false); // Open ChooseExerciseModal
  const [exerciseList, setExerciseList] = useState([]);

  // This handler gets invoked when muscle is clicked (axios call made)
  const handleExerciseOpen = (muscleName, muscleQuery) => {
    console.log(muscleQuery);
    // List of all muscles:
    //[abdominals, biceps, calves, chest, glutes, hamstring, lats, lower_back, quads, traps, triceps]
    axios
      .get("http://localhost:3000/exercises", {
        params: {
          muscle: `${muscleQuery}`,
        },
      })
      .then(({ data }) => {
        setExerciseList(data);
        setCurrMuscle(muscleName);
        setExerciseOpen(true);
      })
      .catch((err) => {
        console.log("An error happened trying to get data for body part");
      });
  };

  const handleExerciseClose = () => {
    setExerciseOpen(false);
  };

  // Dynamically load from database types maybe?
  const muscles = [
    ["Biceps", "biceps"],
    ["Triceps", "triceps"],
    ["Chest", "chest"],
    ["Abdominals", "abdominals"],
    ["Lats", "lats"],
    ["Trapezius", "traps"],
    ["Lower Back", "lower_back"],
    ["Glutes", "glutes"],
    ["Quadriceps", "quadriceps"],
    ["Hamstring", "hamstrings"],
    ["Calves", "calves"],
  ];

  // MuscleItem elements created from muscles array.
  const muscleItems = muscles.map((muscle) => {
    return (
      <MuscleItem
        key={muscle[0]}
        muscleName={muscle[0]}
        muscleQuery={muscle[1]}
        handleExerciseOpen={handleExerciseOpen}
      />
    );
  });

  // Make an axios request here to get exercises according to muscle group

  return (
    <>
      <Typography align="center" variant="h4">
        Choose Muscle Modal
      </Typography>
      <Grid
        container
        spacing={1}
        sx={{
          overflow: "auto",
          justifyContent: "center",
          alignItems: "center",
          minWidth: 400,
          // border: "1px solid red",
        }}
      >
        {muscleItems}
      </Grid>
      <Button onClick={handleClose} variant="contained">
        Exit
      </Button>
      <ChooseExerciseModal
        muscleName={currMuscle}
        open={exerciseOpen}
        handleClose={handleExerciseClose}
        handleOpen={handleExerciseOpen}
        exerciseList={exerciseList}
        currDateInt={currDateInt}
        userID={userID}
        setExercises={setExercises}
      />
    </>
  );
}

export default ChooseMuscleModal;
