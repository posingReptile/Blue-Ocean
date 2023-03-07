import React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Form from './Form.jsx'
import MealModal from './MealModal.jsx'

function Meals() {

    const [openMM, setOpenMM] = useState(false);

    const handleOpen = () => {
        setOpenMM(true)
    }

    const handleClose = () => {
        setOpenMM(false)
    }

    return (
        <div>
            <Button variant='contained' color='primary' onClick={setOpenMM}>Add meal</Button>
            <MealModal open={openMM} handleClose={handleClose}/>
        </div>
    )
}

export default Meals;

    //   <Button variant="outlined" onClick={handleMM}>Add meal</Button>
    //   <Modal
    //     open={openMM}
    //     aria-labelledby="modal-modal-title"
    //     aria-describedby="modal-modal-description"
    //     sx={{height: 600, }}
    //   >
    //     <Meals/>
    //   </Modal>