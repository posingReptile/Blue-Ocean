import React, { useState } from "react";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";

// React Components
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
