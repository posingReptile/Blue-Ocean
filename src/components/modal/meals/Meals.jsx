import React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Form from "./Form.jsx";
import MealModal from "./MealModal.jsx";

function Meals({
  userId,
  date,
  openMM,
  handleMealClose,
  rerender,
  setRerender,
}) {

  return (
    <div>
      <MealModal
        open={openMM}
        handleClose={handleMealClose}
        userId={userId}
        date={date}
        rerender={rerender}
        setRerender={setRerender}
      />
    </div>
  );
}

export default Meals;
