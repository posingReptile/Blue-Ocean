import React, { useState } from "react";
import {
  Autocomplete,
  Box,
  Paper,
  Table,
  TableHead,
  TableFooter,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TextField,
  Typography,
} from "@mui/material";
import { createFilterOptions } from "@mui/material/Autocomplete";

// maybe replace with an api call to be sure
const muscles = [
  "abdominals",
  "biceps",
  "calves",
  "chest",
  "glutes",
  "hamstrings",
  "lats",
  "lower back",
  "quads",
  "traps",
  "triceps",
];

const tableFilter = createFilterOptions();
function PersonalRecords(props) {
  const { prs } = props;

  const [tableMuscleFilter, settableMuscleFilter] = useState("");
  const [tableExerciseFilter, setTableExerciseFilter] = useState("");
  function updateCategoryFilters(event, list) {
    if (!list) settableMuscleFilter("");
    else settableMuscleFilter(list);
  }
  function updateExerciseFilters(event, list) {
    if (!list) setTableExerciseFilter("");
    else setTableExerciseFilter(list);
  }

  const ex = prs.map((pr) => pr.name);
  const filteredByExercise = tableFilter(ex, {
    inputValue: tableExerciseFilter,
    getOptionLabel: (option) => option,
  });

  const rowsFilteredByMuscles =
    tableMuscleFilter.length > 0
      ? prs.filter((pr) => pr.muscle === tableMuscleFilter)
      : prs;
  const filteredRows =
    tableExerciseFilter.length > 0
      ? rowsFilteredByMuscles.filter((pr) =>
          filteredByExercise.includes(pr.name)
        )
      : rowsFilteredByMuscles;

  return (
    <>
      <Typography
        variant="overline"
        sx={{
          backgroundColor: "primary.main",
          color: "white",
          display: "block",
          fontWeight: "bold",
          fontSize: "16px",
          mt: 2,
        }}
      >
        Personal Records
      </Typography>
      <Typography
        variant="overline"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          pl: 2,
          pr: 4,
          pt: 2,
          // pb: 2,
          fontWeight: "bold",
          fontSize: "16px",
          backgroundColor: "white",
        }}
      >
        <Typography sx={{ fontWeight: "bold" }}>Exercise</Typography>
        <Typography sx={{ fontWeight: "bold" }}>PR</Typography>
      </Typography>
      <TableContainer
        sx={{}}
        component={Box}
        style={{ maxHeight: 300, backgroundColor: "white" }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                <Autocomplete
                  id="pr-muscles"
                  options={muscles}
                  getOptionLabel={(option) => option}
                  onChange={updateCategoryFilters}
                  renderInput={(params) => (
                    <TextField {...params} label="muscles" />
                  )}
                />
              </TableCell>
              <TableCell>
                <Autocomplete
                  id="pr-exercises"
                  options={ex}
                  getOptionLabel={(option) => option}
                  onChange={updateExerciseFilters}
                  renderInput={(params) => (
                    <TextField {...params} label="exercise" />
                  )}
                />
              </TableCell>
            </TableRow>
          </TableHead>
          {/* <TableRow>
            <TableCell>
              <Typography sx={{ fontWeight: "bold" }}>Exercise</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography sx={{ fontWeight: "bold" }}>PR</Typography>
            </TableCell>
          </TableRow> */}
          <TableBody>
            {filteredRows.map((pr) => (
              <TableRow key={pr.name}>
                <TableCell>{pr.name}</TableCell>
                <TableCell align="right">{pr.weight} lbs</TableCell>
              </TableRow>
            ))}
          </TableBody>
          {/* <TableFooter>
            <TableRow key="foot">
              <TableCell>
                <Autocomplete
                  id="pr-muscles"
                  options={muscles}
                  getOptionLabel={(option) => option}
                  onChange={updateCategoryFilters}
                  renderInput={(params) => (
                    <TextField {...params} label="muscles" />
                  )}
                />
              </TableCell>
              <TableCell>
                <Autocomplete
                  id="pr-exercises"
                  options={ex}
                  getOptionLabel={(option) => option}
                  onChange={updateExerciseFilters}
                  renderInput={(params) => (
                    <TextField {...params} label="exercise" />
                  )}
                />
              </TableCell>
            </TableRow>
          </TableFooter> */}
        </Table>
      </TableContainer>
    </>
  );
}

export default PersonalRecords;
