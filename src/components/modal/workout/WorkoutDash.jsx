import React, { useState } from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NavigationIcon from "@mui/icons-material/Navigation";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import Button from "@mui/material/Button";

import EditWorkout from "./EditWorkout";

import "../../../css/workout.css";

import DayWorkoutList from "./DayWorkoutList";

// Component for Dashboard (Showing today's workout)
function Workout() {
  const [test, setTest] = useState(false);

  return (
    <div>
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
            <Fab color="primary">
              <AddIcon />
            </Fab>
          </Grid>
          <DayWorkoutList />
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
    </div>
  );
}

export default Workout;
