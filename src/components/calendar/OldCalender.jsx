import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { BiPencil } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import "../../css/calendar.css";

import { TextField } from "@mui/material";
import Button from "@mui/material/Button";

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

function CalendarPage({ currentDay, setCurrentDay }) {
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

  useEffect(() => {
    // if (caloriesCollection[calorieMonth]) {
    //   caloriesCollection[calorieMonth].map(([date, number]) =>
    //   addCalories(date, number)
    //   )
    // }
    const currMonth = monthNames.indexOf(calorieMonth.slice(0, -4)) + 1;
    const year = calorieMonth.slice(-4);
    // console.log(year, currMonth)
    axios
      .get(
        `http://localhost:3000/monthly-meals?year=${year}&month=${currMonth}`
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

  // const mealPlan = ['apple', 'banana', 'orange']
  // const workoutCollection = ['Biceps', 'Chest', 'Glutes']

  // useEffect(() => {
  //   console.log(currentDay);
  //   //axios request for the meal and workout plan

  // }, [currentDay])

  function addCalories(date, calories, category) {
    if (category === "strength") {
      category = "💪";
    } else {
      category = "👟";
    }
    // console.log('from addCalories', date, calories, category);
    if (document.getElementsByClassName(currentDay.toDateString().trim)[0]) {
      console.log(
        "conflict",
        document.getElementsByClassName(currentDay.toDateString())
      );
      return;
    }
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

  return (
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

      {/* <div>
        <h1>{currentDay.toDateString()}</h1>
        <div id="summary">
          <div id="selectedWorkOutPlan">
            <div className='planTitle'>
              <h2>Workout Plan</h2>
            </div>
            <TextField placeholder="food..." variant="filled" required sx={{
              width: "50%"
            }} onChange={(event) => handleInputChange(event, index)} />
             <TextField placeholder="qty..." variant="filled" required sx={{
              width: "50px"
            }} />
            {daliyWorkoutPlan.length !== 0 ?
             daliyWorkoutPlan.map((item, i) => {
                return (
                  <div className="listContainer" key={i} >
                    <div>{item}</div>
                    <AiFillDelete onClick={() => deleteEntry(daliyWorkoutPlan, setDaliyWorkoutPlan, item)}/>
                    <BiPencil />
                  </div>
                )
              }):
               <div>
                No plans yet try adding one
              </div>
            }
          </div>
          <div id="selectedMealPlan">
            <div className='planTitle'>
              <h2>Meal Plan</h2>
            </div>
            <TextField placeholder="food..." variant="filled" required sx={{
              width: "50%"
            }} />
             <TextField placeholder="qty..." variant="filled" required sx={{
              width: "50px"
            }}/>
              {daliyMealPlan.length !== 0 ?
                daliyMealPlan.map((item, i) => {
                    return (
                      <div className="listContainer" key={i} >
                        <div>{item}</div>
                        <AiFillDelete onClick={() => deleteEntry(daliyMealPlan, setDaliyMealPlan, item)}/>
                        <BiPencil />
                      </div>
                    )
                  }):
                <div>
                    No plans yet try adding one
                </div>
              }
            </div>
        </div>
      </div> */}
    </div>
  );
}

export default CalendarPage;
