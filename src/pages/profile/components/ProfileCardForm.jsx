import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, Box, Input, InputLabel, Stack } from "@mui/material";
import SimpleInput from "../../../app/components/SimpleInput";
import { useUpdateAdminMutation } from "../../sysadmin/feature/sysAdminApi";
import { ToastContainer } from "react-toastify";
import {
  errorAlert,
  successAlert,
} from "../../../app/components/Alert/ToastAlertBox";
import { useDispatch } from "react-redux";
import { setUserData } from "../../login/feature/LoginSlice";

export default function ProfileCardForm({ user }) {
  const [state, setState] = React.useState(null);
  const [imageData, setImageData] = React.useState("#");
  const [updateAdmin, { isLoading }] = useUpdateAdminMutation();
  const dispatch = useDispatch();
  const handleStateChange = (val) => {
    setState((prev) => ({ ...prev, ...val }));
  };
  const imageInputChange = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      handleStateChange({ profile: reader.result });
    };
    setImageData(URL.createObjectURL(e.target.files[0]));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const valid = Boolean(state.firstName) && Boolean(state.lastName);
    if (!valid) {
      errorAlert("Something field is required!");
    } else {
      const { status, _id, token, ...rest } = state;
      const updateData = { ...rest, type: "ADMIN" };
      console.log(updateData);
      updateAdmin({ id: _id, data: updateData })
        .unwrap()
        .then((res) => {
          if (!res.error) {
            console.log(res.data);
            dispatch(setUserData(res.data));
            localStorage.setItem("user", JSON.stringify(res.data));
            successAlert(res.message);
          }
        });
    }
  };
  React.useEffect(() => {
    if (user) {
      setState(user);
      setImageData(user.profile);
    }
  }, [user]);

  return (
    <>
      <ToastContainer />
      <Card style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.1)" }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            User Information
          </Typography>
          <Stack direction={"row"} justifyContent="space-around">
            <Box width={"30%"}>
              <Box padding={"15px 0px"} marginTop={2}>
                <Typography gutterBottom variant="h6" component="div">
                  First Name:
                </Typography>
              </Box>
              <Box padding={"15px 0px"} marginTop={2}>
                <Typography gutterBottom variant="h6" component="div">
                  Last Name:
                </Typography>
              </Box>
              <Box padding={"15px 0px"} marginTop={2}>
                <Typography gutterBottom variant="h6" component="div">
                  Email:
                </Typography>
              </Box>
              <Box padding={"15px 0px"} marginTop={2}>
                <Typography gutterBottom variant="h6" component="div">
                  Phone:
                </Typography>
              </Box>
              <Box padding={"15px 0px"} marginTop={2}>
                <Typography gutterBottom variant="h6" component="div">
                  Photo:
                </Typography>
              </Box>
              <Box padding={"15px 0px"} marginTop={2}></Box>
            </Box>
            <Box width={"70%"}>
              <form onSubmit={submitHandler}>
                <Box marginTop={2}>
                  <SimpleInput
                    value={state?.firstName}
                    onChange={(e) => {
                      handleStateChange({
                        firstName: e.target.value,
                      });
                    }}
                    label="Phone"
                    name="phone"
                    placeholder="Enter Your FirstName"
                    focus={true}
                    fullwidth
                  />
                </Box>
                <Box marginTop={2.5}>
                  <SimpleInput
                    value={state?.lastName}
                    onChange={(e) => {
                      handleStateChange({
                        lastName: e.target.value,
                      });
                    }}
                    label="Phone"
                    name="phone"
                    placeholder="Enter Your LastName"
                    focus={true}
                    fullwidth
                  />
                </Box>
                <Box marginTop={2.5}>
                  <SimpleInput
                    value={state?.email}
                    disabled
                    label="Email"
                    name="email"
                    required
                    fullwidth
                  />
                </Box>
                <Box marginTop={2.5}>
                  <SimpleInput
                    value={state?.phone}
                    disabled
                    label="phone"
                    name="phone"
                    required
                    fullwidth
                  />
                </Box>
                <Box marginTop={2.5}>
                  <label htmlFor="contained-button-file">
                    <Input
                      accept="image/*"
                      // inputProps={{ accept: "image/*" }}
                      id="contained-button-file"
                      type="file"
                      name="profile"
                      sx={{
                        display: "none",
                      }}
                      onChange={imageInputChange}
                    />

                    <Avatar
                      sx={{
                        width: 100,
                        height: 100,
                        cursor: "pointer",
                      }}
                      variant="rounded"
                      src={imageData}
                    />
                  </label>
                </Box>
                <Box marginTop={2.5}>
                  <Button
                    variant="contained"
                    size="lg"
                    disabled={isLoading}
                    type="submit"
                    sx={{ padding: "10px" }}
                  >
                    Save Change
                  </Button>
                </Box>
              </form>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}
