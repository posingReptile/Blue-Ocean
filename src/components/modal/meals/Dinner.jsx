import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';


function Dinner({ open, handleClose, meal, meals, dinner, setDinner, date, userId, foodId }) {
  // const [dinner, setDinner] = useState([]);

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
  }, [dinner])

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
    const newList = [...dinner]
    newList.splice(index, 1)
    setDinner(newList)
  }

  const saveFood = (food, quantity, meal, index, event) => {
    if (meal === 'Dinner') {
      setDinner(prevState => [...prevState, { 'food': food, 'quantity': quantity, 'calories': '', 'protein': '' }])
    }
    const query = `${quantity} ${food}`

    axios.get(`http://localhost:3000/nutrition?food=${query}&date=${date}&userId=${userId}&category=${meal}`)
      .then((res) => {
        console.log('RES: ', res)
        let cal = res.data.calories
        let pro = res.data.protein_g

        setDinner(prevState => [...prevState, { 'food': food, 'quantity': quantity, 'calories': cal, 'protein': pro }])
      })
  }
  // console.log('DINNER', dinner)

  const getFoods = () => {
    axios.get(`http://localhost:3000/daily-meals?date=${date}&userId=${userId}`)
      .then((res) => {
        console.log('Get: ', res)
      })
  }

  const deleteFood = () => {
    const food_Id = { food_id: foodId }
    axios.delete(`http://localhost:3000/delete-meal/${foodId}`)
      .then((res) => {
        console.log('Delete: ', res)
      })
  }

  // const editFood = () => {
  //   axios.put(`http://localhost:3000/edit-meal/${foodId}`, )
  //   .then((res) => {
  //     console.log('Edit: ', res)
  //   })
  // }

  return (
    <div>
      {inputList.length > 0
        ? inputList.map((input, index) => (
          <div key={index}>
            <TextField placeholder="food..." variant="filled" required sx={{
              margin: "1rem",
              width: "300px"
            }} onChange={(event) => handleInputChange(event, index)} />
            <TextField placeholder="grams..." variant="filled" required sx={{
              margin: "1rem",
              width: "100px"
            }} onChange={(event) => handleQuantityChange(event, index)} />
            <Button variant="outlined" onClick={() => {
              // handleAddFood(inputList[index].input, inputList[index].quantity, meal, index);
              saveFood(inputList[index].input, inputList[index].quantity, meal, index)
              handleRemoveItem(index);
            }}>Add </Button>
            {/* <Button variant="outlined" onClick={() => handleRemoveItem(index)}>Delete</Button> */}
            <br />
          </div>
        )) : "No item in the list"
      }
      {/* <div>
        {dinner.length > 0 ?
          dinner.map((array, index) => {
            return (
              <div>
                {array.food} {array.quantity} {array.calories} {array.protein}
                <Button variant="outlined" onClick={() => handleRemoveItem(index)}>Delete</Button>
              </div>
            )
          })
          : null}
      </div> */}
      <Button variant="outlined" onClick={handleListAdd}>+</Button>
    </div>
  )
}

export default Dinner;