import React, { useState } from 'react';
import { Typography, IconButton, Badge, Paper } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

const DatePickerComponent = ({ currentDay, setCurrentDay }) => {
  const handleDateChange = (newDate) => {
    setCurrentDay(newDate);
  };

  const handlePrevDay = () => {
    const prevDay = new Date(currentDay);
    prevDay.setDate(currentDay.getDate() - 1);
    setCurrentDay(prevDay);
  };

  const handleNextDay = () => {
    const nextDay = new Date(currentDay);
    nextDay.setDate(currentDay.getDate() + 1);
    setCurrentDay(nextDay);
  };

  return (
    <Paper
      sx={{
        width: '250px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 1,
      }}
    >
      <IconButton
        onClick={handlePrevDay}
        // sx={{
        //   borderRadius: '50%',
        //   width: 40,
        //   height: 40,
        //   backgroundColor: 'primary.main',
        //   '&:hover': {
        //     backgroundColor: 'secondary.main',
        //   },
        // }}
      >
        <ArrowBack />
      </IconButton>
      <Typography variant='h4' sx={{ padding: '0 1rem', textAlign: 'center' }}>
        {currentDay.toLocaleDateString()}
      </Typography>
      <IconButton
        onClick={handleNextDay}
        // sx={{
        //   borderRadius: '50%',
        //   width: 40,
        //   height: 40,
        //   backgroundColor: 'primary.main',
        //   '&:hover': {
        //     backgroundColor: 'secondary.main',
        //   },
        // }
      >
        <ArrowForward />
      </IconButton>
    </Paper>
  );
};

export default DatePickerComponent;
