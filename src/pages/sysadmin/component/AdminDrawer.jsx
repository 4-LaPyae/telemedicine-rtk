import {
  Avatar,
  Box,
  Button,
  Drawer,
  Input,
  InputLabel,
  Stack,
  IconButton,
  Typography,
  Divider,
} from "@mui/material";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { checkProfileImageLink } from "../../../app/helper/checkImage";
import SimpleInput from "../../../app/components/SimpleInput";
import AddIcon from "@mui/icons-material/Add";
import {
  usePostAdminMutation,
  useUpdateAdminMutation,
} from "../feature/sysAdminApi";
import { ToastContainer } from "react-toastify";
import {
  errorAlert,
  successAlert,
} from "../../../app/components/Alert/ToastAlertBox";
import { useDispatch, useSelector } from "react-redux";
import { deleteUpdateData } from "../../../app/helper/helperSlice";
const drawerWidth = 500;
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "space-between",
}));
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  profile: null,
  password: "12345",
};

const AdminDrawer = ({ open, setOpen }) => {
  const theme = useTheme();
  const [state, setState] = useState(initialState);
  const [imageData, setImageData] = useState("#");
  const [imageFile, setImageFile] = useState(null);
  const [postAdmin, { isLoading }] = usePostAdminMutation();
  const [updateAdmin, { isLoading: isUpdateLoading }] =
    useUpdateAdminMutation();
  const { update_data } = useSelector((state) => state.HelperSlice);
  const dispatch = useDispatch();

  const handleStateChange = (val) => {
    setState((prev) => ({ ...prev, ...val }));
  };

  const imageInputChange = (e) => {
    let reader = new FileReader();
    console.log(e.target.files[0]);
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImageFile(reader.result);
    };
    setImageData(URL.createObjectURL(e.target.files[0]));
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handlerDrawerClose = () => {
    setOpen(false);
    setState(initialState);
    setImageData("");
    if (update_data) {
      dispatch(deleteUpdateData());
    }
  };

  let bodyData = { ...state, profile: imageFile, type: "ADMIN" };
  //delete bodyData.password;
  console.log(bodyData);
  const onclose = (result) => {
    if (result.error) {
      errorAlert(result.message);
    } else {
      handlerDrawerClose();
      successAlert(result.message);
    }
  };
  const toastErrorMessage = () => {
    if (!Boolean(state.firstName)) errorAlert("First Name is required!");
    if (!Boolean(state.lastName)) errorAlert("Last Name is required!");
    if (!Boolean(state.email)) errorAlert("Email is requried!");
    if (!Boolean(state.phone)) errorAlert("Phone number is required!");
  };
  const valid =
    !!state.firstName && !!state.lastName && !!state.email && !!state.phone;
  const submitHandler = (e) => {
    e.preventDefault();
    if (!valid) {
      toastErrorMessage();
    } else {
      if (update_data) {
        console.log({ bodyData });
        updateAdmin({ id: bodyData._id, data: bodyData })
          .unwrap()
          .then((result) => {
            onclose(result);
          })
          .catch((error) => {
            errorAlert(error.data.message);
          });
      } else {
        postAdmin(bodyData)
          .unwrap()
          .then((result) => {
            onclose(result);
          })
          .catch((error) => {
            errorAlert(error.data.message);
          });
      }
    }
  };

  useEffect(() => {
    if (update_data) {
      setState(update_data);
      setImageData(update_data.profile);
    }
  }, [update_data]);
  console.log();

  return (
    <>
      <ToastContainer />
      <Button
        variant="contained"
        onClick={handleDrawerOpen}
        endIcon={<AddIcon />}
      >
        Add
      </Button>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        anchor="right"
        open={open}
        onClose={handlerDrawerClose}
      >
        <Box role="presentation">
          <DrawerHeader>
            <Typography variant="h5" alignItems={"center"}>
              {update_data ? "Update" : "Create"}
            </Typography>
            <Typography variant="h6" alignItems={"center"} color={"gray"}>
              {update_data
                ? `${update_data?.firstName} ${update_data?.lastName}'s Info`
                : ""}
            </Typography>
            <IconButton onClick={handlerDrawerClose}>
              {theme.direction === "rtl" ? <CloseIcon /> : <CloseIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <form onSubmit={submitHandler}>
            <Stack
              spacing={3}
              justifyContent={"center"}
              alignItems={"center"}
              sx={{ mt: 1 }}
            >
              <Stack width={"95%"} spacing={2}>
                <Stack>
                  <Box sx={{ margin: "0 auto" }}>
                    <label htmlFor="contained-button-file">
                      <Input
                        inputProps={{
                          accept: "image/*",
                        }}
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
                          width: 70,
                          height: 70,
                          cursor: "pointer",
                        }}
                        variant="rounded"
                        src={imageData}
                      />
                    </label>
                  </Box>
                </Stack>
                <Stack direction={"row"} spacing={2}>
                  <Box width={"100%"}>
                    <InputLabel sx={{ mb: 1 }}>First Name *</InputLabel>
                    <SimpleInput
                      fullwidth
                      placeholder="First Name"
                      onChange={(e) => {
                        handleStateChange({
                          firstName: e.target.value,
                        });
                      }}
                      value={state?.firstName}
                    />
                  </Box>
                  <Box width={"100%"}>
                    <InputLabel sx={{ mb: 1 }}>Last Name *</InputLabel>
                    <SimpleInput
                      value={state?.lastName}
                      fullwidth
                      placeholder="Last Name"
                      onChange={(e) => {
                        handleStateChange({
                          lastName: e.target.value,
                        });
                      }}
                      // onChange={lastNameHandler}
                    />
                  </Box>
                </Stack>
                <Stack direction={"row"} spacing={2}>
                  <Box width={"100%"}>
                    <InputLabel sx={{ mb: 1 }}>Email *</InputLabel>
                    <SimpleInput
                      fullwidth
                      type="email"
                      value={state?.email}
                      placeholder="Email"
                      onChange={(e) => {
                        handleStateChange({
                          email: e.target.value,
                        });
                      }}
                    />
                  </Box>
                  <Box width={"100%"}>
                    <InputLabel sx={{ mb: 1 }}>Phone *</InputLabel>
                    <SimpleInput
                      value={state?.phone}
                      fullwidth
                      placeholder="Phone"
                      onChange={(event) => {
                        const { value } = event.target;
                        if (/^[0-9]*$/.test(value)) {
                          handleStateChange({
                            phone: value,
                          });
                        } else {
                          errorAlert("Please Enter number Only");
                        }
                      }}
                    />
                  </Box>
                </Stack>
              </Stack>

              <Box width={"95%"}>
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  type="submit"
                  disabled={isLoading || isUpdateLoading}
                >
                  {update_data ? "Update" : "Create"}
                </Button>
              </Box>
            </Stack>
          </form>
        </Box>
      </Drawer>
    </>
  );
};

export default AdminDrawer;
