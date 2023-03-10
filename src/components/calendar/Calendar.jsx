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
import Form from "../modal/meals/Form";
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
// console.log('form start', currentDay.getMonth() + 1, currDateInt)
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
  function renderCalender () {

    async function getCalories (parsedDate, userID) {
      // console.log(parsedDate);
      await axios.get(`http://localhost:3000/monthly-calories?date=${Number(parsedDate)}&userId=${userID}`)
     .then(({data}) => {
       const sum = data[0].sum;
       console.log(sum, parsedDate);
       if (sum) {
         const parsedWordDate = `${monthNames[Number(parsedDate.slice(4,6)) - 1]} ${Number(parsedDate.slice(-2))}, ${parsedDate.slice(0,4)}`;
        //  console.log(sum, parsedDate);
         monthlyArray.push({date: parsedWordDate, calories:sum});
       }
     })
     .then(() => {
       if (parsedDate.slice(-2) === "31") {
         console.log('from ffinished', monthlyArray);
         if (monthlyArray.length === 0) {
         } else {
         setCalorieDates(monthlyArray);
         }
       }  
     }).catch((err) => {
      console.log(err);
     })
   }
   const currMonth = monthNames.indexOf(calorieMonth.slice(0, -4)) + 1;
   const year = calorieMonth.slice(-4);
   let monthlyArray = [];
  //  console.log('from inputs', calorieMonth, currMonth)
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
    // console.log('I am being used!!!')
    renderCalender();
  }, [calorieMonth]);

  useEffect(() => {
    calorieDates.map(({date, calories}) => {
      // console.log('from map function', date, calories);
      addCalories(date, calories)
    })
  }, [calorieDates])

  function addCalories(date, calories) {
    // console.log("I am used form addCalories")
    if (calories === undefined) return;
    // console.log("from addCalories", date, calories);
    if (document.querySelector(
      `[aria-label="${date}"]`
    ) === null) {
      // console.log("it null")
      return;
    }
    const dateButton = document.querySelector(
      `[aria-label="${date}"]`
    ).parentElement;
    // console.log(document.getElementById(currDateInt), !!document.getElementById(currDateInt))
    let blank = document.getElementById(date)
    // blank.innerHTML = calories + " cal";
    if (blank) {
      blank.innerHTML = calories + " cal";
    } else {
      // console.log(blank);
      const calorieDiv = document.createElement("div");
      const trainIconDiv = document.createElement("div");
      calorieDiv.innerText = calories + " cal";
      calorieDiv.setAttribute("id", date);
      calorieDiv.classList.add("calorieCount");
      dateButton.appendChild(calorieDiv);

      trainIconDiv.classList.add("trainIcon");
      trainIconDiv.innerText = "💪";
      dateButton.appendChild(trainIconDiv);
    }
  }

  function monthChecker(e) {
    const date = e.activeStartDate;
    const curMonth = monthNames[date.getMonth()];
    // console.log("The current month is", curMonth + date.getFullYear());
    setCalorieMonth(curMonth + date.getFullYear());
  }

  function deleteEntry(plan, setPlan, item) {
    const newList = [...plan];
    newList.splice(item, 1);
    setPlan(newList);
  }

  return (
    <>
      {/* <Box
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
      </Box> */}
      <div className="container">
        <Calendar
          onChange={setCurrentDay}
          value={currentDay}
          className="wrapper"
          minDetail='year'
          onActiveStartDateChange={(e) => {
            monthChecker(e);
          }}
          tileClassName="whatever"
          // onClickDay={(e, value) => {console.log(e, value)}}
        />
        <div className="workMealContainer">
          <Paper elevation={5} sx={{ width: 450, height: "30vh", p: 1, maxHeight: "300px" }}>
            <CalendarWorkout userID={userID} currDateInt={currDateInt} />
          </Paper>
          <Paper elevation={5}>
            <MealModalTest userID={userID} currDateInt={currDateInt} renderCalender={renderCalender}/>
          </Paper>
        </div>
      </div>
    </>
  );
}

export default CalendarPage;
