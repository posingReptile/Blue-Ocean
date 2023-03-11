import React, { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import { TextField, Button, Box, Paper } from "@mui/material";
import { BiPencil } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import Quote from "../dashboard/Quote";
import DayWorkoutList from "../modal/workout/DayWorkoutList";
import CalendarWorkout from "./CalendarWorkout";
import CalendarFood from "./CalendarFood";
import MealModalTest from "./ctest.jsx";
import Form from "../modal/meals/Form";
import "../../css/calendar.css";

import DatePickerComponent from "../dashboard/DatePickerComponent.jsx";
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

function CalendarPage({ currentDay, setCurrentDay, currDateInt, userID }) {
  const [calorieMonth, setCalorieMonth] = useState("March2023");
  const [calorieDates, setCalorieDates] = useState([]);
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
  function renderCalender() {
    async function getCalories(parsedDate, userID) {
      await axios
        .get(
          `http://localhost:3000/monthly-calories?date=${Number(
            parsedDate
          )}&userId=${userID}`
        )
        .then(({ data }) => {
          const sum = data[0].sum;
          if (sum) {
            const parsedWordDate = `${
              monthNames[Number(parsedDate.slice(4, 6)) - 1]
            } ${Number(parsedDate.slice(-2))}, ${parsedDate.slice(0, 4)}`;
            monthlyArray.push({ date: parsedWordDate, calories: sum });
          }
        })
        .then(() => {
          if (parsedDate.slice(-2) === "31") {
            if (monthlyArray.length === 0) {
            } else {
              setCalorieDates(monthlyArray);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    const currMonth = monthNames.indexOf(calorieMonth.slice(0, -4)) + 1;
    const year = calorieMonth.slice(-4);
    let monthlyArray = [];
    for (let i = 1; i < 32; i++) {
      let month = currMonth;
      let day;
      if (month < 10) {
        month = `0${month}`;
      }
      if (i < 10) {
        day = `0${i}`;
      } else {
        day = `${i}`;
      }
      const parsedDate = `${year}${month}${day}`;
      getCalories(parsedDate, userID);
    }
  }

  useEffect(() => {
    renderCalender();
  }, [calorieMonth]);

  useEffect(() => {
    calorieDates.map(({ date, calories }) => {
      addCalories(date, calories);
    });
  }, [calorieDates]);

  function addCalories(date, calories) {
    if (calories === undefined) return;
    if (document.querySelector(`[aria-label="${date}"]`) === null) {
      return;
    }
    const dateButton = document.querySelector(
      `[aria-label="${date}"]`
    ).parentElement;
    let blank = document.getElementById(date);
    if (blank) {
      blank.innerHTML = calories + " cal";
    } else {
      const calorieDiv = document.createElement("div");
      const trainIconDiv = document.createElement("div");
      calorieDiv.innerText = calories + " cal";
      calorieDiv.setAttribute("id", date);
      calorieDiv.classList.add("calorieCount");
      dateButton.appendChild(calorieDiv);

      trainIconDiv.classList.add("trainIcon");
      trainIconDiv.innerText = "🍎";
      dateButton.appendChild(trainIconDiv);
    }
  }

  function monthChecker(e) {
    const date = e.activeStartDate;
    const curMonth = monthNames[date.getMonth()];
    setCalorieMonth(curMonth + date.getFullYear());
  }

  function deleteEntry(plan, setPlan, item) {
    const newList = [...plan];
    newList.splice(item, 1);
    setPlan(newList);
  }

  return (
    <>
      <div className="container">
        <Calendar
          onChange={setCurrentDay}
          value={currentDay}
          className="wrapper"
          minDetail="year"
          onActiveStartDateChange={(e) => {
            monthChecker(e);
          }}
          tileClassName="whatever"
        />
        <div className="workMealContainer">
          <Paper
            elevation={5}
            sx={{ width: 450, height: "30vh", p: 1, maxHeight: "300px" }}
          >
            <CalendarWorkout userID={userID} currDateInt={currDateInt} />
          </Paper>
          <Paper elevation={5}>
            <MealModalTest
              userID={userID}
              currDateInt={currDateInt}
              renderCalender={renderCalender}
            />
          </Paper>
        </div>
      </div>
    </>
  );
}

export default CalendarPage;
