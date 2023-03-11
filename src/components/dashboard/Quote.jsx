import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import RefreshIcon from "@mui/icons-material/Refresh";
import Pressable from "@mui/material/Button";
import axios from "axios";
import { useState, useEffect } from "react";

const randomQuote = (quoteArray) => {
  return quoteArray[Math.floor(Math.random() * quoteArray.length)].quote_text;
};

function Quote({ curQuote, setCurQuote, quotes, setQuotes }) {

  useEffect(() => {
    axios.get("http://localhost:3000/quotes").then((res) => {
      setQuotes(res.data);
      if(curQuote.length === 0) {
        setCurQuote(randomQuote(res.data));
      }
    });
  }, []);


  return (
    <Box
      sx={{
        marginBottom: 4.8,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Typography
          sx={{ textAlign: "center", fontStyle: "italic", fontSize: 20 }}
        >
          {curQuote}
        </Typography>
            <RefreshIcon
              onClick={() => setCurQuote(randomQuote(quotes))}
              sx={{
                borderRadius: 10,
                ml: 2,
                backgroundColor: "primary.main",
                color: "white",
                "&:hover": {
                  color: "primary.main",
                  backgroundColor: "transparent"
                  }
                }}
            />
      </div>
    </Box>
  );
}

export default Quote;
