/*
recalculate targte calories on edit?
profile pic changes
*/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PersonalRecords from './personalRecords.jsx';
import defaultProfileImage from '../../assets/pfpic.png';
import {
  Avatar, Badge, Box, Button, FormControl, Stack, TextField, Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
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
  const { identifier, formLabel, defaultValue, type, min, max } = props;
  return (
    <TextField
      variant="outlined"
      sx={{ mb: 1 }}
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

function Profile() {
  const [editFields, setEditFields] = useState(false);
  const [username, setUsername] = useState('user');
  const [profilePic, setProfilePic] = useState(defaultProfileImage);
  const [heightFt, setHeightFt] = useState(10);
  const [heightIn, setHeightIn] = useState(12);
  const [weight, setWeight] = useState(666);
  const [targetWeight, setTargetWeight] = useState(777);
  const [age, setAge] = useState(999);
  const [calorieGoal, setCalorieGoal] = useState(2000);

  // useEffect(() => {
    // returns profile's age, weight, target weight, height, calorie goal
    //   axios.get(`/profiles/${profileID}/`)
    //     .then((data) => console.log(data))
    //     .catch(() => console.log('failed to get profile info'))

  // }, []);

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
    setCalorieGoal(event.target.elements.calorieGoal.value);
    const userInfo = {
      age,
      weight,
      height: (heightFt * 12) + heightIn,
      targetWeight,
      calorieGoal,
    };

    //   // update changed fields
    //   axios.post(`/profiles/${profileID}`, {
    //     age,
    //     weight,
    //     targetWeight,
    //     height,
    //     calorieGoal
    //   })
    //     .catch(() => console.log('failed to update profile info'))
    //  .finally(() => )
    setEditFields();
  }
  return (
    <Box sx={{
      maxWidth: '700px',
      margin: '0 auto',
      padding: '2rem',
      textAlign: 'center',
    }}>

      {!(editFields) && (
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
          </Box>
          <GridEntry gridValue={calorieGoal + ' cals'} label="daily calorie goal" />
        </Box>
      )}

      {(editFields) && (
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

                <Stack direction="row" spacing={2}>
                  <FormEntry identifier="heightFt" formLabel="ft" defaultValue={heightFt} type="number" min="4" max="8" />
                  <FormEntry identifier="heightIn" formLabel="in" defaultValue={heightIn} type="number" min="0" max="11" />
                </Stack>
                <FormEntry identifier="targetWeight" formLabel="target weight" defaultValue={targetWeight} type="number" min="60" max="666" />

                <GridEntry identifier=""/>

                <Stack direction="row" spacing={1} sxx={{ m: 'auto', minWidth: '100% ' }}>
                  <Button variant="outlined" onClick={onEdit} >
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained">
                    Done
                  </Button>
                </Stack>
              </Box>
            </FormControl>
          </form>
        </Box>
      )}
      <PersonalRecords />
    </Box>
  );
}

export default Profile;
