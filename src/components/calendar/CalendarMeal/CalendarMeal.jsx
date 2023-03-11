import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import axios from "axios";
import MealTitle from "./CalendarMealTitle.jsx"
import MealTableHead from "./CalendarMealTableHead.jsx";

function createData(name, calories, protein) {
  return {
    name,
    calories,
    protein,
  };
}

function MealModalTest({ userID, currDateInt, renderCalender }) {
  const [foodSelection, setFoodSelection] = useState("Breakfast");
  const [foodList, setFoodList] = useState([]);

  function renderMealPlan() {
    setFoodList([]);
    let array = [];
    axios.get(`http://localhost:3000/daily-meals`, {
        params: {
          date: currDateInt,
          mealType: foodSelection,
          userId: userID,
        },
      })
      .then(({ data }) => {
        data.forEach(({ name, calories, protein }) => {
          array.push(createData(name, calories, protein));
        });
      })
      .then(() => {
        if (array.length === 0) return;
        else {
          setFoodList(array);
        }
      });
  }

  useEffect(() => {
    renderMealPlan();
  }, [foodSelection, currDateInt]);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ height: "32vh", maxHeight: "350px" }}>
        <MealTitle
          userID={userID}
          date={currDateInt}
          renderCalender={renderCalender}
          renderMealPlan={renderMealPlan}
        />
        <MealTableHead
          userID={userID}
          currDateInt={currDateInt}
          setFoodSelection={setFoodSelection}
          foodSelection={foodSelection}
        />

        <TableContainer sx={{ height: "13vh", overflowY: "auto" }}>
          <Table aria-labelledby="tableTitle" size={"small"} overflow="auto">
            <TableBody id="foodstuff">
              {foodList.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell component="th" id={labelId}>
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

export default MealModalTest;