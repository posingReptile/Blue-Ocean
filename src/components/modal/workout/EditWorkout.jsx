import React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

function EditWorkout() {
  return (
    <div>
      <Typography
        sx={{ mt: 2, mb: 2, ml: 4 }}
        variant="h4"
        component="div"
        align="center"
      >
        Today's Workout
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <List sx={{ ml: 4, mr: 4 }}>
            <ListItem>
              <ListItemText
                primary="Exercise 1"
                secondary={`Weight: ${10} Sets: ${20} Reps: ${30}`}
                sx={{ mr: 6 }}
              />
              <ListItemSecondaryAction>
                <Fab color="secondary" aria-label="edit" size="small">
                  <EditIcon />
                </Fab>
                <Fab
                  color="error"
                  aria-label="edit"
                  size="small"
                  sx={{ ml: 1 }}
                >
                  <ClearIcon />
                </Fab>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Add an exercise" />
              <Fab color="primary" aria-label="add" size="small">
                <AddIcon />
              </Fab>
            </ListItem>
            <Divider />
          </List>
        </Grid>
      </Grid>
      <Grid item xs={12} align="center">
        <ButtonGroup variant="contained">
          <Button size="large" color="primary">
            Save
          </Button>
          <Button size="large" color="error">
            Cancel
          </Button>
        </ButtonGroup>
      </Grid>
    </div>
  );
}

export default EditWorkout;
