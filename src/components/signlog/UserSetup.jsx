import { useState } from 'react'
import '../../css/LogSign.css'
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import imgUrl from './biceplogo.png'
import axios from 'axios';

function UserSetup({ setComponent }) {
  const [feet, setFeet] = useState(1);
  const [inches, setInches] = useState(0);
  const [age, setAge] = useState(0);
  const [weight, setWeight] = useState(0);
  const [goalWeight, setGoalWeight] = useState(0);
  const [weightError , setWeightError] = useState(false);
  const [goalWeightError, setGoalWeightError] = useState(false);
  const [ageError, setAgeError] = useState(false);

  const handleFeetChange = (event) => {
    setFeet(Number(event.target.value));
  };

  const handleInchesChange = (event) => {
    setInches(Number(event.target.value));
  };

  const handleAgeChange = (event) => {
    setAge(Number(event.target.value));
  };

  const handleWeightChange = (event) => {
    setWeight(Number(event.target.value));
  };

  const handleGoalWeightChange = (event) => {
    setGoalWeight(Number(event.target.value));
  };

  const validateForm = async () => {

    if (weight <= 0 || typeof weight !== 'number' || isNaN(weight)) {
      await setWeightError(true);
    } else {
      await setWeightError(false);
    }

    if (goalWeight <= 0 || typeof goalWeight !== 'number' || isNaN(goalWeight)) {
      await setGoalWeightError(true);
    } else {
      await setGoalWeightError(false);
    }

    if (age <= 0 || typeof age !== 'number' || isNaN(age) || age > 100) {
      await setAgeError(true);
    } else {
      await setAgeError(false);
    }

    if(weightError || goalWeightError || ageError) {
      axios.put('/login', {
        username: 'test',
        feet: feet,
        inches: inches,
        age: age,
        weight: weight,
        goalWeight: goalWeight,
      }).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
    }
  }


  const handleSubmit = () => {
    console.log('feet: ', feet);
    console.log('inches: ', inches);
    console.log('age: ', age);
    console.log('weight: ', weight);
    console.log('goalWeight: ', goalWeight);
    console.log('weightError: ', weightError);
    console.log('goalWeightError: ', goalWeightError);
    console.log('ageError: ', ageError);
    validateForm();
  }


  return (
      <div className="loginOuterWrapper">
        <img src={imgUrl} style={{width:500, height:120}}/>
        <br/>
        <div className="loginFieldWrapper">
          <div className="heightBox">
            <span className="heightText">Height</span>
            <FormControl sx={{width: '12%', mr: 1, ml: 1, mb: 1}} size="small">
              <InputLabel>Feet</InputLabel>
                <Select
                  value={feet}
                  label="Feet"
                  onChange={handleFeetChange}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{width: '12%', mb: 1}} size="small">
              <InputLabel>Inch</InputLabel>
                <Select
                  value={inches}
                  label="Inch"
                  onChange={handleInchesChange}
                >
                  <MenuItem value={0}>0</MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                  <MenuItem value={8}>8</MenuItem>
                  <MenuItem value={9}>9</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={11}>11</MenuItem>
              </Select>
            </FormControl>
          </div>
          <TextField
            InputProps={{
              endAdornment: <InputAdornment position="start">lb</InputAdornment>
            }}
            sx={{width: '35%', mb: 1}}
            id="outlined-basic"
            size="small"
            label="Weight"
            onChange={handleWeightChange}
            {...weightError ? {error: true, helperText: 'Enter a valid weight'} : null}
          />
          <br/>
          <TextField
            sx={{width: '35%', mb: 1}}
            id="outlined-basic"
            size="small"
            label="Age"
            onChange={handleAgeChange}
            {...ageError ? {error: true, helperText: 'Enter a valid age'} : null}
          />
          <br/>
          <TextField
            InputProps={{
              endAdornment: <InputAdornment position="start">lb</InputAdornment>
            }}
            sx={{width: '35%', mb: 1}}
            id="outlined-basic"
            size="small"
            label="Goal Weight"
            onChange={handleGoalWeightChange}
            {...goalWeightError ? {error: true, helperText: 'Enter a valid goal weight'} : null}
          />
          <br/>
        </div>
        <Button sx={{mr: 2}} onClick={() => handleSubmit()}>
          Submit
        </Button>
      </div>
    )
}

export default UserSetup
