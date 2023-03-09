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

function ExpandedMeal({ handleShowList, expandedType, currDateInt, userID }) {
  const [foods, setFoods] = useState([]);
  console.log(foods);
  // name
  // take calories
  // protein
  {
    /* <div style={{ display: "flex", gap: 10 }}>
          <span>{food.name}</span>
          <span>{food.calories} calories</span>
          <span>{food.protein}g protein</span>
        </div> */
  }
  const foodItems = foods.map((food) => {
    const name = food.name.charAt(0).toUpperCase() + food.name.slice(1);
    return (
      <TableRow>
        <TableCell align="center">{name}</TableCell>
        <TableCell align="center">{food.calories} cals</TableCell>
        <TableCell align="center">{food.protein}g</TableCell>
      </TableRow>
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
      });
  }, []);

  return (
    <>
      <ListItemButton onClick={handleShowList} disableGutters>
        <Typography
          variant="h6"
          component="div"
          sx={{
            ml: 4,
            width: "90%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <>
            {`${expandedType}`}
            <ExitToAppIcon />
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
                <TableCell align="center" sx={{ fontWeight: 700 }}>
                  Calories
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>
                  Protein
                </TableCell>
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
