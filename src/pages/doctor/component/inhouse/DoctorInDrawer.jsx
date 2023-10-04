import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SimpleInput from "../../../../app/components/SimpleInput";
import MkAutoComplete from "../../../../app/components/MkAutoComplete";
import CloseIcon from "@mui/icons-material/Close";
import { useGetSpecialistsQuery } from "../../../specialist/feature/specialistApi";
import {
  usePostDoctorsMutation,
  useUpdateDoctorsMutation,
} from "../../feature/doctorApi";
import { useDispatch, useSelector } from "react-redux";
import { deleteUpdateData } from "../../../../app/helper/helperSlice";
import { ToastContainer } from "react-toastify";
import {
  errorAlert,
  successAlert,
} from "../../../../app/components/Alert/ToastAlertBox";

const initialState = {
  name: "",
  email: "",
  phone: "",
  dob: "",
  experience: "",
  gender: "MALE",
  specialist: null,
  info: "",
  profile: null,
  password: "kttguest",
  type: "INHOUSE",
  ReferAppointmentTotal: "",
};

const drawerWidth = 500;
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "space-between",
}));

const DoctorInDrawer = ({ open, setOpen }) => {
  const { data, isLoading } = useGetSpecialistsQuery({
    page: 1,
    limit: 10,
    filterName: "",
  });
  const [postDoctors, { isLoading: inIsLoading }] = usePostDoctorsMutation();
  const [updateDoctors, { isLoading: isUpdateLoading }] =
    useUpdateDoctorsMutation();
  const { update_data } = useSelector((state) => state.HelperSlice);
  const theme = useTheme();
  const [state, setState] = useState(initialState);
  const [imageData, setImageData] = useState("#");
  const dispatch = useDispatch();
  const specialistDropdown = data?.data?.specialists;
  // console.log(data?.data.specialists);
  useEffect(() => {
    if (update_data) {
      setState((prev) => ({ ...prev, ...update_data }));
      setImageData(update_data.profile);
    }
  }, [update_data]);

  const valid =
    Boolean(state.name) &&
    Boolean(state.phone) &&
    Boolean(state.email) &&
    Boolean(state.dob) &&
    Boolean(state.experience) &&
    Boolean(state.gender) &&
    Boolean(state.specialist) &&
    Boolean(state.ReferAppointmentTotal);

  const toastErrorMessage = () => {
    if (!Boolean(state.name)) errorAlert("Name is required!");
    if (!Boolean(state.email)) errorAlert("Email is required!");
    if (!Boolean(state.phone)) errorAlert("Phone Number is required!");
    if (!Boolean(state.dob)) errorAlert("Date of Birth is required!");
    if (!Boolean(state.experience)) errorAlert("Experience is required!");
    if (!Boolean(state.gender)) errorAlert("You Need to select gender");
    if (!Boolean(state.specialist)) errorAlert("Specialist is required!");
    if (!Boolean(state.ReferAppointmentTotal))
      errorAlert("ReferAppointment is required!");
  };

  //   Drawer Open & Close function
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
  //   Drawer Open & Close function

  const handleStateChange = (val) => {
    setState((prev) => ({ ...prev, ...val }));
  };

  const onClose = (msg) => {
    handlerDrawerClose();
    successAlert(msg);
  };

  const addDoctorHandler = (e) => {
    e.preventDefault();
    if (!valid) {
      toastErrorMessage();
    } else {
      state.experience = +state.experience;
      state.ReferAppointmentTotal = +state.ReferAppointmentTotal;
      postDoctors(state)
        .unwrap()
        .then((res) => {
          if (!res.error) {
            onClose(res.message);
          }
        })
        .catch((err) => {
          errorAlert(err.data.message);
        });
    }
  };

  const updateHandler = (e) => {
    e.preventDefault();
    if (!valid) {
      toastErrorMessage();
    } else {
      const { _id, ...rest } = state;
      console.log({ rest });
      rest.experience = +rest.experience;
      rest.ReferAppointmentTotal = +rest.ReferAppointmentTotal;
      updateDoctors({ id: _id, data: rest })
        .unwrap()
        .then((res) => {
          if (!res.error) {
            onClose(res.message);
          }
        });
    }
  };

  const imageInputChange = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      handleStateChange({ profile: reader.result });
    };
    setImageData(URL.createObjectURL(e.target.files[0]));
  };

  console.log(state);

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
        onClose={handlerDrawerClose}
      >
        <Box role="presentation">
          <DrawerHeader>
            <Typography variant="h5" alignItems={"center"}>
              {update_data ? "Update" : "Create"}
            </Typography>
            <Typography variant="h6" alignItems={"center"} color={"gray"}>
              {update_data ? `${update_data?.name}'s Info` : ""}
            </Typography>
            <IconButton onClick={handlerDrawerClose}>
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
            <Stack width={"95%"} spacing={1}>
              <Box>
                <label htmlFor="contained-button-file">
                  <Input
                    accept="image/*"
                    id="contained-button-file"
                    type="file"
                    name="profile"
                    required
                    sx={{
                      display: "none",
                    }}
                    onChange={imageInputChange}
                  />

                  <Avatar
                    sx={{
                      width: 90,
                      height: 80,
                      cursor: "pointer",
                      margin: "0 auto",
                    }}
                    variant="rounded"
                    src={imageData}
                  />
                </label>
              </Box>
              <Stack direction={"row"} spacing={2}>
                <Box width={"100%"}>
                  <InputLabel sx={{ mb: 1 }}>Full Name</InputLabel>
                  <SimpleInput
                    value={state.name}
                    fullwidth
                    placeholder="Full Name"
                    onChange={(e) =>
                      handleStateChange({
                        name: e.target.value,
                      })
                    }
                  />
                </Box>
              </Stack>
              <Box>
                <InputLabel sx={{ mb: 1 }}>Email</InputLabel>
                <SimpleInput
                  type="email"
                  value={state.email}
                  fullwidth
                  placeholder="Email"
                  onChange={(e) =>
                    handleStateChange({
                      email: e.target.value,
                    })
                  }
                />
              </Box>
              <Box>
                <InputLabel sx={{ mb: 1 }}>Phone</InputLabel>
                <SimpleInput
                  value={state.phone}
                  type="tel"
                  fullwidth
                  placeholder="Phone Number"
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
              <Stack direction={"row"} spacing={2}>
                <Box width={"100%"}>
                  <InputLabel sx={{ mb: 1 }}>
                    Date of Birth (mm/dd/yyyy)
                  </InputLabel>
                  <SimpleInput
                    value={state.dob.split(" ")[0]}
                    fullwidth
                    type="date"
                    placeholder="Choose Date of Birth"
                    onChange={(e) =>
                      handleStateChange({
                        dob: e.target.value,
                      })
                    }
                  />
                </Box>
              </Stack>
              <Stack direction={"row"} spacing={2}>
                <Box width={"100%"}>
                  <InputLabel sx={{ mb: 1 }}>Experience</InputLabel>
                  <SimpleInput
                    type="number"
                    value={state.experience}
                    fullwidth
                    onWheel={() => document.activeElement.blur()}
                    placeholder="Experience"
                    onChange={(event) => {
                      const { value } = event.target;
                      if (/^[0-9.]*$/.test(value)) {
                        handleStateChange({
                          experience: value,
                        });
                      } else {
                        errorAlert("Please Enter number and decimal Only.");
                      }
                    }}
                  />
                </Box>
                <Box width={"100%"}>
                  <InputLabel sx={{ mb: 1 }}>Referral Appointments</InputLabel>
                  <SimpleInput
                    type="number"
                    value={state.ReferAppointmentTotal}
                    fullwidth
                    onWheel={() => document.activeElement.blur()}
                    placeholder="Referral Appointments"
                    onChange={(event) => {
                      const { value } = event.target;
                      if (/^[0-9.]*$/.test(value)) {
                        handleStateChange({
                          ReferAppointmentTotal: value,
                        });
                      } else {
                        errorAlert("Please Enter number and decimal Only.");
                      }
                    }}
                  />
                </Box>
              </Stack>
              <Stack>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <RadioGroup
                    row
                    name="row-radio-buttons-group"
                    value={state.gender}
                    onChange={(e) => {
                      handleStateChange({
                        gender: e.target.value,
                      });
                    }}
                  >
                    <FormControlLabel
                      value="MALE"
                      control={<Radio checked={state.gender === "MALE"} />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="FEMALE"
                      control={<Radio checked={state.gender === "FEMALE"} />}
                      label="Female"
                    />
                  </RadioGroup>
                </FormControl>
              </Stack>
              <Box>
                <InputLabel sx={{ mb: 1 }}>Specialist</InputLabel>
                <MkAutoComplete
                  label="Specialist"
                  name="specialist"
                  placeholder="Choose Specialist"
                  fullWidth
                  value={state.specialist}
                  options={specialistDropdown}
                  getOptionLabel={(option) =>
                    `${option.name} (${option.myName})`
                  }
                  isOptionEqualToValue={(option, value) =>
                    option?._id === value?._id
                  }
                  onChange={(e, newValue) => {
                    handleStateChange({
                      specialist: newValue,
                    });
                  }}
                />
              </Box>
              <Box>
                <InputLabel sx={{ mb: 1 }}>Info</InputLabel>
                <SimpleInput
                  placeholder="Write your Info"
                  fullwidth
                  value={state.info}
                  multiline={true}
                  rows={2}
                  onChange={(e) =>
                    handleStateChange({
                      info: e.target.value,
                    })
                  }
                />
              </Box>
              <Box>
                {inIsLoading || isUpdateLoading ? (
                  <Button variant="contained" fullWidth disabled>
                    Loading
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={update_data ? updateHandler : addDoctorHandler}
                  >
                    {update_data ? "Update" : "Create"}
                  </Button>
                )}
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Drawer>
    </div>
  );
};

export default DoctorInDrawer;
