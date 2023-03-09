import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";

// const [breakfast, setBreakfast] = useState([]);
// const [x, setX] = useState([{food: 'apple', quantity: '100g', calories: '53', protein: '1'},
// {food: 'banana', quantity: '100g', calories: '110', protein: '2'},
// {food: 'orange', quantity: '100g', calories: '80', protein: '1'}])
// console.log('USERID: ', userId)
// const [allFood, setAllFood] = useState([]);

// const [inputList, setInputList] = useState([
//   {
//     input: "",
//     quantity: '100g',
//     input_rank: null
//   }
// ])
// const [isDisabled, setIsDisabled] = useState(false)

// const handleListAdd = () => {
//   setInputList([
//     ...inputList,
//     {
//       input: "",
//       quantity: '100g',
//       input_rank: null
//     }
//   ])
// }

// useEffect(() => {
//   if (inputList.length > 0) {
//     inputList[inputList.length - 1].input === ""
//       ? setIsDisabled(true)
//       : setIsDisabled(false)
//   }
// }, [foodB, onlyBreakfast])

// const getFoods = () => {
//   axios.get(`http://localhost:3000/daily-meals?date=${date}&userId=${userId}`)
//   .then((res) => {
//     setFoodB(res.data)
//   })
// }

// useEffect(() => {
//   getFoods()
// }, [breakfast])

// const handleInputChange = (event, index) => {
//   const { value } = event.target
//   const newInputList = [...inputList]
//   newInputList[index].input = value
//   newInputList[index].input_rank = index + 1
//   setInputList(newInputList)
// }

// const handleQuantityChange = (event, index) => {
//   const { value } = event.target
//   const newInputList = [...inputList]
//   newInputList[index].quantity = value
//   setInputList(newInputList)
// }

// const handleRemoveItem = (index) => {
//   const newList = [...breakfast]
//   newList.splice(index, 1)
//   setBreakfast(newList)
// }

// const deleteFood = () => {
//   const food_Id = {food_id: foodId}
//   axios.delete(`http://localhost:3000/delete-meal/${foodId}`)
//   .then((res)=> {
//     console.log('Delete: ', res)
//   })
// }

function Breakfast({
  open,
  handleClose,
  meal,
  meals,
  breakfast,
  setBreakfast,
  date,
  userId,
  foodId,
  foodB,
  setFoodB,
  onlyBreakfast,
  rerender,
  setRerender,
  // dashRender,
  // setDashRender,
}) {
  const [input, setInput] = useState("");
  const [quantity, setQuantity] = useState("100g");

  const saveFood = (food, quantity, meal, index, event) => {
    if (meal === "Breakfast") {
      setBreakfast((prevState) => [
        ...prevState,
        { food: food, quantity: quantity, calories: "", protein: "" },
      ]);
    }
    const query = `${quantity} ${food}`;
    axios
      .get(
        `http://localhost:3000/nutrition?food=${query}&date=${date}&userId=${userId}&category=${meal}`
      )
      .then((res) => {
        console.log("RES: ", res);
        let cal = res.data.calories;
        let pro = res.data.protein_g;
        setBreakfast((prevState) => [
          ...prevState,
          { food: food, quantity: quantity, calories: cal, protein: pro },
        ]);
        setInput("");
        setQuantity("100g");
        alert("Successful input breakfast");
        // setDashRender(!dashRender);
        setRerender(!rerender);
      })
      .catch(() => {
        alert("Error occured when entering breakfast");
      });
  };

  return (
    <div>
      <TextField
        placeholder="food..."
        ariant="filled"
        required
        sx={{
          margin: "1rem",
          width: "300px",
        }}
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />
      <TextField
        placeholder="grams..."
        variant="filled"
        required
        sx={{
          margin: "1rem",
          width: "100px",
        }}
        value={quantity}
        onChange={(event) => setQuantity(event.target.value)}
      />
      <Button
        variant="outlined"
        onClick={() => {
          saveFood(input, quantity, meal);
        }}
      >
        Add{" "}
      </Button>
      <br />
    </div>
  );
}

export default Breakfast;
