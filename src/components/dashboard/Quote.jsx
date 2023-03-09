import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import RefreshIcon from "@mui/icons-material/Refresh";

function Quote() {
  return (
    <Box
      sx={{
        marginTop: 5,
        marginBottom: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Typography
          sx={{ textAlign: "center", fontStyle: "italic", fontSize: 20 }}
        >
          "The only way to stop me from lifting is if I'm on my death bed, and
          even then I'll probably ask for a spotter."
        </Typography>
        <span style={{ marginLeft: 14 }}>{<RefreshIcon />}</span>
      </div>
    </Box>
  );
}

export default Quote;
