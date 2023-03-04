import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

import "../../../css/workoutdetails.css";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 2,
};

function WorkoutDetails({ showAddModal, setShowAddModal }) {
  const handleCloseModal = () => {
    setShowAddModal(false);
  };

  return (
    <div>
      <Modal open={showAddModal} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          <Typography variant="h4">Exercise name</Typography>
          <div className="workout-details-form">
            <TextField label="Weight (lbs)" variant="outlined" />
            <TextField label="Sets" variant="outlined" />
            <TextField label="Reps" variant="outlined" />
          </div>
          <div>
            <ButtonGroup variant="contained">
              <Button size="large" color="primary" onClick={handleCloseModal}>
                Save
              </Button>
              <Button size="large" color="error" onClick={handleCloseModal}>
                Cancel
              </Button>
            </ButtonGroup>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default WorkoutDetails;
