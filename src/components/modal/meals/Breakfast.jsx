import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';

function Breakfast({ open, handleClose, meal, meals, breakfast, setBreakfast }) {
  // const [breakfast, setBreakfast] = useState([]);
  const [x, setX] = useState([{food: 'apple', quantity: '100g', calories: '53', protein: '1'},
  {food: 'banana', quantity: '100g', calories: '110', protein: '2'},
  {food: 'orange', quantity: '100g', calories: '80', protein: '1'}])

  const [inputList, setInputList] = useState([
    {
      input: "",
      quantity: '100g',
      input_rank: null
    }
  ])
  const [isDisabled, setIsDisabled] = useState(false)

  const handleListAdd = () => {
    setInputList([
      ...inputList,
      {
        input: "",
        quantity: '100g',
        input_rank: null
      }
    ])
  }

  useEffect(() => {
    if (inputList.length > 0) {
      inputList[inputList.length - 1].input === ""
        ? setIsDisabled(true)
        : setIsDisabled(false)
    }
  })

  useEffect(() => {
  }, [x])

  const handleInputChange = (event, index) => {
    const { value } = event.target
    const newInputList = [...inputList]
    newInputList[index].input = value
    newInputList[index].input_rank = index + 1
    setInputList(newInputList)
  }

  const handleQuantityChange = (event, index) => {
    const { value } = event.target
    const newInputList = [...inputList]
    newInputList[index].quantity = value
    setInputList(newInputList)
  }

  const handleRemoveItem = (index) => {
    const newList = [...x]
    newList.splice(index, 1)
    setX(newList)
  }

  const saveFood = (food, quantity, meal, index, event) => {
    if (meal === 'Breakfast') {
      setBreakfast(prevState => [...prevState, { 'food': food, 'quantity': quantity, 'calories': '', 'protein': '' }])
    }
        // axios.get(`/query=${quantity food}`)
    // .then((res) => {
    //setBreakfast(prevState => [...prevState, { 'food': food, 'quantity': quantity, 'calories': 'res.data.calories kcal', 'protein': 'res.data.proteins' }])
    // })
  }

  // console.log('BREAKFAST', breakfast)

  console.log('X: ', x)
  const saveX = (food, quantity, meal, index, event) => {
    if (meal === 'Breakfast') {
      setX(prevState => [...prevState, { 'food': food, 'quantity': quantity, 'calories': '', 'protein': '' }])
    }
  }

  return (
    <div>
      {inputList.length > 0
        ? inputList.map((input, index) => (
          <div key={index}>
            <TextField placeholder="food..." variant="filled" required sx={{
              margin: "1rem",
              width: "250px"
            }} onChange={(event) => handleInputChange(event, index)} />
            <TextField placeholder="quantity..." variant="filled" required sx={{
              margin: "1rem",
              width: "50px"
            }} onChange={(event) => handleQuantityChange(event, index)} />
            <Button variant="outlined" onClick={() => {
              // handleAddFood(inputList[index].input, inputList[index].quantity, meal, index);
              saveFood(inputList[index].input, inputList[index].quantity, meal, index)
              saveX(inputList[index].input, inputList[index].quantity, meal, index)
              // handleRemoveItem(index);
            }}>Add </Button>
            {/* <Button variant="outlined" onClick={() => handleRemoveItem(index)}>Delete</Button> */}
            <br />
          </div>
        )) : "No item in the list"
      }
       <div>
      {x.map((array, index) => {
        return (
          <div>
            {array.food} {array.quantity} {array.calories} {array.protein}
            <Button variant="outlined" onClick={() => handleRemoveItem(index)}>Delete</Button>
          </div>
        )
      })}
    </div>
      <Button variant="outlined" onClick={handleListAdd}>+</Button>
    </div>
  )
}

export default Breakfast;