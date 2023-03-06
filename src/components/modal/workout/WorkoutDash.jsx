import React, { useState } from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";

// Icons
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";

// React Components
import DayWorkoutList from "./DayWorkoutList";
import ChooseMuscleModal from "./ChooseMuscleModal";
import "../../../css/workout.css";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: "50%",
  // height: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 2,
};

// Component for Dashboard (Showing today's workout)
function Workout() {
  const [showButtons, setShowButtons] = useState(false); // Shows edit and clear button
  const [open, setOpen] = useState(false); // Opens add a workout modal
  const handleOpen = () => setOpen(true); // Handles when Add (+) is clicked
  const handleClose = () => setOpen(false); // Handles modal outside click (closes)

  return (
    <>
      <Box
        sx={{
          minHeight: 600,
          backgroundColor: "primary.light",
          borderRadius: 4,
          margin: 4,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography variant="h4" component="div" align="center">
              Today's Workout
            </Typography>
          </Grid>
          <Grid item xs={4} align="end" pr={4}>
            <Fab color="primary" onClick={handleOpen}>
              <AddIcon />
            </Fab>
            <Fab
              color="primary"
              onClick={() => {
                setShowButtons(!showButtons);
              }}
            >
              <EditIcon />
            </Fab>
          </Grid>
          <DayWorkoutList showButtons={showButtons} />
          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <Typography sx={{ mt: 2, ml: 4 }} variant="h6" component="div">
              Calories Burned Today: 1,000,000
            </Typography>
            <Typography
              sx={{ mt: 2, mb: 2, ml: 4 }}
              variant="h6"
              component="div"
            >
              Total Workout Duration: 1 Light year
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              justifyContent: "center",
              paddingRight: 6,
            }}
          >
            <TextField
              id="outlined-basic"
              label="Notes"
              variant="outlined"
              multiline
              sx={{ width: 300 }}
              rows={8}
            />
            <Button variant="contained" sx={{ mt: 2, width: 150 }}>
              Save Notes
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <ChooseMuscleModal handleClose={handleClose} />
        </Box>
      </Modal>
    </>
  );
}

export default Workout;
