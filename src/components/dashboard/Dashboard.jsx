import Meals from "../modal/meals/Meals.jsx";
import FoodDash from "../modal/meals/FoodDash.jsx";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import WorkoutDash from "../modal/workout/WorkoutDash";
import DatePickerComponent from "./DatePickerComponent";

import Quote from "./Quote";

const Dashboard = ({ currentDay, setCurrentDay, currDateInt, userID }) => {
  const [quote, setQuote] = useState("");
  const [openMM, setOpenMM] = useState(false);

  const handleMealOpen = () => {
    setOpenMM(true);
  };

  const handleMealClose = () => {
    setOpenMM(false);
  };
  // console.log(currDateInt);

  useEffect(() => {
    // Grab quote, setquote, display
  }, []);
  return (
    <Box elevation={10}>
      <Meals
        userId={userID}
        date={currDateInt}
        openMM={openMM}
        handleMealClose={handleMealClose}
      />
      <Quote />
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
            handleMealOpen={handleMealOpen}
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
