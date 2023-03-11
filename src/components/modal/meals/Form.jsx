import React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { TextField, Alert } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Breakfast from "./Breakfast.jsx";
import Lunch from "./Lunch.jsx";
import Dinner from "./Dinner.jsx";
import Snacks from "./Snacks.jsx";
import MealTable from "./MealModal.jsx";


function Form({
  open,
  handleClose,
  userId,
  date,
  rerender,
  setRerender,
}) {
  const [breakfast, setBreakfast] = useState("");
  const [lunch, setLunch] = useState("");
  const [dinner, setDinner] = useState("");
  const [snacks, setSnacks] = useState("");
  const [foodB, setFoodB] = useState([]);
  const [foodL, setFoodL] = useState([]);
  const [foodD, setFoodD] = useState([]);
  const [foodS, setFoodS] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleAlert = () => {
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  const handleError = () => {
    setShowError(true);

    setTimeout(() => {
      setShowError(false);
    }, 2000);
  };

  const foodId = 16;

  const handleSubmit = (event) => {
    event.preventDefault();
    handleClose();
  };

  const breakfastMap = (arrFood) => {
    return arrFood.filter((food) => {
      if (food.category === "Breakfast") {
        return food;
      }
    });
  };
  const lunchMap = (arrFood) => {
    return arrFood.filter((food) => {
      if (food.category === "Lunch") {
        return food;
      }
    });
  };
  const dinnerMap = (arrFood) => {
    return arrFood.filter((food) => {
      if (food.category === "Dinner") {
        return food;
      }
    });
  };
  const snackMap = (arrFood) => {
    return arrFood.filter((food) => {
      if (food.category === "Snacks") {
        return food;
      }
    });
  };

  const onlyBreakfast = breakfastMap(foodB);
  const onlyLunch = lunchMap(foodL);
  const onlyDinner = dinnerMap(foodD);
  const onlySnacks = snackMap(foodS);

  console.log("onlyBreakfast= ======>", onlyBreakfast);

  const handleRemoveB = (index) => {
    const newList = [...breakfast];
    newList.splice(index, 1);
    setBreakfast(newList);
  };
  const handleRemoveL = (index) => {
    const newList = [...lunch];
    newList.splice(index, 1);
    setLunch(newList);
  };
  const handleRemoveD = (index) => {
    const newList = [...dinner];
    newList.splice(index, 1);
    setDinner(newList);
  };
  const handleRemoveS = (index) => {
    const newList = [...snacks];
    newList.splice(index, 1);
    setSnacks(newList);
  };

  const deleteFood = (id) => {
    axios.delete(`http://localhost:3000/delete-meal/${id}`).then((res) => {
      console.log("Delete: ", res);
    });
  };
  // console.log(breakfast)

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContext: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <div>
        {showAlert && (
          <Alert
            severity="success"
            sx={{ position: "absolute", top: 2, right: 1, left: 1 }}
          >
            <Typography
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "500px",
              }}
            >
              {`Item added! :)`}
            </Typography>
          </Alert>
        )}
        {showError && (
          <Alert
            severity="error"
            sx={{ position: "absolute", top: 2, right: 1, left: 1 }}
          >
            <Typography
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "500px",
              }}
            >
              {`Item not found :(`}
            </Typography>
          </Alert>
        )}
        <Typography variant="h6" sx={{ ml: 2, mt: 3 }}>
          Breakfast
        </Typography>
        <Breakfast
          meal="Breakfast"
          breakfast={breakfast}
          setBreakfast={setBreakfast}
          date={date}
          userId={userId}
          foodId={foodId}
          foodB={foodB}
          setFoodB={setFoodB}
          onlyBreakfast={onlyBreakfast}
          rerender={rerender}
          setRerender={setRerender}
          handleAlert={handleAlert}
          handleError={handleError}
          // dashRender={dashRender}
          // setDashRender={setDashRender}
        />
      </div>
      <div>
        <Typography variant="h6" sx={{ ml: 2 }}>
          Lunch
        </Typography>
        <Lunch
          meal="Lunch"
          lunch={lunch}
          setLunch={setLunch}
          date={date}
          userId={userId}
          foodId={foodId}
          foodL={foodL}
          setFoodL={setFoodL}
          onlyLunch={onlyLunch}
          rerender={rerender}
          setRerender={setRerender}
          handleAlert={handleAlert}
          handleError={handleError}
          // dashRender={dashRender}
          // setDashRender={setDashRender}
        />
      </div>
      <div>
        <Typography variant="h6" sx={{ ml: 2 }}>
          Dinner
        </Typography>
        <Dinner
          meal="Dinner"
          dinner={dinner}
          setDinner={setDinner}
          date={date}
          userId={userId}
          foodId={foodId}
          foodD={foodD}
          setFoodD={setFoodD}
          onlyDinner={onlyDinner}
          rerender={rerender}
          setRerender={setRerender}
          handleAlert={handleAlert}
          handleError={handleError}
          // dashRender={dashRender}
          // setDashRender={setDashRender}
        />
      </div>
      <div>
        <Typography variant="h6" sx={{ ml: 2 }}>
          Snacks
        </Typography>
        <Snacks
          meal="Snacks"
          snacks={snacks}
          setSnacks={setSnacks}
          date={date}
          userId={userId}
          foodId={foodId}
          foodS={foodS}
          setFoodS={setFoodS}
          onlySnacks={onlySnacks}
          rerender={rerender}
          setRerender={setRerender}
          handleAlert={handleAlert}
          handleError={handleError}
          // dashRender={dashRender}
          // setDashRender={setDashRender}
        />
      </div>
      <Button
        variant="outlined"
        color="primary"
        sx={{ margin: "2rem" }}
        onClick={handleClose}
      >
        Done
      </Button>
    </form>
  );
}

export default Form;

{
  /* {meals.map((meal) => {
          return(
          <div>
            <div>{meal}</div>
            <TextField placeholder="food..." variant="filled" required sx={{margin: "1rem",
    width:"300px"}} value={food} onChange={(event) => setFood(event.target.value)}/>
          </div>

          )
        })} */
}
{
  /* <div>
        {meals.map((meal, index) => {
          return (
            <MealField key={index} meal={meal} meals={meals}/>
          )
        })}

      </div> */
}
