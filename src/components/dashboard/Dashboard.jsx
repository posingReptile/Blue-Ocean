import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import WorkoutDash from "../modal/workout/WorkoutDash";
import DatePickerComponent from "./DatePickerComponent";

const Dashboard = ({ currentDay, setCurrentDay, currDateInt }) => {
  // console.log(currDateInt);
  return (
    <Paper elevation={10} sx={{ width: "1400px" }}>
      <Box
        sx={{
          paddingTop: 5,
          marginBottom: 5,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          Daily Wisdom
        </Typography>
        <Typography sx={{ textAlign: "center", fontStyle: "italic" }}>
          "The only way to stop me from lifting is if I'm on my death bed, and
          even then I'll probably ask for a spotter."
        </Typography>
      </Box>
      <Box
        sx={{
          marginTop: 5,
          marginBottom: 5,
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
          <WorkoutDash currentDay={currentDay} currDateInt={currDateInt} />
        </Grid>
        <Grid item xs={6}>
          <WorkoutDash currentDay={currentDay} currDateInt={currDateInt} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Dashboard;
