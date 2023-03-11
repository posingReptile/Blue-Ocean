import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Fab from "@mui/material/Fab";
import ClearIcon from "@mui/icons-material/Clear";


function FoodItem({ name, food, showButtons, handleDeleteFood }) {
  return (
    <>
      <TableRow>
        <TableCell align="center">{name}</TableCell>
        <TableCell align="center">{food.calories} cals</TableCell>
        <TableCell align="center">{food.protein}g</TableCell>
        {showButtons && (
          <TableCell align="center" sx={{ fontWeight: 700 }}>
            <Fab
              size="small"
              color="error"
              onClick={() => handleDeleteFood(food.food_id)}
            >
              <ClearIcon />
            </Fab>
          </TableCell>
        )}
      </TableRow>
    </>
  );
}

export default FoodItem;
