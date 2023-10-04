import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, Stack } from "@mui/material";
// import MkButton from "../../assets/theme/MkButton";
// import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { clearLocalStorage } from "../../utils/localStorage";
import { useNavigate } from "react-router-dom";

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

export default function LogoutAlert({ openAlert, setOpenModel, chilren }) {
  const navigate = useNavigate();

  const handleClose = () => setOpenAlert(false);

  const logoutHandler = () => {
    clearLocalStorage("user");
    navigate("/login");
  };

  return (
    <Box sx={style}>
      <Typography
        id="modal-modal-description"
        sx={{
          fontSize: "20px",
          fontWeight: "bold",
          mb: 1,
          width: "100%",
          textAlign: "center",
        }}
      >
        Logout
      </Typography>
      <Typography
        id="modal-modal-description"
        sx={{
          fontSize: "15px",
          mb: 3,
          width: "100%",
          textAlign: "center",
        }}
      >
        You will be return to the login screen.
      </Typography>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
      >
        <Button
          fullWidth
          variant="outlined"
          onClick={() => setOpenModel(false)}
        >
          Cancel
        </Button>
        <Button
          color="error"
          fullWidth
          variant="outlined"
          sx={{
            ":hover": { backgroundColor: "red" },
          }}
          onClick={logoutHandler}
        >
          Logout
        </Button>
      </Stack>
    </Box>
  );
}

LogoutAlert.propTypes = {
  openAlert: PropTypes.bool,
  setOpenAlert: PropTypes.func,
};
