import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";

function Snacks({
  open,
  handleClose,
  meal,
  meals,
  snacks,
  setSnacks,
  date,
  userId,
  foodId,
  foodS,
  setFoodS,
  onlySnacks,
  // dashRender,
  // setDashRender,
}) {
  const [input, setInput] = useState("");
  const [quantity, setQuantity] = useState("100g");

  const saveFood = (food, quantity, meal, index, event) => {
    if (meal === "Snacks") {
      setSnacks((prevState) => [
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
        setSnacks((prevState) => [
          ...prevState,
          { food: food, quantity: quantity, calories: cal, protein: pro },
        ]);
        setInput("");
        setQuantity("100g");
        alert("Successful input snacks");
        // setDashRender(!dashRender);
      })
      .catch(() => {
        alert("Error occured when entering snacks");
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

export default Snacks;

// const [snacks, setSnacks] = useState([]);
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
// }, [foodS, onlySnacks])

// const getFoods = () => {
//   axios.get(`http://localhost:3000/daily-meals?date=${date}&userId=${userId}`)
//     .then((res) => {
//       setFoodS(res.data)
//     })
// }

// useEffect(() => {
//   getFoods()
// }, [snacks])

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
//   const newList = [...snacks]
//   newList.splice(index, 1)
//   setSnacks(newList)
// }

// console.log('SNACKS', snacks)

// const deleteFood = () => {
//   const food_Id = { food_id: foodId }
//   axios.delete(`http://localhost:3000/delete-meal/${foodId}`)
//     .then((res) => {
//       console.log('Delete: ', res)
//     })
// }

// const editFood = () => {
//   axios.put(`http://localhost:3000/edit-meal/${foodId}`, )
//   .then((res) => {
//     console.log('Edit: ', res)
//   })
// }
