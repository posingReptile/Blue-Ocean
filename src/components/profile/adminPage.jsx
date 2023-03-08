import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box, FormControl, Paper, Button, TextField, Stack, Typography, Table, TableHead, TableBody, TableRow, TableCell, TableContainer
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

/*
app analytics
  number of calorie goals completed
*/

function AdminPage(props) {
  const { goBack } = props;

  const [messageDate, setMessageDate] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [userCount, setUserCount] = useState(null);
  const [exerciseCount, setExerciseCount] = useState(null);

  function upDate(event) {
    const day = (event.$D > 10) ? event.$D : ('0' + event.$D);
    const month = ((event.$M + 1) > 10) ? (event.$M + 1) : ('0' + (event.$M + 1))
    const year = event.$y;

    if(new Date(event.$d) < new Date(Date.now())){
      setMessageDate(null);
      setClicked(true);
    } else setMessageDate(year + month + day);
  }

  function submitBannerMessage(event) {
    event.preventDefault();
    if (messageDateError) setClicked(true);
    else {
      if (clicked) setClicked(false);
      axios.post('http://localhost:3000/admin-message/', {
        message: event.target.elements.adminMessage.value,
        date: messageDate
      })
        .then(() => console.log('admin message posted'))
        .catch(() => console.log('failed to post message'));
    }
  }

  useEffect(() => {
    axios.get('http://localhost:3000/admin-users')
      .then(({data}) => {
        setUserCount(data[0].users);
        setExerciseCount(data[1].exercises);
      })
      .catch(() => console.log('failed to get admin data'));
  }, []);

  const messageDateError = (messageDate) ? false : true;

  return (
    <Box>
      <Button onClick={goBack} sx={{ display: 'flex', vertical: 'top', mb: 3 }}>
        <KeyboardBackspaceIcon />
      </Button>
      <form onSubmit={submitBannerMessage} style={{ minWidth: '100%' }}>
        <FormControl onSubmit={submitBannerMessage} sx={{ minWidth: '100%' }}>
          <Box sx={{ alignItems: 'right', textAlign: 'right' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="message date" onChange={upDate} disablePast required />
            </LocalizationProvider>
            {messageDateError && clicked && <div className="errorText">Enter a valid date</div>}
          </Box>
          <TextField id="adminMessage" label="message" variant="outlined" required />
          <Box direction="row" sx={{ textAlign: 'right', width: '100%', mt: 1 }}>
            {/* <Button variant="outlined">remove</Button> */}
            <Button variant="contained" type="submit">post</Button>
          </Box>
        </FormControl>
      </form>
      <TableContainer sx={{ mt: 3 }} component={Paper}>
        <Typography>
          Metrics
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">category</TableCell>
              <TableCell align="right">#</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="left">users</TableCell>
              <TableCell align="right">{userCount}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">workouts planned</TableCell>
              <TableCell align="right">{exerciseCount}</TableCell>
            </TableRow>
            {/* <TableRow>
              <TableCell align="left">completed calorie goals</TableCell>
              <TableCell align="right"># of completed calorie goals</TableCell>
            </TableRow> */}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default AdminPage;
