import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import ElectricCarIcon from "@mui/icons-material/ElectricCar";
import { keyframes } from "@mui/system";

const flash = keyframes`
  0% {
    color: inherit;
  }
  50% {
    color: yellow;
  }
  100% {
    color: red;
  }
`;

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#6e441e" }}>
      <Toolbar>
        <ElectricCarIcon
          sx={{
            mr: 2,
            animation: `${flash} 2s infinite alternate`,
          }}
        />
        <Typography variant="h6" component="div">
          Tesla Temperature Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
