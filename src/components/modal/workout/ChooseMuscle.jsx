import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

function ChooseMuscle() {
  return (
    <div>
      <div>Choose Muscle Component</div>
      <Grid
        container
        spacing={0}
        // sx={{ justifyContent: "center", alignItems: "center" }}
      >
        <Grid item xs={4} align="center">
          <Card
            sx={{
              width: 200,
              height: 200,
              backgroundColor: "blue",
            }}
          >
            <CardActionArea>
              <Typography
                sx={{
                  width: 200,
                  height: 200,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "lightblue",
                }}
              >
                Quads
              </Typography>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={4} align="center">
          <Card
            sx={{
              width: 200,
              height: 200,
              backgroundColor: "blue",
            }}
          >
            <CardActionArea>
              <Typography
                sx={{
                  width: 200,
                  height: 200,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "lightblue",
                }}
              >
                Biceps
              </Typography>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default ChooseMuscle;
