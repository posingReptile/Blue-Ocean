import React, { useState } from "react";
import { alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import Grid from "@mui/material/Grid";

import Meals from "../../modal/meals/Meals.jsx";


function MealTitle({
  date,
  userID,
  numSelected,
  renderCalender,
  renderMealPlan,
}) {
  const [rerender, setRerender] = useState(false);
  const [openMM, setOpenMM] = useState(false);

  const handleMealOpen = () => {
    setOpenMM(true);
  };

  const handleMealClose = () => {
    setOpenMM(false);
  };

  return (
    <>
      <Meals
        userId={userID}
        date={date}
        openMM={openMM}
        handleMealClose={handleMealClose}
        rerender={rerender}
        setRerender={setRerender}
      />
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Grid item xs={12} sx={{ display: "flex" }}>
          <Grid item xs={8}>
            <Typography
              variant="h4"
              component="div"
              sx={{
                display: "flex",
              }}
            >
              Today's Meal Plan
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={4} align="end" sx={{}}>
          <Fab
            color="primary"
            onClick={() => {
              renderCalender();
              renderMealPlan();
            }}
            sx={{ mr: 1.5 }}
            size="small"
          >
            <RefreshIcon />
          </Fab>
          <Fab color="primary" onClick={handleMealOpen} size="small" sx={{}}>
            <AddIcon />
          </Fab>
        </Grid>
      </Toolbar>
    </>
  );
}


export default MealTitle;