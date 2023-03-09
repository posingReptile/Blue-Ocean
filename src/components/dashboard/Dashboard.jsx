import Meals from '../modal/meals/Meals.jsx'
import FoodDash from "../modal/meals/FoodDash.jsx"
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import WorkoutDash from "../modal/workout/WorkoutDash";
import DatePickerComponent from "./DatePickerComponent";
import RefreshIcon from "@mui/icons-material/Refresh";

const Dashboard = ({ currentDay, setCurrentDay, currDateInt, userID }) => {
  const [quote, setQuote] = useState("");
  // console.log(currDateInt);

  useEffect(() => {
    // Grab quote, setquote, display
  }, []);
  return (
    <Box elevation={10}>
      <Box
        sx={{
          paddingTop: 3,
          marginBottom: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Meals userId={userID} date={currDateInt}/>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Typography
            sx={{ textAlign: "center", fontStyle: "italic", fontSize: 20 }}
          >
            "The only way to stop me from lifting is if I'm on my death bed, and
            even then I'll probably ask for a spotter."
          </Typography>
          <span style={{ marginLeft: 14 }}>{<RefreshIcon />}</span>
        </div>
      </Box>
      <Box
        sx={{
          marginTop: 1,
          marginBottom: 2.5,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <DatePickerComponent
          currentDay={currentDay}
          setCurrentDay={setCurrentDay}
        />
      </Box>

      {/* Planned Workout and Meals */}

      {/* Planned Workout and Meals */}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FoodDash
            currentDay={currentDay}
            currDateInt={currDateInt}
            userID={userID}
          />
        </Grid>
        <Grid item xs={6}>
          <WorkoutDash
            currentDay={currentDay}
            currDateInt={currDateInt}
            userID={userID}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
