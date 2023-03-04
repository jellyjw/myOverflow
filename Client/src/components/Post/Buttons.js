import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function Buttons({ text, sx, className, onClick, style, type }) {
  return (
    <Button sx={sx} variant="outlined" size="medium" className={className} onClick={onClick} type={type}>
      {text}
    </Button>
  );
}
