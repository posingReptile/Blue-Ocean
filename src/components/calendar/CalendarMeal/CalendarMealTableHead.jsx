import * as React from "react";
import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { visuallyHidden } from "@mui/utils";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Breakfast (100 cal)",
  },
  {
    id: "calories",
    numeric: true,
    disablePadding: false,
    label: "Calories",
  },
  {
    id: "protein",
    numeric: true,
    disablePadding: false,
    label: "Protein (g)",
  },
];

function MealTableHead({ foodSelection, setFoodSelection }) {

  const handleChange = (event) => {
    setFoodSelection(event.target.value);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell
          key={"name"}
          align={"left"}
          padding="none"
        >
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Meal</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={foodSelection}
              onChange={handleChange}
              label={foodSelection}
            >
              <MenuItem value={"Breakfast"}>Breakfast</MenuItem>
              <MenuItem value={"Lunch"}>Lunch</MenuItem>
              <MenuItem value={"Dinner"}>Dinner</MenuItem>
              <MenuItem value={"Snack"}>Snack</MenuItem>
            </Select>
          </FormControl>
        </TableCell>
        {headCells.slice(1).map((headCell, index) => (
          <TableCell
            key={index}
            align={"right"}
            padding={"none"}
          >
            <TableCell>
              {headCell.label}
              <Box component="span" sx={visuallyHidden}></Box>
            </TableCell>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default MealTableHead;