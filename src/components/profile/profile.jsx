import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  const [isAdmin, setIsAdmin] = useState(true);
  const [openAdminPage, setOpenAdminPage] = useState(false);

  function onAdminClick() {
    setOpenAdminPage(!openAdminPage);
  }

  useEffect(() => {
    if (userID) {
      axios.get(`http://localhost:3000/profiles/${userID}/`)
        .then(({ data }) => {
          const userObj = data[0];
          setUsername(userObj.username);
          setAge(userObj.age);
          setHeightFt(userObj.height_feet);
          setHeightIn(userObj.height_inches);
          setWeight(userObj.weight);
          setTargetWeight(userObj.goal_weight);
          setCalorieGoal(userObj.calorie_goal);
          setTargetDate(((userObj.goal_date.split('T')[0]).split('-')).join(''));
        })
        .catch(() => console.log('failed to get profile info'))
    }
  }, [userID]);

  function onEdit() {
    setEditFields(!editFields);
  }
  function updateFields(event) {
    event.preventDefault();

    setAge(event.target.elements.age.value);
    setWeight(event.target.elements.weight.value);
    setHeightFt(event.target.elements.heightFt.value);
    setHeightIn(event.target.elements.heightIn.value);
    setTargetWeight(event.target.elements.targetWeight.value);
    const userInfo = {
      age,
      weight,
      height_feet: heightFt,
      height_inches: heightIn,
      goal_weight: targetWeight,
      goal_date: targetDate,
      calories: calorieGoal,
    };
    axios.post(`http://localhost:3000/profiles/${userID}`, userInfo)
      .then(() => onEdit())
      .catch(() => console.log('failed to update profile info'));
  }

  function upDate(event) {
    const day = (event.$D > 10) ? event.$D : ('0' + event.$D);
    const month = ((event.$M + 1) > 10) ? (event.$M + 1) : ('0' + (event.$M + 1))
    const year = event.$y;
    setTargetDate(year + month + day);
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
      {!(editFields) && (!openAdminPage) && (
        <Box>
          <Box>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={<EditIcon sx={{ color: 'action' }} onClick={onEdit} />}
            >
              <Avatar
                alt={username}
                src={profilePic}
                sx={{
                  width: 99,
                  height: 99
                }}
              />
            </Badge>
            <Typography variant='h4'>{username}</Typography>
          </Box>
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
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Avatar
              alt={username}
              src={profilePic}
              sx={{
                width: 99,
                height: 99,
                justifyContent: 'center'
              }}
            />
            <Typography variant='h4'>{username}</Typography>
          </Box>
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

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker label="goal date" disablePast onChange={upDate} />
                </LocalizationProvider>
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
      {(!openAdminPage) && (<PersonalRecords />)}
    </Box>
  );
}

export default Profile;
