import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import PersonalRecords from './personalRecords.jsx';
import AdminPage from './adminPage.jsx';
import defaultProfileImage from '../../assets/pfpic.png';
import {
  Avatar, Badge, Box, Button, FormControl, Stack, TextField, Typography
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import EditIcon from '@mui/icons-material/Edit';
import CastleIcon from '@mui/icons-material/Castle';
// import '../../css/profile.css';

function GridEntry(props) {
  const { label, gridValue } = props;
  return (
    <Box sx={{ mb: 1 }}>
      <Typography variant="overline" sx={{ display: 'block', fontWeight: 'bold', mb: 0.5 }}>
        {label}
      </Typography>
      <Typography>{gridValue}</Typography>
    </Box>
  );
}

function FormEntry(props) {
  const { identifier, formLabel, defaultValue, type, min, max, width } = props;
  return (
    <TextField
      variant="outlined"
      sx={{ mb: 1, width: width }}
      id={identifier}
      name={identifier}
      label={formLabel}
      defaultValue={defaultValue}
      type={type}
      inputProps={{
        min,
        max
      }}
      required
    />
  );
}

function Profile(props) {
  const { userID } = props;

  const [editFields, setEditFields] = useState(false);
  const [username, setUsername] = useState('');
  const [profilePic, setProfilePic] = useState(defaultProfileImage);
  const [heightFt, setHeightFt] = useState();
  const [heightIn, setHeightIn] = useState();
  const [weight, setWeight] = useState();
  const [targetWeight, setTargetWeight] = useState();
  const [targetDate, setTargetDate] = useState();
  const [age, setAge] = useState();
  const [calorieGoal, setCalorieGoal] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const [openAdminPage, setOpenAdminPage] = useState(false);
  const [pickerDate, setPickerDate] = useState(null);
  const [prs, setPRs] = useState([]);

  function onAdminClick() {
    setOpenAdminPage(!openAdminPage);
  }

  useEffect(() => {
    if (userID) {
      axios.get(`http://localhost:3000/profiles/${userID}/`)
        .then(({ data }) => {
          const userObj = data[0];
          setIsAdmin(userObj.isadmin);
          setUsername(userObj.username);
          setAge(userObj.age);
          setHeightFt(userObj.height_feet);
          setHeightIn(userObj.height_inches);
          setWeight(userObj.weight);
          setTargetWeight(userObj.goal_weight);
          setCalorieGoal(userObj.calorie_goal);
          setTargetDate(((userObj.goal_date.split('T')[0]).split('-')).join(''));
          setPickerDate(((userObj.goal_date.split('T')[0]).split('-')).join(''));
        })
        .then(() => axios.get(`http://localhost:3000/profiles/${userID}/personal-records`))
        .then(({ data }) => setPRs(data))
        .catch(() => console.log('failed to get profile info'))
    }
  }, [userID]);

  function onEdit() {
    setEditFields(!editFields);
  }

  function updateFields(event) {
    event.preventDefault();

    if (pickerDate) {
      const formWeight = Number(event.target.elements.weight.value);
      const formHeightFt = Number(event.target.elements.heightFt.value);
      const formHeightIn = Number(event.target.elements.heightIn.value);
      const formAge = Number(event.target.elements.age.value);
      const formTargetWeight = Number(event.target.targetWeight.value);

      // Calculate your BMR:
        // For men: BMR = 66 + (6.2 x weight in pounds) + (12.7 x height in inches) - (6.76 x age in years)
        // For women: BMR = 655.1 + (4.35 x weight in pounds) + (4.7 x height in inches) - (4.7 x age in years)
      // Determine your activity level factor:
        // Sedentary (little or no exercise) = 1.2
        // Lightly active (light exercise 1-3 days a week) = 1.375
        // Moderately active (moderate exercise 3-5 days a week) = 1.55
        // Very active (hard exercise 6-7 days a week) = 1.725
        // Extra active (very hard exercise, physical job or training twice a day) = 1.9

      const days = Math.ceil((dayjs(pickerDate) - dayjs()) / 86400000);
      const height = (formHeightFt * 12) + formHeightIn;
      const BMR = 66 + (6.2 * formWeight) + (12.7 * height) - (6.76 * formAge);
      const TDEE = BMR * 1.2;
      const weightDelta = formTargetWeight - formWeight;
      const calorieDiff = weightDelta * 3500;
      const goal = Math.floor((calorieDiff / days) + TDEE);

      setAge(formAge);
      setWeight(formWeight);
      setTargetWeight(formTargetWeight);
      setHeightFt(formHeightFt);
      setHeightIn(formHeightIn);
      setCalorieGoal(goal);
      setTargetDate(pickerDate);
      const userInfo = {
        age: formAge,
        weight: formWeight,
        height_feet: formHeightFt,
        height_inches: formHeightIn,
        goal_weight: formTargetWeight,
        goal_date: pickerDate,
        calorie_goal: goal,
      };
      axios.post(`http://localhost:3000/profiles/${userID}`, userInfo)
        .then(() => onEdit())
        .catch(() => console.log('failed to update profile info'));
    }
  }

  function upDate(event) {
    const day = (event.$D >= 10) ? event.$D : ('0' + event.$D);
    const month = ((event.$M + 1) >= 10) ? (event.$M + 1) : ('0' + (event.$M + 1))
    const year = event.$y;

    if (dayjs(event).isAfter(dayjs())){
      setPickerDate(year + month + day);
    } else {
      setPickerDate(null);
    }
  }

  const formattedDate = targetDate ? targetDate.substring(4, 6) + '/' + targetDate.substring(6) + '/' + targetDate.substring(0, 4) : '';

  return (
    <Box sx={{
      maxWidth: '700px',
      margin: '0 auto',
      padding: '2rem',
      textAlign: 'center',
    }}>
      {isAdmin && (!openAdminPage) && (
        <Button onClick={onAdminClick} sx={{ display: 'flex', vertical: 'top', color: 'red' }}>
          <CastleIcon />
        </Button>
      )}
      {openAdminPage && (<AdminPage goBack={onAdminClick} />)}
      {!openAdminPage && (
        <Box>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={<EditIcon onClick={onEdit} />}
          >
            <Avatar sx={{ width: 77, height: 77, fontSize: 50, textAlign: 'center' }}>{(username.charAt(0)).toUpperCase()}</Avatar>
            {/* <Avatar alt={username} src={profilePic} sx={{ width: 99, height: 99 }} /> */}
          </Badge>
          <Typography variant='h4'>{username}</Typography>
        </Box>
      )}
      {!(editFields) && (!openAdminPage) && (
        <Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <GridEntry gridValue={age + ' y.o.'} label="age" />
            <GridEntry gridValue={heightFt + '\'' + ' ' + heightIn + '"'} label="height"/>

            <GridEntry gridValue={weight + ' lbs'} label="current weight" />
            <GridEntry gridValue={targetWeight + ' lbs'} label="target weight" />

            <GridEntry gridValue={formattedDate} label="target date" />
            <GridEntry gridValue={calorieGoal + ' cals'} label="daily calorie goal" />
          </Box>
        </Box>
      )}

      {(editFields) && (!openAdminPage) && (
        <Box>
          <form onSubmit={updateFields}>
            <FormControl onSubmit={updateFields}>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
                <FormEntry identifier="age" formLabel="age" defaultValue={age} type="number" min="12" max="130" />
                <FormEntry identifier="weight" formLabel="weight" defaultValue={weight} type="number" min="60" max="666"/>

                <Stack direction="row">
                  <FormEntry identifier="heightFt" formLabel="ft" defaultValue={heightFt} type="number" min="4" max="8" width={1} />
                  <FormEntry identifier="heightIn" formLabel="in" defaultValue={heightIn} type="number" min="0" max="11" width={1} />
                </Stack>

                <FormEntry identifier="targetWeight" formLabel="target weight" defaultValue={targetWeight} type="number" min="60" max="666" />

                <Box>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="goal date" disablePast onChange={upDate} value={dayjs(pickerDate)} />
                    {!pickerDate && <div className="errorText">Enter a valid date</div>}
                  </LocalizationProvider>
                </Box>
                <GridEntry />

                <Box sx={{ textAlign: 'right', mr: 1, mt: 1}}>
                  <Button variant="outlined" onClick={onEdit}>
                    Cancel
                  </Button>
                </Box>
                <Box sx={{ textAlign: 'left', ml: 1, mt: 1 }}>
                  <Button type="submit" variant="contained">
                    Done
                  </Button>
                </Box>
              </Box>
            </FormControl>
          </form>
        </Box>
      )}
      {(!openAdminPage) && (<PersonalRecords prs={prs} />)}
    </Box>
  );
}

export default Profile;
