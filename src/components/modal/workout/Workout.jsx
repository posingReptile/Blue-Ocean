import React from "react";
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

import "../../../css/workout.css";

// Component for Dashboard (Showing today's workout)
function Workout() {
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
          <Grid item xs={12} md={6}>
            <List>
              <ListItem>
                <ListItemText primary="Exercise1" />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Exercise2" />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Exercise 3" />
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
          sx={{ width: 300 }}
          rows={5}
        />

        <Typography sx={{ mt: 2, mb: 2, ml: 4 }} variant="h6" component="div">
          Calories Burned
        </Typography>
        <Typography sx={{ mt: 2, mb: 2, ml: 4 }} variant="h6" component="div">
          Total Calories Today:
        </Typography>
      </Box>
    </div>
  );
}

export default Workout;
