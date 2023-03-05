import React, { useState } from "react";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

// Modal Stuff
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import MuscleItem from "./MuscleItem";

function ChooseMuscleModal({ setShowAddModal }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        <MuscleItem />
        <MuscleItem muscleName={"Chest"} />
        <MuscleItem muscleName={"Biceps"} />
        <MuscleItem muscleName={"Quadriceps"} />
        <MuscleItem muscleName={"Quadriceps"} />
        <MuscleItem muscleName={"Biceps"} />
        <MuscleItem muscleName={"Biceps"} />
        <MuscleItem muscleName={"Biceps"} />
        <MuscleItem muscleName={"Biceps"} />
      </Grid>
    </>
  );
}

export default ChooseMuscleModal;
