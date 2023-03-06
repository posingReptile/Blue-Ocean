import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Typography from "@mui/material/Typography";

// public/icons/chest.png

function MuscleItem({ muscleName = "Test Muscle", handleExerciseOpen }) {
  let muscleIcon = "";
  if (["Biceps", "Triceps"].includes(muscleName)) {
    muscleIcon = "./icons/arm.png";
  }
  if (["Chest"].includes(muscleName)) {
    muscleIcon = "./icons/chest.png";
  }
  if (["Abdominals"].includes(muscleName)) {
    muscleIcon = "./icons/abs.png";
  }
  if (["Lats", "Trapezius"].includes(muscleName)) {
    muscleIcon = "./icons/back.png";
  }
  if (["Lower Back", "Glutes"].includes(muscleName)) {
    muscleIcon = "./icons/lowerback.png";
  }
  if (["Quadriceps", "Hamstring", "Calves"].includes(muscleName)) {
    muscleIcon = "./icons/leg.png";
  }

  return (
    <Grid item xs={4} align="center" sx={{ mt: 4 }}>
      <Card
        sx={{
          width: 100,
          height: 100,
          backgroundColor: "blue",
        }}
      >
        <CardActionArea onClick={() => handleExerciseOpen(muscleName)}>
          <Typography
            sx={{
              width: 100,
              height: 100,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "lightblue",
            }}
          >
            <div>{muscleName}</div>
            <img src={muscleIcon} width={50} height={50} />
          </Typography>
        </CardActionArea>
      </Card>
    </Grid>
  );
}

export default MuscleItem;
