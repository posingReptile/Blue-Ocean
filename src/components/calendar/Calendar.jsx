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
import CalendarFood from "./CalendarFood";
import MealModalTest from "./ctest.jsx";
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
  const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // Jan - Dec (no leap year)
  const leapYeardays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // Jan - Dec (leap year)

  useEffect(() => {
    // if (caloriesCollection[calorieMonth]) {
    //   caloriesCollection[calorieMonth].map(([date, number]) =>
    //   addCalories(date, number)
    //   )
    // }
    const currMonth = monthNames.indexOf(calorieMonth.slice(0, -4)) + 1;
    const year = calorieMonth.slice(-4);
    console.log(year, currMonth, userID);
    for (let i = 1; i < 32; i++) {
      let currentDay;
      if (i < 10) {
        currentDay = currDateInt.toString().slice(0, -2) + `0${i}`;
      } else {
        currentDay = currDateInt.toString().slice(0, -2) + `${i}`;
      }

      axios
      .get(
        `http://localhost:3000/monthly-calories?date=${Number(currentDay)}&userId=${userID}`
      )
      .then(({data}) => {
        if (data[0].sum) {
          const d = new Date(currentDay);
          const parsedDate = `${
            monthNames[d.getMonth()]
          } ${d.getDate()}, ${d.getFullYear()}`;
          addCalories(parsedDate, data[0].sum)
        }
        // console.log(currentDay);
        // data.forEach(({ date, calories, category }) => {
        //   const d = new Date(date);
        //   const parsedDate = `${
        //     monthNames[d.getMonth()]
        //   } ${d.getDate()}, ${d.getFullYear()}`;
        //   console.log(parsedDate, calories, category);
          // addCalories(parsedDate, calories, category);
        });

      // });
    }
  }, [calorieMonth]);

  function addCalories(date, calories, category) {

    console.log("from addCalories", date, calories, category);
    if (document.getElementById(currDateInt)) {
      console.log(
        "conflict, from calander",
        document.getElementById(currDateInt)
      );
      return;
    }
    const dateButton = document.querySelector(
      `[aria-label="${date}"]`
    ).parentElement;
    const calorieDiv = document.createElement("div");
    const trainIconDiv = document.createElement("div");
    currentDay.toDateString();
    calorieDiv.setAttribute("id", currDateInt);
    calorieDiv.classList.add("calorieCount");
    trainIconDiv.classList.add("trainIcon");
    trainIconDiv.innerText = "💪";
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
          <Paper elevation={5}>
            <MealModalTest userID={userID} currDateInt={currDateInt} />
          </Paper>
        </div>
      </div>
    </>
  );
}

export default CalendarPage;
