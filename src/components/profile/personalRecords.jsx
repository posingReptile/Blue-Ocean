import React, { useState } from 'react';
import {
  Autocomplete, Table, TableHead, TableFooter, TableBody, TableRow, TableCell, TableContainer, TextField
} from '@mui/material';

const muscles = [
  'abdominals', 'biceps', 'calves', 'chest', 'glutes',
  'hamstrings', 'lats', 'lower back', 'quads', 'traps', 'triceps'
];

const prs = [{
  name: 'squat',
  muscle: 'quads',
  prval: 'idk'
}, {
  name: 'bench',
  muscle: 'chest',
  prval: 'idk'
}, {
  name: 'deadlift',
  muscle: 'hamstrings',
  prval: 'idk'
}];

function PersonalRecords() {
  const [tableCategoryFilter, setTableCategoryFilter] = useState([]);
  const [tableExerciseFilter, setTableExerciseFilter] = useState([]);
  function updateCategoryFilters(event, list) { setTableCategoryFilter(list); }
  function updateExerciseFilters(event, list) { setTableExerciseFilter(list); }

  const ex = prs.map((pr) => pr.name);

  const filteredRows = (tableCategoryFilter.length + tableExerciseFilter.length) > 0 ? prs.filter((pr) => tableCategoryFilter.includes(pr.muscle) || tableExerciseFilter.includes(pr.name)) : prs;

  return (
    <TableContainer>
      user's prs
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Exercises</TableCell>
            <TableCell align="right">PR</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredRows.map((pr) => (
            <TableRow key={pr.name}>
              <TableCell>{pr.name}</TableCell>
              <TableCell align="right">{pr.prval}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow key="foot">
            <TableCell>
              <Autocomplete
                multiple
                id="pr-muscles"
                options={muscles}
                getOptionLabel={(option) => option}
                filterSelectedOptions
                onChange={updateCategoryFilters}
                renderInput={(params) => <TextField {...params} label="muscles" />}
              />
            </TableCell>
            <TableCell>
              <Autocomplete
                multiple
                id="pr-exercises"
                options={ex}
                getOptionLabel={(option) => option}
                filterSelectedOptions
                onChange={updateExerciseFilters}
                renderInput={(params) => <TextField {...params} label="exercise" />}
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}

export default PersonalRecords;
