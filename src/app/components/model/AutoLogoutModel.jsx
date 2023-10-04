import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { setDeleteAuthorize } from "../../helper/helperSlice";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  padding: "30px 10px",
  borderRadius: "10px",
};

export default function AutoLogoutModel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nextHandler = () => {
    dispatch(setDeleteAuthorize());
    navigate("/login");
    localStorage.clear();
  };
  return (
    <div>
      <Modal
        open={true}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableAutoFocus={true}
      >
        <Box sx={style}>
          <Stack
            direction={"column"}
            spacing={2}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box>
              <Typography
                id="modal-modal-title"
                color={"red"}
                variant="h5"
                component="h2"
              >
                Your account is Unauthorized!
              </Typography>
            </Box>
            <Box>
              <Button
                variant="outlined"
                color="error"
                onClick={nextHandler}
                sx={{
                  ":hover": { backgroundColor: "red" },
                }}
              >
                <Stack
                  alignItems={"center"}
                  direction={"row"}
                  justifyContent={"space-between"}
                  spacing={1}
                >
                  <Typography variant="body1"> Next</Typography>
                  <LogoutIcon />
                </Stack>
              </Button>
            </Box>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
