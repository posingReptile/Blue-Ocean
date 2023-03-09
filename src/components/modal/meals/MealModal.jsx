import React from "react";
import Form from "./Form.jsx";
import Modal from "@mui/material/Modal";
import Dialog from "@mui/material/Dialog";

function MealModal({
  open,
  handleClose,
  userId,
  date,
  // dashRender,
  // setDashRender,
}) {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true}>
      <Form
        open={open}
        handleClose={handleClose}
        userId={userId}
        date={date}
        // dashRender={dashRender}
        // setDashRender={setDashRender}
      />
    </Dialog>
  );
}

export default MealModal;
