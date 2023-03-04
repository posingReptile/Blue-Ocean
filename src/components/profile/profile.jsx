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
import {
  Avatar, Badge, Box, Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

// import '../css/profile.css';

// api or props?

function TableEntry(props) {
  const { str } = props;
  return (
    <Box sx={{ width: '100%' }}>
      <Typography>{str}</Typography>
    </Box>
  );
}
// we don't do proptypes
// TableEntry.propTypes = {
//   children: PropTypes.node,
//   str: PropTypes.string.isRequire,
// };


function Profile() {
  return (
    <Box>
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
        <Typography variant='h4'>username</Typography>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <TableEntry str="age" />
        <TableEntry str="" />
        <TableEntry str="weight" />

        <TableEntry str="height" />
        <TableEntry str="" />
        <TableEntry str="target weight" />
      </Box>

    </Box>
  );
}

export default Profile;
