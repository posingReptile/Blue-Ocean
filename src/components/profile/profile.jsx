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
import React from 'react';
import defaultProfileImage from '../../assets/pfpic.png';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import EditIcon from '@mui/icons-material/Edit';

// import '../css/profile.css';

// api or props?

function Profile() {
  return (
    <Box>
      username
      <Box>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={
            <EditIcon sx={{ color: 'action' }}/>
          }
        >
          <Avatar
            alt="Travis Howard"
            src={defaultProfileImage}
            sx={{
              width: 99,
              height: 99
            }}
          />
        </Badge>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <Box sx={{ width: '100%' }}>
          <a>age</a>
        </Box>
        <Box sx={{ width: '100%' }}>
          <a></a>
        </Box>
        <Box sx={{ width: '100%' }}>
          <a>weight</a>
        </Box>

        <Box sx={{ width: '100%' }}>
          <a>height</a>
        </Box>
        <Box sx={{ width: '100%' }}>
          <a></a>
        </Box>
        <Box sx={{ width: '100%' }}>
          <a>target weight</a>
        </Box>
      </Box>


    </Box>
  );
}

export default Profile;
