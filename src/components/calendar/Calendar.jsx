import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { BiPencil } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
// import { IoIosAdd } from "react-icons/Io";
// import 'react-calendar/dist/Calendar.css';
// import '../../css/calandar.css'
import '../../css/calendar.css'


function CalendarPage({currentDay, setCurrentDay}) {
  let caloriesCollection = {March2023: [['March 11, 2023', 100, ], ['March 12, 2023', 103], ['March 13, 2023', 104]]}

  const [calorieMonth, setCalorieMonth] = useState('March2023');

  useEffect(() => {
    if (caloriesCollection[calorieMonth]) {
      caloriesCollection[calorieMonth].map(([date, number]) => 
      addCalories(date, number)
      ) 
    }
  }, [calorieMonth])

  let workoutCollection = ['Biceps', 'Chest', 'Glutes']


  function addCalories (date , number, trainingType) {
    // date = date ||'March 11, 2023';
    if (trainingType === "strength") {
      trainingType = '💪';
    } else {
      trainingType = '👟';
    }
    // console.log(document.querySelector(`[aria-label="${date}"]`))
    const dateButton = document.querySelector(`[aria-label="${date}"]`).parentElement;
    const calorieDiv = document.createElement('div');
    const trainIconDiv = document.createElement('div');
    calorieDiv.classList.add('calorieCount');
    trainIconDiv.classList.add('trainIcon');
    trainIconDiv.innerText = trainingType
    calorieDiv.innerText = number + 'cal'
    dateButton.appendChild(calorieDiv);
    dateButton.appendChild(trainIconDiv);
  }

// const closingCalDiv = document.getElementsByClassName('react-calendar__month-view');

//  if (closingCalDiv[0]) {
//     closingCalDiv[0].parentElement.style = {height: "100%"}
//     console.log(closingCalDiv[0].parentElement.style)
//  }
function monthChecker (e) {
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];
  const date = e.activeStartDate;
  const curMonth = monthNames[date.getMonth()]
  console.log(curMonth + date.getFullYear())
  console.log("The current month is " + curMonth);
  setCalorieMonth((curMonth + date.getFullYear()));
}


  return (
    <div className='container'>
      <Calendar 
        onChange={setCurrentDay} 
        // value={value} 
        // activeStartDate={value}
        className='wrapper'
        onActiveStartDateChange={(e) => {monthChecker(e)}}
        tileClassName="whatever"
        onClickDay={(e, value) => {console.log(e, value)}}
      />

      <div>
        <h1>{currentDay.toDateString()}</h1>
        <div id="summary">
          <div id="selectedWorkOutPlan">
            <div className='planTitle'>
              <h2>Workout Plan</h2>
              {/* <IoIosAdd /> */}
            </div>
            {workoutCollection.map((item, i) => {
                return (
                  <div className="listContainer" key={i} >
                    <div>{item}</div>
                    <AiFillDelete />
                    <BiPencil />
                  </div>
                )
              })}
          </div>
          <div id="selectedMealPlan">
            <div className='planTitle'>
              <h2>Meal Plan</h2>
              {/* <IoIosAdd /> */}
            </div>
            {workoutCollection.map((item, i) => {
                return (
                  <div className="listContainer" key={i} >
                    <div>{item}</div>
                    <AiFillDelete />
                    <BiPencil />
                  </div>
                )
              })}
            </div>
        </div>
      </div>
    </div>
  );
}

export default CalendarPage;