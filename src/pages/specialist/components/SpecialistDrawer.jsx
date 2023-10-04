import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputLabel,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import SimpleInput from "../../../app/components/SimpleInput";
import AddIcon from "@mui/icons-material/Add";
import {
  useAddSpecialistMutation,
  useUpdateSpecialistMutation,
} from "../feature/specialistApi";
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
  margin: "10px 10px 0px 10px",
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "space-between",
}));
const initialState = {
  name: "",
  myName: "",
  image: null,
};
const SpecialistDrawer = ({ open, setOpen }) => {
  const theme = useTheme();
  const [state, setState] = useState(initialState);
  const [imageData, setImageData] = useState("#");
  const [addSpecialist, { isLoading: addLoading }] = useAddSpecialistMutation();
  const [updateSpecialist, { isLoading: updateLoading }] =
    useUpdateSpecialistMutation();
  const { update_data } = useSelector((state) => state.HelperSlice);
  const dispatch = useDispatch();

  console.log({ update_data });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setState(initialState);
    setImageData("");
    setOpen(false);
    if (update_data) {
      dispatch(deleteUpdateData());
    }
  };

  const onClose = (msg) => {
    setState(initialState);
    setImageData("");
    setOpen(false);
    successAlert(msg);
  };

  const imageInputChange = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      handleStateChange({ image: reader.result });
    };
    setImageData(URL.createObjectURL(e.target.files[0]));
  };

  const handleStateChange = (val) => {
    setState((prev) => ({ ...prev, ...val }));
  };
  const toastErrorMessage = () => {
    if (!Boolean(state.name)) errorAlert("Name is required!");
    if (!Boolean(state.myName)) errorAlert("Myanmar name is required!");
  };
  const valid = Boolean(state.name) && Boolean(state.myName);
  const submitHandler = (e) => {
    e.preventDefault();

    if (!valid) {
      toastErrorMessage();
    } else {
      if (update_data) {
        const { _id, ...rest } = state;
        updateSpecialist({ id: _id, specialist: rest })
          .unwrap()
          .then((res) => {
            if (!res.error) {
              onClose(res.message);
            }
          });
      } else {
        addSpecialist(state)
          .unwrap()
          .then((res) => {
            if (!res.error) {
              console.log(res);
              onClose(res.message);
            }
          });
      }
    }
  };

  useEffect(() => {
    if (update_data) {
      setState(update_data);
      setImageData(update_data.image);
    }
  }, [update_data]);

  return (
    <div>
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
        onClose={handleDrawerClose}
      >
        <Box role="presentation">
          <DrawerHeader>
            <Typography variant="h5" alignItems={"center"}>
              {update_data ? "Update" : "Create"}
            </Typography>
            <Typography variant="h6" alignItems={"center"} color={"gray"}>
              {update_data ? `${update_data?.name}'s Info` : ""}
            </Typography>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? <CloseIcon /> : <CloseIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />

          <Stack
            spacing={3}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{ mt: 2 }}
          >
            <Stack width={"95%"} spacing={2}>
              <Stack>
                <Box margin={"0 auto"}>
                  <label htmlFor="contained-button-file">
                    <Input
                      accept="image/*"
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
              </Stack>
              <Box>
                <InputLabel sx={{ mb: 1 }}>Specialize Name</InputLabel>
                <SimpleInput
                  value={state.name}
                  fullwidth
                  placeholder="Specialize Name"
                  onChange={(e) => {
                    handleStateChange({
                      name: e.target.value,
                    });
                  }}
                />
              </Box>
              <Box>
                <InputLabel sx={{ mb: 1 }}>Specialize Myanmar Name</InputLabel>
                <SimpleInput
                  value={state.myName}
                  fullwidth
                  placeholder="Specialize Name"
                  onChange={(e) => {
                    handleStateChange({
                      myName: e.target.value,
                    });
                  }}
                />
              </Box>
              <Box>
                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  color="primary"
                  disabled={addLoading || updateLoading}
                  onClick={submitHandler}
                >
                  {update_data ? "Update" : "Create"}
                </Button>
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Drawer>
    </div>
  );
};

export default SpecialistDrawer;
