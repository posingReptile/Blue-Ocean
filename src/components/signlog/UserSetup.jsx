import { useState, useEffect } from 'react'
import '../../css/LogSign.css'
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import imgUrl from './biceplogo.png'
import axios from 'axios';

function UserSetup({ setUserObject, setComponent, setLoginComponent, username, password }) {
  const [feet, setFeet] = useState(1);
  const [inches, setInches] = useState(0);
  const [age, setAge] = useState(0);
  const [weight, setWeight] = useState(0);
  const [goalWeight, setGoalWeight] = useState(0);
  const [weightError , setWeightError] = useState(false);
  const [goalWeightError, setGoalWeightError] = useState(false);
  const [goalWeightDate, setGoalWeightDate] = useState(0);
  const [ageError, setAgeError] = useState(false);
  const [goalDateError, setGoalDateError] = useState(false);
  const [calorieGoal, setCalorieGoal] = useState(0);

  const calculateCalorieGoal = () => { //Calculates calorie goal
    let tempCalorieGoal = 0;
    const height = (feet * 12 + inches) * 2.54;
    const ageInYears = Math.floor(age / 31536000000);
    const metricWeight = weight * 0.453592;
    const metricGoalWeight = goalWeight * 0.453592;
    const weightDifference = metricWeight - metricGoalWeight;
    const weightDifferenceInDays = (goalWeightDate - Date.now()) / 86400000;
    const weightDifferencePerDay = weightDifference / weightDifferenceInDays;
    const caloriesPerDay = weightDifferencePerDay * 7700;
    if (weightDifferencePerDay > 0) {
      tempCalorieGoal = 10 * metricWeight + 6.25 * height - 5 * ageInYears + 5 - caloriesPerDay;
    }
    setCalorieGoal(tempCalorieGoal)
  };

  useEffect(() => {
    let calorieGoal = 0;
    if (goalWeightDate > 0 && age > 0 && weight > 0 && goalWeight > 0 && feet > 1) { //Checks if all fields are filled out
      calorieGoal = calculateCalorieGoal();
    }
  }, [goalWeightDate, age, weight, goalWeight, feet]);


  const handleFeetChange = (event) => {
    setFeet(Number(event.target.value));
  };

  const handleInchesChange = (event) => {
    setInches(Number(event.target.value));
  };

  const handleAgeChange = (event) => {
    setAge(event.$d.valueOf());
  };

  const handleGoalDateChange = (event) => {
    setGoalWeightDate(event.$d.valueOf());
  };

  const handleWeightChange = (event) => {
    setWeight(Number(event.target.value));
  };

  const handleGoalWeightChange = (event) => {
    setGoalWeight(Number(event.target.value));
  };

  const validateForm = () => { //Validates form

    let weightCheck = (weight <= 0 || typeof weight !== 'number' || isNaN(weight));
    let goalWeightCheck = (goalWeight <= 0 || typeof goalWeight !== 'number' || isNaN(goalWeight));
    let ageCheck = (age >= Date.now() || typeof age !== 'number' || isNaN(age) || age === 0);
    let goalDateCheck = (goalWeightDate <= Date.now() || typeof goalWeightDate !== 'number' || isNaN(goalWeightDate));

    if(weight <= 0 || typeof weight !== 'number' || isNaN(weight)) { //If weight is invalid
      setWeightError(true);
    } else {
      setWeightError(false);
    }
    if(goalWeight <= 0 || typeof goalWeight !== 'number' || isNaN(goalWeight)) { //If goal weight is invalid
      setGoalWeightError(true);
    } else {
      setGoalWeightError(false);
    }
    if(age >= Date.now() || age === 0) { //If age is in the future
      setAgeError(true);
    } else {
      setAgeError(false);
    }
    if(goalWeightDate <= Date.now()) { //If goal date is before today
      setGoalDateError(true);
    } else {
      setGoalDateError(false);
    }

    if(!weightCheck && !goalWeightCheck && !ageCheck && !goalDateCheck) { //If all fields are valid
      axios.post(`http://localhost:3000/new-user`, {
        username: username,
        password: password,
        height_feet: feet,
        height_inches: inches,
        age:  Math.floor(age / 31536000000),
        weight: weight,
        goal_weight: goalWeight,
        goal_date: new Date(goalWeightDate),
        calories: Math.floor(calorieGoal),
        isadmin: false,
      }).then((response) => {
        if(response.data.user_id) {
          setUserObject(response.data);
          setComponent('dashboard');
        } else if (response.data === 'USER EXISTS') {
          alert('Username Taken');
          setLoginComponent('logsign')
        }
      }).catch((error) => {
        console.log(error);
      });
    }
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
          <Typography sx={{color: "primary.main"}}>{username}, please provide the following details<br/><br/></Typography>
          <div className="heightBox">
          <Typography sx={{mb: 1, color: "primary.main"}}>HEIGHT</Typography>
            <FormControl sx={{width: '45%', mr: 1, ml: 1, mb: 1}} size="small">
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
            <FormControl sx={{width: '53%', mb: 1}} size="small">
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
            sx={{width: '45%', mb: 1}}
            id="outlined-basic"
            size="small"
            label="Weight"
            onChange={handleWeightChange}
            {...weightError ? {error: true, helperText: 'Enter a valid weight'} : null}
          />
          <TextField
            InputProps={{
              endAdornment: <InputAdornment position="start">lb</InputAdornment>
            }}
            sx={{width: '45%', mb: 1}}
            id="outlined-basic"
            size="small"
            label="Goal Weight"
            onChange={handleGoalWeightChange}
            {...goalWeightError ? {error: true, helperText: 'Enter a valid goal weight'} : null}
          />
        <div className="dateBox">
          <Typography sx={{color: "primary.main"}}>DATE OF BIRTH</Typography>
          <DatePicker
        size="small"
        onChange={handleAgeChange}
        sx={{ml: 2}}
        />
        </div>
        {ageError && <span className="errorText">Enter a valid date of birth</span>}
        <div className="goalBox">
          <Typography sx={{color: "primary.main"}}>GOAL DATE</Typography>
        <DatePicker
        size="small"
        onChange={handleGoalDateChange}
        sx={{ml: 2}}
        />
        <br/>
        </div>
        </div>
        {goalDateError && <span className="errorText">Enter a valid goal date</span>}
        {calorieGoal > 0 && goalWeight < weight && <Typography sx={{color : "primary.main"}}>Your goal will be {Math.floor(calorieGoal)} calories daily.</Typography>}
        <br/>
        <Button
        variant="outlined"
        sx={{
          mb: 1,
          backgroundColor: "primary.main",
          color: "white",
          '&:hover': {
            backgroundColor: '#fff',
            color: '#3c52b2',
        },
        }}
        onClick={() => handleSubmit()}>
          Submit
        </Button><br/>
      </div>
    </LocalizationProvider>
    )
}

export default UserSetup
