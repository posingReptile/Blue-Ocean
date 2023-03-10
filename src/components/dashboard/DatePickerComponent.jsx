import React, { useState } from "react";
import { Typography, IconButton, Badge, Paper } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

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
        width: "200px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        padding: 1,
        backgroundColor: "#006edc",
        color: "white",
      }}
    >
      <IconButton
        onClick={handlePrevDay}
        sx={{
          color: "white",
          "&:hover": { color: "orange" },
        }}
      >
        <ArrowBack sx={{ "&:hover": { color: "orange" } }} />
      </IconButton>
      <Typography variant="h6" sx={{ padding: "0 1rem", textAlign: "center" }}>
        {currentDay.toLocaleDateString()}
      </Typography>
      <IconButton
        onClick={handleNextDay}
        sx={{
          color: "white",
          "&:hover": { color: "orange" },
        }}
      >
        <ArrowForward sx={{ "&:hover": { color: "orange" } }} />
      </IconButton>
    </Paper>
  );
};

export default DatePickerComponent;
