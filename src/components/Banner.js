import React from "react";
import { Box, Typography } from "@mui/material";

const Banner = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "250px",
        backgroundImage: "url('/banner.png')", // Ruta absoluta
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Bienvenido a QuickVentory!
      </Typography>
      <img src="/images/logo.png" alt="Logo" className="banner-logo" />
    </Box>
  );
};

export default Banner;