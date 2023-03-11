import * as React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";

import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from '@mui/icons-material/Refresh';
import EditIcon from "@mui/icons-material/Edit";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import axios from "axios";
import Meals from "../modal/meals/Meals.jsx"
function createData(name, calories, protein) {
  return {
    name,
    calories,
    protein,
  };
}


// function Meals({userId, date}) {

//     return (
//         <div>
//             <Button variant='contained' color='primary' onClick={setOpenMM}>Add meal</Button>
//             <MealModal open={openMM} handleClose={handleClose} userId={userId} date={date}/>
//         </div>
//     )
// }

const rows = [
  createData("Cupcake", 305, 3.7),
  createData("Donut", 452, 25.0),
  createData("Eclair", 262, 16.0),
  createData("Frozen yoghurt", 159, 6.0),
  createData("Gingerbread", 356, 16.0),
  createData("Honeycomb", 408, 3.2, 87, 6.5),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Jelly Bean", 375, 0.0, 94, 0.0),
  createData("KitKat", 518, 26.0, 65, 7.0),
  createData("Lollipop", 392, 0.2, 98, 0.0),
  createData("Marshmallow", 318, 0, 81, 2.0),
  createData("Nougat", 360, 19.0, 9, 37.0),
  createData("Oreo", 437, 18.0, 63, 4.0),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}


function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

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

function EnhancedTableHead(props) {
  const {
    order,
    orderBy,
    onRequestSort,
    foodSelection,
    setFoodSelection
  } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };



  const handleChange = (event) => {
    setFoodSelection(event.target.value);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell key={"name"} align={"left"} sortDirection={false} padding="none">
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
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              // onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>


    </TableHead>
  );
}



function EnhancedTableToolbar({date, userID, numSelected, renderCalender, renderMealPlan}) {
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
          justifyContent: "space-between"
        }}
      >
          <Grid item xs={12} sx={{ display: "flex"}}>
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


export default function MealModalTest({userID, currDateInt, renderCalender}) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);

  const [foodSelection, setFoodSelection] = useState("Breakfast");
  const [foodList, setFoodList] = useState(rows);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };



  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    setSelected(newSelected);
  };


  const isSelected = (name) => selected.indexOf(name) !== -1;
  function renderMealPlan() {
    setFoodList([]);
    let array = [];

    axios
      .get(
        `http://localhost:3000/daily-meals`,
        {params: {
          date: currDateInt,
          mealType: foodSelection,
          userId: userID
        }}
      )
      .then(({ data }) => {
        data.forEach(({name, calories, protein }) => {
          array.push(createData(name, calories, protein));
        });
      })
      .then(() => {
        if (array.length === 0) return;
        else {
          setFoodList(array);
        }
      })
  }


  useEffect(() => {
    renderMealPlan();
  }, [foodSelection, currDateInt]);

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ height: "32vh", maxHeight: "350px" }}>
        <EnhancedTableToolbar numSelected={selected.length} userID={userID} date={currDateInt} renderCalender={renderCalender} renderMealPlan={renderMealPlan}/>
        <EnhancedTableHead
          numSelected={selected.length}
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          rowCount={rows.length}
          userID={userID}
          currDateInt={currDateInt}
          setFoodSelection={setFoodSelection}
          foodSelection={foodSelection}
        />

        <TableContainer sx={{ height: "13vh", overflowY: "auto" }}>
          <Table
            // sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"small"}
            overflow="auto"
          >
            <TableBody id="foodstuff">
              {stableSort(foodList, getComparator(order, orderBy))
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      // onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                    >
                      <TableCell
                        component="th"
                        id={labelId}

                      >
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
