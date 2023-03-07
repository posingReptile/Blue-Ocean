import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import WorkoutDash from '../modal/workout/WorkoutDash';
import DatePickerComponent from './DatePickerComponent';

const Dashboard = ({ currentDay, setCurrentDay }) => {
  return (
    <Paper elevation={10} sx={{ width: '1400px' }}>
      <Box
        sx={{
          marginTop: 5,
          marginBottom: 5,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <DatePickerComponent
          currentDay={currentDay}
          setCurrentDay={setCurrentDay}
        />
      </Box>
      <Paper elevation={3}>
        <Typography variant='h4' sx={{ textAlign: 'center' }}>
          Daily Stats
        </Typography>
        <Typography sx={{ textAlign: 'center' }}>Calories Consumed</Typography>
        <Typography sx={{ textAlign: 'center' }}>Calories Burned:</Typography>
        <Typography sx={{ textAlign: 'center' }}>Calorie Burn</Typography>
      </Paper>

      {/* Planned Workout and Meals */}

      {/* Planned Workout and Meals */}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <WorkoutDash />
        </Grid>
        <Grid item xs={6}>
          <WorkoutDash />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Dashboard;
