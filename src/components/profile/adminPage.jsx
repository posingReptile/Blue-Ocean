import React, { useState } from 'react';
import { Box, Paper, Button, TextField, Stack, Typography, Table, TableHead, TableBody, TableRow, TableCell, TableContainer } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
/*
app analytics
  # of users, workouts planned,
  number of calorie goals completed
  ability to post custom daily messages / announcements
*/

function AdminPage(props) {
  const { goBack } = props;
  const [bannerMessage, setBannerMessage] = useState('');

  return (
    <Box>
      <Button onClick={goBack} sx={{ display: 'flex', vertical: 'top', mb: 3 }}>
          <KeyboardBackspaceIcon />
      </Button>
      <Stack direction="row" sx={{ display: 'flex', justifyContent: 'left', alignItems: 'left', flexDirection: 'column' }}>
        <TextField id="admin-message" label="new banner message" variant="outlined" />
        <Button variant="outlined">remove</Button>
        <Button variant="contained">post</Button>
      </Stack>
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
              <TableCell align="right"># of users</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">workouts planned</TableCell>
              <TableCell align="right"># of workouts planned</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left">completed calorie goals</TableCell>
              <TableCell align="right"># of completed calorie goals</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default AdminPage;
