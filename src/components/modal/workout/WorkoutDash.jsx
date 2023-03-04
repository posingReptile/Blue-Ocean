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
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import ListItemButton from "@mui/material/ListItemButton";

import EditWorkout from "./EditWorkout";

import "../../../css/workout.css";

// Component for Dashboard (Showing today's workout)
function Workout() {
  const [test, setTest] = useState(false);
  return (
    <div>
      <Box
        sx={{
          width: 600,
          height: 600,
          backgroundColor: "primary.dark",
          borderRadius: 4,
          margin: 4,
        }}
      >
        <Grid container spacing={2}>
          <Typography sx={{ mt: 2, mb: 2, ml: 4 }} variant="h4" component="div">
            Today's Workout
          </Typography>
          <Fab color="secondary" aria-label="edit">
            <EditIcon />
          </Fab>
          <Fab color="primary" aria-label="add">
            <AddIcon />
          </Fab>
          <Grid item xs={12} md={12}>
            <List sx={{ ml: 4, mr: 4 }}>
              <ListItemButton onClick={() => setTest(!test)}>
                <ListItemAvatar>
                  <Avatar sx={{ backgroundColor: "orange" }}>
                    <DirectionsRunIcon color="error" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Running Exercise 1"
                  secondary={`Intensity: ${"High"} | Duration: ${1} hour`}
                  secondary={
                    <>
                      <div className="workout-details">
                        <span>{`Intensity: ${"High"}`}</span>
                        <span>{`Duration: ${1} Hour`}</span>
                      </div>
                      {test ? (
                        <div>
                          Instructions testInstructions testInstructions
                          testInstructions testInstructions testInstructions
                          testInstructions testInstructions testInstructions
                          test Instructions testInstructions testInstructions
                          testInstructions test
                        </div>
                      ) : null}
                    </>
                  }
                />
              </ListItemButton>
              <Divider />
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ backgroundColor: "orange" }}>
                    <FitnessCenterIcon color="secondary" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Strength Exercise 2"
                  secondary={
                    <div className="workout-details">
                      <span>{`Weight: ${10}lbs`}</span>
                      <span>{`Sets: ${20}`}</span>
                      <span>{`Reps: ${30}`}</span>
                    </div>
                  }
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ backgroundColor: "orange" }}>
                    <FitnessCenterIcon color="secondary" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Strength Exercise 3"
                  secondary={
                    <div className="workout-details">
                      <span>{`Weight: ${10}lbs`}</span>
                      <span>{`Sets: ${20}`}</span>
                      <span>{`Reps: ${30}`}</span>
                    </div>
                  }
                />
              </ListItem>
              <Divider />
            </List>
          </Grid>
        </Grid>
        <TextField
          id="outlined-basic"
          label="Notes"
          variant="outlined"
          multiline
          sx={{ width: 300, ml: 4 }}
          rows={5}
        />
        <Typography sx={{ mt: 2, mb: 2, ml: 4 }} variant="h6" component="div">
          Calories Burned: 1,000,000
        </Typography>
        <Typography sx={{ mt: 2, mb: 2, ml: 4 }} variant="h6" component="div">
          Total Calories Today: 5,000
        </Typography>
      </Box>
    </div>
  );
}

export default Workout;
