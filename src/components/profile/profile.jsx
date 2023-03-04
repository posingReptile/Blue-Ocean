/*

info
image
user
weight
age
height
target weight

recalculate targte calories on edit?

buttons for redirect?
edit
prs

*/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import defaultProfileImage from '../../assets/pfpic.png';
import {
  Avatar, Badge, Box, Button, FormControl, Stack, TextField, Typography
} from '@mui/material';
// import CancelIcon from '@mui/icons-material/Cancel';
// import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
// import '../css/profile.css';

// api or props?

function GridEntry(props) {
  const { str } = props;
  return (
    <Box sx={{ width: '100%' }}>
      <Typography>{str}</Typography>
    </Box>
  );
}

function Profile() {
  const [editFields, setEditFields] = useState(false);
  const [username, setUsername] = useState('user');
  const [profilePic, setProfilePic] = useState(defaultProfileImage);
  const [height, setHeight] = useState('9');
  const [weight, setWeight] = useState('a lot');
  const [targetWeight, setTargetWeight] = useState('not a lot');
  const [age, setAge] = useState('old');
  const [calorieGoal, setCalorieGoal] = useState('few');

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
    setHeight(event.target.elements.height.value);
    setTargetWeight(event.target.elements.targetWeight.value);
    setCalorieGoal(event.target.elements.calorieGoal.value);
    const userInfo = {
      age,
      weight,
      height,
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
    //     .catch(() => console.log('failed to update profile info'));
  }
  return (
    <Box>

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
            <GridEntry str={age} />
            <GridEntry str={weight} />

            <GridEntry str={height} />
            <GridEntry str={targetWeight} />

            <GridEntry str="calorie goal" />
            <GridEntry str={calorieGoal} />
          </Box>
        </Box>
      )}

      {(editFields) && (
        <Box>
          <Box>
              <Avatar
                alt={username}
                src={profilePic}
                sx={{
                  width: 99,
                  height: 99
                }}
              />
            <Typography variant='h4'>{username}</Typography>
          </Box>
            <form onSubmit={updateFields}>
                <FormControl onSubmit={updateFields}>
                  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
                    <TextField
                      id="outlined"
                      name="age"
                      label="age"
                      defaultValue={age}
                    />
                    <TextField
                      id="outlined"
                      name="weight"
                      label="weight"
                      defaultValue={weight}
                    />

                    <TextField
                      id="outlined"
                      name="height"
                      label="height"
                      defaultValue={height}
                    />
                    <TextField
                      id="outlined"
                      name="targetWeight"
                      label="targetWeight"
                      defaultValue={targetWeight}
                    />

                    <GridEntry str=""/>
                    <TextField
                      id="outlined"
                      name="calorieGoal"
                      label="calorieGoal"
                      defaultValue={calorieGoal}
                    />

                    <Stack direction="row" spacing={2}>
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

    </Box>
  );
}

export default Profile;
