import React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
// import MealField from './MealField.jsx'
import axios from "axios";
import Breakfast from "./Breakfast.jsx";
import Lunch from "./Lunch.jsx";
import Dinner from "./Dinner.jsx";
import Snacks from "./Snacks.jsx";

import MealTable from "./MealModal.jsx";

function Form({
  open,
  handleClose,
  userId,
  date,
  // dashRender, setDashRender
}) {
  // const meals = ['Breakfast', 'Lunch', 'Dinner', 'Snacks']
  const [breakfast, setBreakfast] = useState("");
  const [lunch, setLunch] = useState("");
  const [dinner, setDinner] = useState("");
  const [snacks, setSnacks] = useState("");
  const [foodB, setFoodB] = useState([]);
  const [foodL, setFoodL] = useState([]);
  const [foodD, setFoodD] = useState([]);
  const [foodS, setFoodS] = useState([]);

  console.log(breakfast);
  // const date = (new Date()).toISOString().split('T')[0].split('-').join('')
  // const userId = 2
  const foodId = 16;

  const handleSubmit = (event) => {
    event.preventDefault();
    handleClose();
  };

  // console.log("ALLL FOOODSSS", foodB)

  // console.log('BREAKFAST', breakfast)
  // console.log('LUNCH', lunch)
  // console.log('DINNER', dinner)
  // console.log('SNACKS', snacks)

  const breakfastMap = (arrFood) => {
    return arrFood.filter((food) => {
      if (food.category === "Breakfast") {
        return food;
      }
    });
  };
  const lunchMap = (arrFood) => {
    return arrFood.filter((food) => {
      if (food.category === "Lunch") {
        return food;
      }
    });
  };
  const dinnerMap = (arrFood) => {
    return arrFood.filter((food) => {
      if (food.category === "Dinner") {
        return food;
      }
    });
  };
  const snackMap = (arrFood) => {
    return arrFood.filter((food) => {
      if (food.category === "Snacks") {
        return food;
      }
    });
  };

  const onlyBreakfast = breakfastMap(foodB);
  const onlyLunch = lunchMap(foodL);
  const onlyDinner = dinnerMap(foodD);
  const onlySnacks = snackMap(foodS);

  console.log("onlyBreakfast= ======>", onlyBreakfast);

  const handleRemoveB = (index) => {
    const newList = [...breakfast];
    newList.splice(index, 1);
    setBreakfast(newList);
  };
  const handleRemoveL = (index) => {
    const newList = [...lunch];
    newList.splice(index, 1);
    setLunch(newList);
  };
  const handleRemoveD = (index) => {
    const newList = [...dinner];
    newList.splice(index, 1);
    setDinner(newList);
  };
  const handleRemoveS = (index) => {
    const newList = [...snacks];
    newList.splice(index, 1);
    setSnacks(newList);
  };

  const deleteFood = (id) => {
    axios.delete(`http://localhost:3000/delete-meal/${id}`).then((res) => {
      console.log("Delete: ", res);
    });
  };
  // console.log(breakfast)

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContext: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <div>
        <div>Breakfast</div>
        <Breakfast
          meal="Breakfast"
          breakfast={breakfast}
          setBreakfast={setBreakfast}
          date={date}
          userId={userId}
          foodId={foodId}
          foodB={foodB}
          setFoodB={setFoodB}
          onlyBreakfast={onlyBreakfast}
          // dashRender={dashRender}
          // setDashRender={setDashRender}
        />
      </div>
      <div>
        <div>Lunch</div>
        <Lunch
          meal="Lunch"
          lunch={lunch}
          setLunch={setLunch}
          date={date}
          userId={userId}
          foodId={foodId}
          foodL={foodL}
          setFoodL={setFoodL}
          onlyLunch={onlyLunch}
          // dashRender={dashRender}
          // setDashRender={setDashRender}
        />
      </div>
      <div>
        <div>Dinner</div>
        <Dinner
          meal="Dinner"
          dinner={dinner}
          setDinner={setDinner}
          date={date}
          userId={userId}
          foodId={foodId}
          foodD={foodD}
          setFoodD={setFoodD}
          onlyDinner={onlyDinner}
          // dashRender={dashRender}
          // setDashRender={setDashRender}
        />
      </div>
      <div>
        <div>Snacks</div>
        <Snacks
          meal="Snacks"
          snacks={snacks}
          setSnacks={setSnacks}
          date={date}
          userId={userId}
          foodId={foodId}
          foodS={foodS}
          setFoodS={setFoodS}
          onlySnacks={onlySnacks}
          // dashRender={dashRender}
          // setDashRender={setDashRender}
        />
      </div>
      <Button
        variant="outlined"
        color="primary"
        sx={{ margin: "2rem" }}
        onClick={handleClose}
      >
        Done
      </Button>
    </form>
  );
}

export default Form;

{
  /* {meals.map((meal) => {
          return(
          <div>
            <div>{meal}</div>
            <TextField placeholder="food..." variant="filled" required sx={{margin: "1rem",
    width:"300px"}} value={food} onChange={(event) => setFood(event.target.value)}/>
          </div>

          )
        })} */
}
{
  /* <div>
        {meals.map((meal, index) => {
          return (
            <MealField key={index} meal={meal} meals={meals}/>
          )
        })}

      </div> */
}
