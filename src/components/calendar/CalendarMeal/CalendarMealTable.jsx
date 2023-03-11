import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';

import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";

import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";

import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import EggIcon from '@mui/icons-material/Egg';
import { Category } from '@mui/icons-material';

function createData(name, calories, food, carbs, protein) {
  return {
    name,
    calories,
    foodList: food,
    carbs,
    protein,
  };
}
const mealTimeIcon = (component) => {
  switch (component) {
    case 'Breakfast':
      return  (
        <EmojiFoodBeverageIcon color="secondary" />
      )
    case "Lunch":
      return (
        <BakeryDiningIcon color="secondary" />
      );
    case 'Dinner':
      return (
        <DinnerDiningIcon color="secondary" />
      );
    case 'Snack':
      return (
        <EggIcon color="secondary" />
      );
  }
};

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);



  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
          <ListItemAvatar>
            <Avatar sx={{ backgroundColor: "" }}>
              {mealTimeIcon(row.name)}
            </Avatar>
          </ListItemAvatar>
        </TableCell>
        <TableCell align="right">{row.calories}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Food</TableCell>
                    <TableCell>Calories</TableCell>
                    <TableCell align="right">Protein</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.foodList.map((foodItem, index) => (
                    <TableRow key={foodItem.food + index}>
                      <TableCell component="th" scope="row">{foodItem.food}</TableCell>
                      <TableCell>{foodItem.calories}</TableCell>
                      <TableCell align="right">{foodItem.protein}</TableCell>
                    </TableRow>
                  ))}
                  <TextField placeholder="food..." variant="filled" required sx={{
              margin: "1rem",
              width: "250px"
            }} />
            <TextField placeholder="quantity..." variant="filled" required sx={{
              margin: "1rem",
              width: "50px"
            }} />
            <Fab color="primary" onClick={() => {}}>
              <AddIcon />
            </Fab>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const testfood = [
  {
    food: 'apples',
    calories: '19',
    protein: 3,
  },
  {
    food: 'orange',
    calories: '11',
    protein: 1,
  },
]

const rows = [
  createData('Breakfast', 159, testfood),
  createData('Lunch', 237, testfood),
  createData('Dinner', 262, testfood),
  createData('Snack', 305, testfood),
];

export default function MealTable() {
  return (
    <Grid item xs={12} md={12}>
      <List sx={{ ml: 4, mr: 4, height: "18vh", overflow: "auto" }}>
      <TableContainer component={Paper} sx={{
    backgroundColor: "inherit",
    margin: 0,
    fontFamily: "Roboto,Helvetica,Arial,sans-serif",
    fontWeight: 400,
    fontSize: '1rem',
    lineHeight: '1.5',
    letterSpacing: '0.00938em'}}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              {/* <TableCell>All Meals</TableCell> */}
              {['Breakfast', "Lunch", 'Dinner', 'Snack'].map((category) => 
                 (<TableCell>          
                  <ListItemAvatar>
                  <Avatar sx={{ backgroundColor: "" }}>
                    {mealTimeIcon(category)}
                   </Avatar>
                </ListItemAvatar>
                </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
     </List>
    </Grid>
  );
}

