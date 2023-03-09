import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";

function Lunch({
  open,
  handleClose,
  meal,
  meals,
  lunch,
  setLunch,
  date,
  userId,
  foodId,
  setFoodL,
  foodL,
  onlyLunch,
  rerender,
  setRerender,
  // dashRender,
  // setDashRender,
}) {
  const [input, setInput] = useState("");
  const [quantity, setQuantity] = useState("100g");

  const saveFood = (food, quantity, meal, index, event) => {
    if (meal === "Lunch") {
      setLunch((prevState) => [
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
        setLunch((prevState) => [
          ...prevState,
          { food: food, quantity: quantity, calories: cal, protein: pro },
        ]);
        setInput("");
        setQuantity("100g");
        alert("Successful input lunch");
        // setDashRender(!dashRender);
        setRerender(!rerender);
      })
      .catch(() => {
        alert("Error occured when entering lunch");
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

export default Lunch;

// const [lunch, setLunch] = useState([]);

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
// }, [foodL, onlyLunch])

// const getFoods = () => {
//   axios.get(`http://localhost:3000/daily-meals?date=${date}&userId=${userId}`)
//     .then((res) => {
//       setFoodL(res.data)
//     })
// }

// useEffect(() => {
//   getFoods()
// }, [lunch])

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
//   const newList = [...lunch]
//   newList.splice(index, 1)
//   setLunch(newList)
// }

// console.log('LUNCH', lunch)

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
