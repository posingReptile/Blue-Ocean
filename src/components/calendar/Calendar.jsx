import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { BiPencil } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import "../../css/calendar.css";

import { TextField } from "@mui/material";
import Button from "@mui/material/Button";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import Quote from "../dashboard/Quote";
import DayWorkoutList from "../modal/workout/DayWorkoutList";
import CalendarWorkout from "./CalendarWorkout";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// const caloriesCollection = {March2023: [['March 11, 2023', 100, ], ['March 12, 2023', 103], ['March 13, 2023', 104]]}

function CalendarPage({ currentDay, setCurrentDay, currDateInt, userID }) {
  const [calorieMonth, setCalorieMonth] = useState("March2023");
  const [daliyMealPlan, setDaliyMealPlan] = useState([
    "apple",
    "banana",
    "orange",
  ]);
  const [daliyWorkoutPlan, setDaliyWorkoutPlan] = useState([
    "Biceps",
    "Chest",
    "Glutes",
  ]);

  // console.log(currentDay);

  useEffect(() => {
    // if (caloriesCollection[calorieMonth]) {
    //   caloriesCollection[calorieMonth].map(([date, number]) =>
    //   addCalories(date, number)
    //   )
    // }
    const currMonth = monthNames.indexOf(calorieMonth.slice(0, -4)) + 1;
    const year = calorieMonth.slice(-4);
    console.log(year, currMonth, userID)
    axios
      .get(
        `http://localhost:3000/monthly-calories?year=${year}&month=${currMonth}&userId=${userID}`
      )
      .then(({ data }) => {
        // console.log(data);
        data.forEach(({ date, calories, category }) => {
          const d = new Date(date);
          const parsedDate = `${
            monthNames[d.getMonth()]
          } ${d.getDate()}, ${d.getFullYear()}`;
          // console.log(parsedDate, calories, category);
          addCalories(parsedDate, calories, category);
        });
      });
  }, [calorieMonth]);



  function addCalories(date, calories, category) {
    if (category === "strength") {
      category = "💪";
    } else {
      category = "👟";
    }
    console.log('from addCalories', date, calories, category);
    // if (document.getElementsByClassName(currentDay.toDateString().trim)[0]) {
    //   console.log(
    //     "conflict",
    //     document.getElementsByClassName(currentDay.toDateString())
    //   );
    //   return;
    // }
    // if (!document.querySelector(`[aria-label="${date}"]`)) return;
    const dateButton = document.querySelector(
      `[aria-label="${date}"]`
    ).parentElement;
    const calorieDiv = document.createElement("div");
    const trainIconDiv = document.createElement("div");
    currentDay.toDateString();
    // calorieDiv.classList.add(currentDay.toDateString().trim());
    calorieDiv.classList.add("calorieCount");
    // trainIconDiv.classList.add(currentDay.toDateString().trim());
    trainIconDiv.classList.add("trainIcon");
    trainIconDiv.innerText = category;
    calorieDiv.innerText = calories + " cal";
    dateButton.appendChild(calorieDiv);
    dateButton.appendChild(trainIconDiv);
  }

  function monthChecker(e) {
    const date = e.activeStartDate;
    const curMonth = monthNames[date.getMonth()];
    console.log("The current month is", curMonth + date.getFullYear());
    setCalorieMonth(curMonth + date.getFullYear());
  }

  function deleteEntry(plan, setPlan, item) {
    const newList = [...plan];
    newList.splice(item, 1);
    setPlan(newList);
  }

  //  exercises,
  // setExercises,
  // showButtons,
  // currDateInt,
  // userID,

  return (
    <>
      <Quote />
      <div className="container">
        <Calendar
          onChange={setCurrentDay}
          value={currentDay}
          className="wrapper"
          onActiveStartDateChange={(e) => {
            monthChecker(e);
          }}
          tileClassName="whatever"
          // onClickDay={(e, value) => {console.log(e, value)}}
        />
        <div className="workMealContainer">
          <Paper elevation={5} sx={{ width: 450, height: "30vh", p: 1 }}>
            <CalendarWorkout userID={userID} currDateInt={currDateInt} />
          </Paper>
          <Paper elevation={5} sx={{ width: 450, height: "30vh", p: 1 }}>
            <CalendarWorkout userID={userID} currDateInt={currDateInt} />
          </Paper>
        </div>
      </div>
    </>
  );
}

export default CalendarPage;
