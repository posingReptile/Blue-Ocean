import React, { useState, useEffect } from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";

// Icons
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";

//react
import DayMealList from "./DayMealList";
import MealTable from "./MealTable.jsx";
import Meals from "./Meals.jsx";

function FoodDash({ currDateInt, userID }) {
  const [breakfastCals, setBreakfastCals] = useState(0);
  const [lunchCals, setLunchCals] = useState(0);
  const [dinnerCals, setDinnerCals] = useState(0);
  const [snacksCals, setSnacksCals] = useState(0);
  const [totalCals, setTotalCals] = useState(0);

  const [currNotes, setCurrNotes] = useState(""); // Today's notes
  const [showButtons, setShowButtons] = useState(false); // Shows edit and clear button
  // console.log(showButtons);
  const [openMM, setOpenMM] = useState(false);
  const [rerender, setRerender] = useState(false);

  const [showEditButton, setShowEditButton] = useState(false);
  // const [dashRender, setDashRender] = useState(false);

  const handleMealOpen = () => {
    setOpenMM(true);
  };

  const handleMealClose = () => {
    setOpenMM(false);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/all-meals", {
        params: {
          date: currDateInt,
          userId: userID,
        },
      })
      .then(({ data }) => {
        // console.log(data);
        // Calculate calories
        let breakfast = 0;
        let lunch = 0;
        let dinner = 0;
        let snacks = 0;

        data.forEach((food) => {
          if (food.category === "Breakfast") breakfast += food.calories;
          if (food.category === "Lunch") lunch += food.calories;
          if (food.category === "Dinner") dinner += food.calories;
          if (food.category === "Snacks") snacks += food.calories;
        });

        setBreakfastCals(breakfast);
        setLunchCals(lunch);
        setDinnerCals(dinner);
        setSnacksCals(snacks);

        setTotalCals(breakfast + lunch + dinner + snacks);
      });
  }, [currDateInt, rerender]);

  // Grab the current day's workout notes
  useEffect(() => {
    axios
      .get("http://localhost:3000/notes", {
        params: {
          date: currDateInt,
          userId: userID,
        },
      })
      .then(({ data }) => {
        console.log(data);
        if (!data[0].meal_notes) {
          setCurrNotes("");
        } else {
          setCurrNotes(data[0].meal_notes);
        }
      })
      .catch(() => {
        console.log("Error gathering notes for the day");
      });
  }, [currDateInt]);

  // Send a put request when clicking save notes
  const handleNoteSave = () => {
    axios
      .put("http://localhost:3000/notes", {
        notes: currNotes,
        date: currDateInt,
        userId: userID,
        type: "meal",
      })
      .then(({ data }) => {
        console.log(data);
        setCurrNotes(data[0].meal_notes);
      })
      .catch(() => {
        console.log("Error updating meal-notes");
      });
  };
  return (
    <>
      <Meals
        userId={userID}
        date={currDateInt}
        openMM={openMM}
        handleMealClose={handleMealClose}
        rerender={rerender}
        setRerender={setRerender}
      />
      <Box
        sx={{
          minHeight: 600,
          backgroundColor: "primary.light",
          borderRadius: 4,
          margin: 4,
        }}
      >
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "lightblue",
              marginLeft: 2,
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
            }}
          >
            <Grid item xs={12} sx={{ display: "flex", marginBottom: 2 }}>
              <Grid item xs={8}>
                <Typography
                  variant="h4"
                  component="div"
                  sx={{
                    display: "flex",
                    paddingTop: 1,
                    paddingLeft: 2,
                  }}
                >
                  Today's Meal
                </Typography>
              </Grid>
              <Grid item xs={4} align="end" sx={{ pr: 4 }}>
                {showEditButton && (
                  <Fab
                    color="primary"
                    onClick={() => {
                      setShowButtons(!showButtons);
                    }}
                    sx={{ mr: 2 }}
                  >
                    <EditIcon sx={{ "&:hover": { color: "white" } }} />
                  </Fab>
                )}
                <Fab
                  color="primary"
                  onClick={handleMealOpen}
                  sx={{ }}
                >
                  <AddIcon sx={{ "&:hover": { color: "white" } }} />
                </Fab>
              </Grid>
            </Grid>

            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingBottom: 10,
                }}
              >
                <Typography
                  sx={{ ml: 2, fontSize: 18 }}
                  variant="h6"
                  component="div"
                >
                  <span style={{ fontWeight: 700 }}>
                    Total Calories Consumed:
                  </span>{" "}
                  ~{totalCals} cals
                </Typography>
              </div>
            </Grid>
          </Grid>

          {/* USE THIS <MealTable /> */}
          <DayMealList
            currDateInt={currDateInt}
            userID={userID}
            breakfastCals={breakfastCals}
            lunchCals={lunchCals}
            dinnerCals={dinnerCals}
            snacksCals={snacksCals}
            showButtons={showButtons}
            rerender={rerender}
            setShowEditButton={setShowEditButton}
            // setRerender={setRerender}
          />

          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              justifyContent: "center",
              paddingRight: 4,
              marginLeft: 4,
              paddingBottom: 3,
            }}
          >
            <TextField
              label="Notes"
              variant="outlined"
              value={currNotes}
              onChange={(e) => setCurrNotes(e.target.value)}
              multiline
              sx={{ width: "100%" }}
              rows={3}
            />
            <Button
              variant="contained"
              sx={{ mt: 2, width: 150 }}
              onClick={handleNoteSave}
            >
              Save Notes
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default FoodDash;
