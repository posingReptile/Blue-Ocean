import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import RefreshIcon from "@mui/icons-material/Refresh";
import Pressable from "@mui/material/Button";
import axios from "axios";
import { useState, useEffect } from "react";


function AdminMessage( {adminMessage} ) {

  return (
    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <Typography sx={{ color: "red", textAlign: "center", fontStyle: "italic", fontSize: 20 }}>
        MESSAGE FROM SHREDDED ADMINS
      </Typography>
      <Typography sx={{ textAlign: "center", fontStyle: "italic", fontSize: 20 }}>
        {adminMessage}
      </Typography>
    </Box>
  )
}

export default AdminMessage;
