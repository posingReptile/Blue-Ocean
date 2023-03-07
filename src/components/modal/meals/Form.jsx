import React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
// import MealField from './MealField.jsx'
import axios from 'axios'
import Breakfast from './Breakfast.jsx'
import Lunch from './Lunch.jsx'
import Dinner from './Dinner.jsx'
import Snacks from './Snacks.jsx'



function Form({ open, handleClose }) {
  // const meals = ['Breakfast', 'Lunch', 'Dinner', 'Snacks']
  const [breakfast, setBreakfast] = useState('');
  const [lunch, setLunch] = useState('');
  const [dinner, setDinner] = useState('');
  const [snacks, setSnacks] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    handleClose()
    // const data = {}
    // axios.post(``, data)
  }

  console.log('BREAKFAST', breakfast)
  console.log('LUNCH', lunch)
  console.log('DINNER', dinner)
  console.log('SNACKS', snacks)

  return (
    <form onSubmit={handleSubmit} style={{
      display: "flex",
      flexDirection: "column",
      justifyContext: "center",
      alignItems: "center",
      padding: "2rem",
    }}>
      <div>
        <div>Breakfast</div>
          <Breakfast meal='Breakfast' breakfast={breakfast} setBreakfast={setBreakfast}/>
      </div>
      <div>
        <div>Lunch</div>
          <Lunch meal='Lunch' lunch={lunch} setLunch={setLunch}/>
      </div>
      <div>
        <div>Dinner</div>
          <Dinner meal='Dinner' dinner={dinner} setDinner={setDinner}/>
      </div>
      <div>
        <div>Snacks</div>
          <Snacks meal='Snacks' snacks={snacks} setSnacks={setSnacks}/>
      </div>
      <div>
        <Button variant="outlined" color="primary" sx={{ margin: "2rem" }}>Cancel</Button>
        <Button variant="outlined" color="primary" sx={{ margin: "2rem" }}>Submit</Button>
      </div>
    </form>
  )
}

export default Form;


      {/* {meals.map((meal) => {
          return(
          <div>
            <div>{meal}</div>
            <TextField placeholder="food..." variant="filled" required sx={{margin: "1rem",
    width:"300px"}} value={food} onChange={(event) => setFood(event.target.value)}/>
          </div>

          )
        })} */}
      {/* <div>
        {meals.map((meal, index) => {
          return (
            <MealField key={index} meal={meal} meals={meals}/>
          )
        })}

      </div> */}