import {
  Avatar,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  InputLabel,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import Logo from "../../app/assets/images/Healthy_Hub_Logo.png";
import SimpleInput from "../../app/components/SimpleInput";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleAuth } from "../../app/utils/authSlice";
import { setLocalStorage } from "../../app/utils/localStorage";
import { usePostLoginMutation } from "./feature/LoginApi";
import {
  errorAlert,
  successAlert,
} from "../../app/components/Alert/ToastAlertBox";
import { ToastContainer } from "react-toastify";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        TeleMedicine
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [postLogin, { isLoading }] = usePostLoginMutation();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };
  const valid = Boolean(email) && Boolean(password);
  const loginHandler = (e) => {
    e.preventDefault();
    if (!valid) {
      errorAlert("Email and Password is required!");
    } else {
      const data = {
        email: email,
        password: password,
      };
      postLogin(data)
        .unwrap()
        .then(async (result) => {
          if (!result.error) {
            await setLocalStorage(result.data);
            dispatch(handleAuth(true));
            return navigate("/dashboard");
          } else {
            errorAlert(result.message);
          }
        });
    }
  };

  return (
    <>
      <ToastContainer />
      <Container component="main" maxWidth="xs" sx={{ marginTop: "10%" }}>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Paper
            sx={{
              width: 500,
              padding: 4,
              borderRadius: "10px",
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            }}
          >
            <Stack justifyContent={"center"} alignItems={"center"}>
              <Avatar
                alt="HealthyHubLogo"
                src={Logo}
                sx={{ width: 94, height: 94 }}
                variant="square"
              />
              <Typography
                color={"#3a8c08"}
                textTransform={"uppercase"}
                variant="h4"
              >
                Sign in
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1, width: "100%" }}>
                <Stack spacing={2} sx={{ width: "100%", mt: 1 }}>
                  <Box sx={{ mb: 1 }}>
                    <InputLabel sx={{ mb: 1 }}> Email*</InputLabel>
                    <SimpleInput
                      placeholder="Email"
                      autoFocus
                      fullwidth
                      // value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Box>
                  <Box sx={{ mb: 1 }}>
                    <InputLabel sx={{ mb: 1 }}> Password*</InputLabel>
                    <SimpleInput
                      required
                      fullwidth
                      // value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        showPassword ? (
                          <Box
                            onClick={showPasswordHandler}
                            sx={{
                              cursor: "pointer",
                            }}
                          >
                            <VisibilityIcon />
                          </Box>
                        ) : (
                          <Box
                            onClick={showPasswordHandler}
                            sx={{
                              cursor: "pointer",
                            }}
                          >
                            <VisibilityOffIcon />
                          </Box>
                        )
                      }
                    />
                  </Box>
                </Stack>
                {/* <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                /> */}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 1,
                    background: "#4EB70D",
                    ":hover": {
                      background: "#3a8c08",
                      transition: "background 0.3s ease",
                    },
                  }}
                  disabled={isLoading}
                  onClick={loginHandler}
                >
                  Sign In
                </Button>
              </Box>
            </Stack>
          </Paper>
        </Box>
        <Copyright sx={{ mt: 2, mb: 4 }} />
      </Container>
    </>
  );
};

export default Login;
