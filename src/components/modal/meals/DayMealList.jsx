import React, { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Fab from "@mui/material/Fab";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DayMealListItem from "./DayMealListItem";
import ExpandedMeal from "./ExpandedMeal";

const defaultDisplays = {
  list: true,
  breakfast: false,
  lunch: false,
  dinner: false,
  snacks: false,
};

const allDisplaysFalse = {
  list: false,
  breakfast: false,
  lunch: false,
  dinner: false,
  snacks: false,
};

function DayMealList({
  currDateInt,
  userID,
  breakfastCals,
  lunchCals,
  dinnerCals,
  snacksCals,
  showButtons,
  rerender,
  setShowEditButton,
}) {
  const [showList, setShowList] = useState(true);
  const [showExpanded, setShowExpanded] = useState(false);
  const [expandedType, setExpandedType] = useState("");

  const handleChangeDisplay = (mealType) => {
    setShowList(false);
    setShowExpanded(true);
    setShowEditButton(true);
    setExpandedType(mealType);
  };

  const handleShowList = () => {
    setShowList(true);
    setShowExpanded(false);
    setShowEditButton(false);
    setExpandedType("");
  };

  return (
    <>
      <Grid item xs={12} md={12} sx={{ mt: -2 }}>
        {showList ? (
          <List sx={{ pt: 3, ml: 4, mr: 4, height: 300, overflow: "auto" }}>
            <DayMealListItem
              mealName={"Breakfast"}
              handleChangeDisplay={handleChangeDisplay}
              calorieDisplay={breakfastCals}
            />
            <DayMealListItem
              mealName={"Lunch"}
              handleChangeDisplay={handleChangeDisplay}
              calorieDisplay={lunchCals}
            />
            <DayMealListItem
              mealName={"Dinner"}
              handleChangeDisplay={handleChangeDisplay}
              calorieDisplay={dinnerCals}
            />
            <DayMealListItem
              mealName={"Snacks"}
              handleChangeDisplay={handleChangeDisplay}
              calorieDisplay={snacksCals}
            />
          </List>
        ) : null}
        {showExpanded ? (
          <ExpandedMeal
            handleShowList={handleShowList}
            expandedType={expandedType}
            currDateInt={currDateInt}
            userID={userID}
            showButtons={showButtons}
            rerender={rerender}
          />
        ) : null}
      </Grid>
    </>
  );
}

export default DayMealList;
