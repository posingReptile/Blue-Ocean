import React from 'react';
import Form from './Form.jsx'
import Modal from '@mui/material/Modal';
import Dialog from '@mui/material/Dialog';


function MealModal ({open, handleClose, userId, date}) {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true}>
      <Form open={open} handleClose={handleClose} userId={userId} date={date}/>
    </Dialog>
  )
}

export default MealModal;