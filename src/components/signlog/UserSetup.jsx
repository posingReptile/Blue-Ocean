import { useState, useEffect } from 'react'
import '../../css/LogSign.css'
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import imgUrl from './biceplogo.png'
import axios from 'axios';

function UserSetup({ setComponent, username, password }) {
  const [feet, setFeet] = useState(1);
  const [inches, setInches] = useState(0);
  const [age, setAge] = useState(0);
  const [weight, setWeight] = useState(0);
  const [goalWeight, setGoalWeight] = useState(0);
  const [weightError , setWeightError] = useState(false);
  const [goalWeightError, setGoalWeightError] = useState(false);
  const [goalWeightDate, setGoalWeightDate] = useState(0);
  const [ageError, setAgeError] = useState(false);
  const [calorieGoal, setCalorieGoal] = useState(0);

  const calculateCalorieGoal = () => {
    console.log(Date.now())
    let tempCalorieGoal = 0;
    const height = (feet * 12 + inches) * 2.54;
    const ageInYears = Math.floor(age / 31536000000);
    const metricWeight = weight * 0.453592;
    const metricGoalWeight = goalWeight * 0.453592;
    const weightDifference = metricWeight - metricGoalWeight;
    const weightDifferenceInDays = (goalWeightDate - Date.now()) / 86400000;
    const weightDifferencePerDay = weightDifference / weightDifferenceInDays;
    const caloriesPerDay = weightDifferencePerDay * 7700;
    console.log(caloriesPerDay)
    if (weightDifferencePerDay > 0) {
      tempCalorieGoal = 10 * metricWeight + 6.25 * height - 5 * ageInYears + 5 - caloriesPerDay;
    }
    setCalorieGoal(tempCalorieGoal)
  };

  useEffect(() => {
    let calorieGoal = 0;
    if (goalWeightDate > 0 && age > 0 && weight > 0 && goalWeight > 0 && feet > 1) {
      calorieGoal = calculateCalorieGoal();
    }
    console.log('calorieGoal: ', calorieGoal);
  }, [goalWeightDate, age, weight, goalWeight, feet]);



  const handleFeetChange = (event) => {
    setFeet(Number(event.target.value));
  };

  const handleInchesChange = (event) => {
    setInches(Number(event.target.value));
  };

  const handleAgeChange = (event) => {
    console.log(event.$d.valueOf())
    setAge(event.$d.valueOf());
  };

  const handleGoalDateChange = (event) => {
    console.log(event.$d.valueOf())
    setGoalWeightDate(event.$d.valueOf());
  };

  const handleWeightChange = (event) => {
    setWeight(Number(event.target.value));
  };

  const handleGoalWeightChange = (event) => {
    setGoalWeight(Number(event.target.value));
  };

  const validateForm = () => {

    let weightCheck = (weight <= 0 || typeof weight !== 'number' || isNaN(weight));
    let goalWeightCheck = (goalWeight <= 0 || typeof goalWeight !== 'number' || isNaN(goalWeight));
    let ageCheck = (age <= 0 || typeof age !== 'number' || isNaN(age));

    if(weight <= 0 || typeof weight !== 'number' || isNaN(weight)) {
      setWeightError(true);
    }
    if(goalWeight <= 0 || typeof goalWeight !== 'number' || isNaN(goalWeight)) {
      setGoalWeightError(true);
    }
    if(age <= 0 || typeof age !== 'number' || isNaN(age)) {
      setAgeError(true);
    }
    if(goalWeightDate <= 0 || typeof goalWeightDate !== 'number' || isNaN(age)) {
      setAgeError(true);
    }
    if(!weightCheck && !goalWeightCheck && !ageCheck) {
      axios.post('/new-user', {
        username: username,
        feet: feet,
        inches: inches,
        age: age,
        weight: weight,
        goalWeight: goalWeight,
        goal_date: goalWeightDate,
        calorie_goal: null,
      }).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.log(error);
      });
    }

    console.log('username: ', username);
    console.log('feet: ', feet);
    console.log('inches: ', inches);
    console.log('age: ', age);
    console.log('weight: ', weight);
    console.log('goalWeight: ', goalWeight);
    console.log('weightError: ', weightError);
    console.log('goalWeightError: ', goalWeightError);
    console.log('ageError: ', ageError);
  }


  const handleSubmit = () => {
    validateForm();
  }


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="loginOuterWrapper">
        <img src={imgUrl} style={{width:500, height:120}}/>
        <br/>
        <div className="loginFieldWrapper">
          <span className="heightText">{username}, please provide the following details</span><br/><br/>
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
        <div className="dateBox">
          <span className="heightText">Date of Birth </span>
          <DatePicker
        size="small"
        onChange={handleAgeChange}
        sx={{ml: 2}}
        renderInput={(params) => <TextField size="small" {...params}/>}
        {...ageError ? {error: true, helperText: 'Enter a valid date of birth'} : null}
        /><br/><br/>
        </div>
        <div className="goalBox">
          <span className="heightText">Goal Date</span>
        <DatePicker
        size="small"
        onChange={handleGoalDateChange}
        sx={{ml: 2}}
        renderInput={(params) => <TextField size="small" {...params}/>}
        /><br/><br/>
        </div>
        </div>
        {calorieGoal > 0 && goalWeight < weight && <span className="heightText">Your goal will be {Math.floor(calorieGoal)} calories daily.</span>}
        <br/><br/>
        <Button sx={{mr: 2}} onClick={() => handleSubmit()}>
          Submit
        </Button><br/>
      </div>
    </LocalizationProvider>
    )
}

export default UserSetup
