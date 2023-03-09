import React, { useState, useEffect } from "react";
import axios from "axios";

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

//react
import MealTable from "./MealTable.jsx"


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
  width: "60%",
  minWidth: 400,
};

function FoodDash() {

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
              Today's Meal Plan
            </Typography>
          </Grid>

        <MealTable />
        <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <Typography sx={{ mt: 2, mb: 20, ml: 4 }} variant="h6" component="div">
              Total Calories Consumed Today: 2 dollars
            </Typography>
            {/* <Typography
              sx={{ mt: 2, mb: 3, ml: 4 }}
              variant="h6"
              component="div"
            >
              Today's Workout Duration: 1 Light year (Should be dynamic)
            </Typography> */}
          </Grid>
        <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              justifyContent: "center",
              paddingRight: 4,
              paddingBottom: 3,
            }}
          >
            <TextField
              id="outlined-basic"
              label="Notes"
              variant="outlined"
              value={''}
              onChange={(e) => setCurrNotes(e.target.value)}
              multiline
              sx={{ width: 300 }}
              rows={8}
            />
            <Button
              variant="contained"
              sx={{ mt: 2, width: 150 }}
              onClick={() => {console.log('from button')}}
            >
              Save Notes
            </Button>
          </Grid>
          </Grid>
      </Box>

    </>
  );
}

export default FoodDash;
