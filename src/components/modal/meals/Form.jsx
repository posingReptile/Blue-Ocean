import React from 'react';
import { useState, useEffect } from 'react';
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
  const [foodB, setFoodB] = useState([])

  const date = (new Date()).toISOString().split('T')[0].split('-').join('')
  const userId = 2
  const foodId = 16

  const handleSubmit = (event) => {
    event.preventDefault();
    handleClose()
    // const data = {}
    // axios.post(``, data)
  }

  // console.log("ALLL FOOODSSS", foodB)

  // console.log('BREAKFAST', breakfast)
  // console.log('LUNCH', lunch)
  // console.log('DINNER', dinner)
  // console.log('SNACKS', snacks)

  const breakfastMap = (arrFood) => {
    return arrFood.filter((food) => {
      if (food.category === 'Breakfast') {
        return food;
      }
    })
  }
  const lunchMap = (arrFood) => {
    return arrFood.filter((food) => {
      if (food.category === 'Lunch') {
        return food;
      }
    })
  }
  const dinnerMap = (arrFood) => {
    return arrFood.filter((food) => {
      if (food.category === 'Dinner') {
        return food;
      }
    })
  }
  const snackMap = (arrFood) => {
    return arrFood.filter((food) => {
      if (food.category === 'Snacks') {
        return food;
      }
    })
  }
  const onlyBreakfast = breakfastMap(foodB);

  const onlyLunch = lunchMap(foodB);
  const onlyDinner = dinnerMap(foodB);
  const onlySnacks = snackMap(foodB);

  // useEffect(() => {
  //   // getFoods()
  // },[])

  // console.log("onlyBreakfast= ======>", onlyBreakfast)
  // console.log("onlyLunch ======>", onlyLunch)
  // console.log("onlyDinner ======>", onlyDinner)
  // console.log("onlySnack ======>", onlySnack)
  // console.log(foodB)

  const handleRemoveItem = (index) => {
    const newList = [...breakfast]
    newList.splice(index, 1)
    setBreakfast(newList)
  }

  const deleteFood = (id) => {
    axios.delete(`http://localhost:3000/delete-meal/${id}`)
      .then((res) => {
        console.log('Delete: ', res)
      })
  }
  // console.log(breakfast)

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
        <Breakfast meal='Breakfast' breakfast={breakfast} setBreakfast={setBreakfast} date={date} userId={userId} foodId={foodId} foodB={foodB} setFoodB={setFoodB} onlyBreakfast={onlyBreakfast} />
        {onlyBreakfast.map((breakfastFood, index) => {
          return (
            <div>
              <div>{breakfastFood.name} {breakfastFood.quantity} g {breakfastFood.calories} calories {breakfastFood.protein} proteins</div>
              <Button variant="outlined" onClick={(e) => {
                // console.log(onlyBreakfast[index].food_id)
                deleteFood(onlyBreakfast[index].food_id);
                handleRemoveItem(index)
              }}>Delete</Button>
            </div>
          )
        })}
      </div>
      <div>
        <div>Lunch</div>
        <Lunch meal='Lunch' lunch={lunch} setLunch={setLunch} date={date} userId={userId} foodId={foodId} />
        {onlyLunch.map((lunchFood, index) => {
          return (
            <div>
              <div>{lunchFood.name} {lunchFood.quantity} g {lunchFood.calories} calories {lunchFood.protein} proteins</div>
              <Button variant="outlined" onClick={(e) => {
                // console.log(onlyLunch[index].food_id)
                deleteFood(onlyLunch[index].food_id);
                handleRemoveItem(index)
              }}>Delete</Button>
            </div>
          )
        })}
      </div>
      <div>
        <div>Dinner</div>
        <Dinner meal='Dinner' dinner={dinner} setDinner={setDinner} date={date} userId={userId} foodId={foodId} />
        {onlyDinner.map((dinnerFood, index) => {
          return (
            <div>
              <div>{dinnerFood.name} {dinnerFood.quantity} g {dinnerFood.calories} calories {dinnerFood.protein} proteins</div>
              <Button variant="outlined" onClick={(e) => {
                // console.log(onlyDinner[index].food_id)
                deleteFood(onlyDinner[index].food_id);
                handleRemoveItem(index)
              }}>Delete</Button>
            </div>
          )
        })}
      </div>
      <div>
        <div>Snacks</div>
        <Snacks meal='Snacks' snacks={snacks} setSnacks={setSnacks} date={date} userId={userId} foodId={foodId} />
        {onlySnacks.map((snacksFood, index) => {
          return (
            <div>
              <div>{snacksFood.name} {snacksFood.quantity} g {snacksFood.calories} calories {snacksFood.protein} proteins</div>
              <Button variant="outlined" onClick={(e) => {
                // console.log(onlySnacks[index].food_id)
                deleteFood(onlySnacks[index].food_id);
                handleRemoveItem(index)
              }}>Delete</Button>
            </div>
          )
        })}
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