import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";

export default function PatientAllergiesPopover({ allergies }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      {/* <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Open Popover
      </Button> */}
      <span
        style={{ cursor: "pointer", color: "green" }}
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
      >
        See More
      </span>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        PaperProps={{
          style: { width: "300px" }, // Set the desired width
        }}
      >
        <Typography sx={{ p: 2 }}>{allergies ?? "No Allergies"}</Typography>
      </Popover>
    </>
  );
}
