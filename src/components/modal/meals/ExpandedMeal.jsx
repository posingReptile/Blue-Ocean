import React, { useState, useEffect } from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Fab from "@mui/material/Fab";

import ClearIcon from "@mui/icons-material/Clear";

import FoodItem from "./FoodItem";

function ExpandedMeal({
  handleShowList,
  expandedType,
  currDateInt,
  userID,
  showButtons,
  rerender,
}) {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/daily-meals`, {
        params: {
          date: currDateInt,
          userId: userID,
          mealType: mealType,
        },
      })
      .then(({ data }) => {
        // console.log(data);
        setFoods(data);
        // setRerender(!rerender);
      });
  }, [rerender, currDateInt]);

  const handleDeleteFood = (foodId) => {
    axios
      .delete(`http://localhost:3000/delete-meal/${foodId}`)
      .then(() => {
        axios
          .get(`http://localhost:3000/daily-meals`, {
            params: {
              date: currDateInt,
              userId: userID,
              mealType: mealType,
            },
          })
          .then(({ data }) => {
            setFoods(data);
            // setRerender(!rerender);
          });
      })
      .catch(() => {
        console.log("Error in deleting food");
      });
  };

  const foodItems = foods.map((food) => {
    const name = food.name.charAt(0).toUpperCase() + food.name.slice(1);
    return (
      <FoodItem
        key={food.food_id}
        food={food}
        name={name}
        showButtons={showButtons}
        handleDeleteFood={handleDeleteFood}
      />
    );
  });

  // We need a route to grab all breakfast items
  // Breakfast, Lunch, Dinner, Snacks
  let mealType = "";
  if (expandedType === "Breakfast") {
    mealType = "Breakfast";
  } else if (expandedType === "Lunch") {
    mealType = "Lunch";
  } else if (expandedType === "Dinner") {
    mealType = "Dinner";
  } else if (expandedType === "Snacks") {
    mealType = "Snacks";
  }

  return (
    <>
      <ListItemButton
        onClick={handleShowList}
        disableGutters
        sx={{ "&:hover": { color: "white" } }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
            ml: 4,
            width: "90%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 3,
            fontWeight: 700,
            fontSize: 20,
          }}
        >
          <>
            {`${expandedType}`}
            <ExitToAppIcon
              sx={{
                "&:hover": { color: "white" },
                transform: "translate(0, -2px)",
              }}
            />
          </>
        </Typography>
      </ListItemButton>
      <Box elevation={5} sx={{ height: 284, overflow: "auto" }}>
        <TableContainer component={Box}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  sx={{ fontWeight: 700, fontSize: 16 }}
                >
                  Food
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, fontSize: 16  }}>
                  Calories
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, fontSize: 16  }}>
                  Protein
                </TableCell>
                {showButtons && (
                  <TableCell
                    align="center"
                    sx={{ fontWeight: 700 }}
                  ></TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>{foodItems}</TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default ExpandedMeal;

// db.query(
//     "SELECT * FROM food WHERE date = $1 AND user_id =  $2 and category = $3",
//     [req.query.date, req.query.userId, req.query.mealType]
//   )
