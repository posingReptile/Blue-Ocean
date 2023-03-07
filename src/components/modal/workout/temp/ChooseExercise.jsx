import React, { useState } from "react";
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

import Button from "@mui/material/Button";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";

import WorkoutDetails from "../WorkoutDetails";

function ChooseExercise() {
  const [showAdd, setShowAdd] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddWorkout = (e) => {
    e.stopPropagation();
    // event.preventDefault();
    setShowAddModal(true);
    console.log("Hello");
  };

  const handleShowInstructions = (e) => {
    e.stopPropagation();
    event.preventDefault();
    console.log("instructions");
    setShowInstructions(!showInstructions);
  };
  return (
    <div>
      <h1 align="center">Choose Exercise</h1>
      <Grid container>
        <Grid item xs={12}>
          <List>
            <ListItemButton onMouseDown={() => setShowAdd(!showAdd)}>
              <ListItemAvatar>
                <Avatar>
                  <FitnessCenterIcon color="secondary" />
                </Avatar>
              </ListItemAvatar>
              <div>
                <ListItemText primary="Strength Exercise 1" />
                {showAdd ? (
                  <>
                    <ListItemText primary="Type: Strength" />
                    {showInstructions ? (
                      <ListItemText
                        sx={{ mr: 6 }}
                        primary="Instructions long instructions here Instructions long instructions here Instructions long instructions here Instructions long instructions here Instructions long instructions here "
                      />
                    ) : null}
                    <Button
                      variant="contained"
                      size="large"
                      onMouseDown={(e) => handleAddWorkout(e)}
                    >
                      Add to workout
                    </Button>
                  </>
                ) : null}
              </div>
              {showAdd ? (
                <ListItemSecondaryAction
                  onMouseDown={(e) => {
                    handleShowInstructions(e);
                  }}
                >
                  <Fab color="secondary" aria-label="edit" size="small">
                    <ReadMoreIcon />
                  </Fab>
                </ListItemSecondaryAction>
              ) : null}
            </ListItemButton>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar>
                  <FitnessCenterIcon color="secondary" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Strength Exercise 1" />
            </ListItemButton>
          </List>
        </Grid>
      </Grid>
      <WorkoutDetails
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal}
      />
    </div>
  );
}

export default ChooseExercise;
