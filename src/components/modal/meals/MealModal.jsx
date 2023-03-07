import React from 'react';
import Form from './Form.jsx'
import Modal from '@mui/material/Modal';
import Dialog from '@mui/material/Dialog';


function MealModal ({open, handleClose}) {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true}>
      <Form open={open} handleClose={handleClose}/>
    </Dialog>
  )
}

export default MealModal;