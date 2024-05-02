import { Box, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box
      sx={{
        background: "#BB8493",
        height: "70px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw", // Set width to 100vw for full viewport width
        position: "relative", // Change position to relative
        zIndex: 1000, // Ensure footer stays above other content
        borderTop: "1px solid #ccc", // Optional: Add a border at the top for separation
        left: "-70px", // Ensure left is set to 0
        right: "9000px", // Ensure right is set to 0
        bottom: 0, // Ensure bottom is set to 0
      }}
    >
      <Typography variant="h5" sx={{ color: "#fff" }}>
        © 2020 Copyright: Nepal Electronic Mart
      </Typography>
    </Box>
  );
};

export default Footer;
