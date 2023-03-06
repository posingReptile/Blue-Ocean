import React, { useState } from "react";

import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function ExerciseItem({ type = "Strength" }) {
  const [showMore, setShowMore] = useState(false); // Shows the full details of the exercise clicked

  const handleAdd = (e) => {
    e.stopPropagation();
    setShowMore(false);
  };

  return (
    <>
      <ListItemButton onMouseDown={() => setShowMore(!showMore)}>
        <ListItemAvatar>
          <Avatar>
            <FitnessCenterIcon color="secondary" />
          </Avatar>
        </ListItemAvatar>
        <div>
          <ListItemText primary="test exercise 1" />
          <ListItemText secondary={`Type: ${type}`} />
          {showMore && (
            <>
              <ListItemText primary="Instructions here" />
              <div
                onMouseDown={(e) => e.stopPropagation()}
                style={{ marginTop: 10 }}
              >
                {type === "Strength" ? (
                  <div style={{ display: "flex", gap: 10 }}>
                    <TextField label="Weight (lbs)" variant="outlined" />
                    <TextField label="Sets" variant="outlined" />
                    <TextField label="Reps" variant="outlined" />
                  </div>
                ) : (
                  <div style={{ display: "flex", gap: 10 }}>
                    <TextField label="Intensity" variant="outlined" />
                    <TextField label="Duration" variant="outlined" />
                  </div>
                )}
                <Button
                  variant="contained"
                  size="large"
                  onMouseDown={(e) => handleAdd(e)}
                  sx={{ mt: 2 }}
                >
                  Add to workout
                </Button>
              </div>
            </>
          )}
        </div>
      </ListItemButton>
    </>
  );
}

export default ExerciseItem;
