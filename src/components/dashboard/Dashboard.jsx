import Meals from "../modal/meals/Meals.jsx";
import FoodDash from "../modal/meals/FoodDash.jsx";
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { format } from "date-fns";
import WorkoutDash from "../modal/workout/WorkoutDash";
import DatePickerComponent from "./DatePickerComponent";
import axios from "axios";

import AdminMessage from "./AdminMessage";
import Quote from "./Quote";

const Dashboard = ({ currentDay, setCurrentDay, currDateInt, userID }) => {
  const [adminMessage, setAdminMessage] = useState("");
  const [quotes, setQuotes] = useState("");
  const [curQuote, setCurQuote] = useState("");

  useEffect(() => {
    let messageCurrentDay = format(currentDay, "yyyy-MM-dd");
    axios.get(`http://localhost:3000/message?date=${messageCurrentDay}`).then((res) => {
      if (res.data.length > 0) {
        setAdminMessage(res.data[0].message);
      } else {
        setAdminMessage("");
      }
    });
  }, [currentDay]);

  return (
    <Box elevation={10}>
      <Meals userId={userID} date={currDateInt}/>
      {adminMessage.length > 0 ? <AdminMessage adminMessage={adminMessage}/> : <Quote quotes={quotes} setQuotes={setQuotes} curQuote={curQuote} setCurQuote={setCurQuote} />}
      <Box
        sx={{
          marginTop: 1,
          marginBottom: 2.5,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <DatePickerComponent
          currentDay={currentDay}
          setCurrentDay={setCurrentDay}
        />
      </Box>

      {/* Planned Workout and Meals */}

      {/* Planned Workout and Meals */}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FoodDash
            currentDay={currentDay}
            currDateInt={currDateInt}
            userID={userID}
          />
        </Grid>
        <Grid item xs={6}>
          <WorkoutDash
            currentDay={currentDay}
            currDateInt={currDateInt}
            userID={userID}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
