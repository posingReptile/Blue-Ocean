import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Typography from "@mui/material/Typography";

function MuscleItem({ muscleName = "Test Muscle" }) {
  return (
    <Grid item xs={4} align="center" sx={{ mt: 4 }}>
      <Card
        sx={{
          width: 100,
          height: 100,
          backgroundColor: "blue",
        }}
      >
        <CardActionArea>
          <Typography
            sx={{
              width: 100,
              height: 100,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "lightblue",
            }}
          >
            {muscleName}
          </Typography>
        </CardActionArea>
      </Card>
    </Grid>
  );
}

export default MuscleItem;
