import React, { useState } from 'react';
import {
  Autocomplete, Paper, Table, TableHead, TableFooter, TableBody, TableRow, TableCell, TableContainer, TextField, Typography
} from '@mui/material';
import { createFilterOptions } from '@mui/material/Autocomplete';

const muscles = [
  'abdominals', 'biceps', 'calves', 'chest', 'glutes',
  'hamstrings', 'lats', 'lower back', 'quads', 'traps', 'triceps'
];

const prs = [{
  name: 'squat',
  muscle: 'quads',
  prval: 'idk'
}, {
  name: 'squat two',
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

const tableFilter = createFilterOptions();
function PersonalRecords() {
  const [tableMuscleFilter, settableMuscleFilter] = useState('');
  const [tableExerciseFilter, setTableExerciseFilter] = useState('');
  function updateCategoryFilters(event, list) {
    if (!list) settableMuscleFilter('');
    else settableMuscleFilter(list);
  }
  function updateExerciseFilters(event, list) {
    if (!list) setTableExerciseFilter('');
    else setTableExerciseFilter(list);
  }

  const ex = prs.map((pr) => pr.name);
  const filteredByExercise = tableFilter(ex, { inputValue: tableExerciseFilter, getOptionLabel: (option) => option });

  const rowsFilteredByMuscles = (tableMuscleFilter.length) > 0 ? prs.filter((pr) => pr.muscle === tableMuscleFilter) : prs;
  const filteredRows = (tableExerciseFilter.length > 0) ? rowsFilteredByMuscles.filter((pr) => filteredByExercise.includes(pr.name)) : rowsFilteredByMuscles;

  return (
    <TableContainer sx={{ mt: 4}} component={Paper}>
      <Typography variant="overline" sx={{ display: 'block', fontWeight: 'bold', fontSize: '16px' }}>
        Personal Records
      </Typography>
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
                id="pr-muscles"
                options={muscles}
                getOptionLabel={(option) => option}
                onChange={updateCategoryFilters}
                renderInput={(params) => <TextField {...params} label="muscles" />}
              />
            </TableCell>
            <TableCell>
              <Autocomplete
                id="pr-exercises"
                options={ex}
                getOptionLabel={(option) => option}
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
