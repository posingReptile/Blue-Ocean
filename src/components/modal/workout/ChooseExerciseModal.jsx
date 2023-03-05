import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
//======
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import TextField from "@mui/material/TextField";

import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";

import ExerciseItem from "./ExerciseItem";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function ChooseExerciseModal() {
  const [open, setOpen] = useState(false); // Open exerciselist modal
  const [showMore, setShowMore] = useState(false); // Shows the full details of the exercise clicked
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button onClick={handleOpen}>Open Child Modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 800, height: 800 }}>
          <h1 align="center">Choose Exercise</h1>
          <Grid container>
            <Grid item xs={12}>
              <List>
                <ExerciseItem type="Strength" />
                <ExerciseItem type="Cardio" />
                <ExerciseItem type="Strength" />
              </List>
            </Grid>
          </Grid>
          <Button onClick={handleClose}>Close Modal</Button>
        </Box>
      </Modal>
    </>
  );
}
export default ChooseExerciseModal;
