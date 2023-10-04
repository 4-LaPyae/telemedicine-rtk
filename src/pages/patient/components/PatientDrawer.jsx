import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import {
  Box,
  Button,
  Divider,
  Drawer,
  Input,
  Avatar,
  IconButton,
  InputLabel,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Stack,
  Typography,
  Radio,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import FormControl from "@mui/material/FormControl";
import SimpleInput from "../../../app/components/SimpleInput";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  useAddPatientMutation,
  useUpdatePatientMutation,
} from "../feature/patientApi";
import MkAutoComplete from "../../../app/components/MkAutoComplete";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { deleteUpdateData } from "../../../app/helper/helperSlice";
import {
  errorAlert,
  successAlert,
} from "../../../app/components/Alert/ToastAlertBox";
const initialState = {
  name: "",
  email: "",
  phone: "",
  password: "kttguest",
  dob: "",
  gender: "MALE",
  profile: null,
  bloodType: "UNKNOWN",
  status: "ACTIVE",
  allergies: null,
};
const BloodTypeOptionDatas = [
  "O+",
  "O-",
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "UNKNOWN",
];
const drawerWidth = 500;
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "space-between",
}));

const PatientDrawer = ({ open, setOpen }) => {
  const theme = useTheme();
  const [state, setState] = useState(initialState);
  const [imageData, setImageData] = useState("#");
  const [addPatient, { isLoading }] = useAddPatientMutation();
  const [updatePatient, { isLoading: isUpdateLoading }] =
    useUpdatePatientMutation();
  const { update_data } = useSelector((state) => state.HelperSlice);
  console.log({ update_data });
  const dispatch = useDispatch();
  const handleStateChange = (val) => {
    setState((prev) => ({ ...prev, ...val }));
  };
  const valid =
    !!state.name &&
    !!state.phone &&
    !!state.email &&
    !!state.dob &&
    !!state.bloodType;

  const toastErrorMessage = () => {
    if (!Boolean(state.name)) errorAlert("Name is required!");
    if (!Boolean(state.email)) errorAlert("Email is required!");
    if (!Boolean(state.phone)) errorAlert("Phone Number is required!");
    if (!Boolean(state.dob)) errorAlert("Date of Birth is required!");
    if (!Boolean(state.bloodType)) errorAlert("Blood Type is required!");
  };

  const onClose = (msg) => {
    setState(initialState);
    setOpen(false);
    successAlert(msg);
  };
  const imageInputChange = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      handleStateChange({ profile: reader.result });
    };
    setImageData(URL.createObjectURL(e.target.files[0]));
  };
  const closeHandler = (res) => {
    if (!res.error) {
      onClose(res.message);
    } else {
      errorAlert(res.message);
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (!valid) {
      toastErrorMessage();
      //  errorAlert("Something field is required!");
    } else {
      if (update_data) {
        const { status, _id, ...rest } = state;
        updatePatient({ id: _id, patient: rest })
          .unwrap()
          .then((res) => {
            closeHandler(res);
          });
      } else {
        addPatient(state)
          .unwrap()
          .then((res) => {
            closeHandler(res);
          })
          .catch((err) => {
            errorAlert(err.data.message);
          });
      }
    }
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

  useEffect(() => {
    if (update_data) {
      setState(update_data);
      setImageData(update_data.profile);
    }
  }, [update_data]);
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
                <Stack direction={"row"} spacing={2}>
                  <Box width={"100%"}>
                    <InputLabel sx={{ mb: 1 }}>Full Name</InputLabel>
                    <SimpleInput
                      //required
                      fullwidth
                      value={state.name}
                      placeholder="Full Name"
                      onChange={(e) => {
                        handleStateChange({
                          name: e.target.value,
                        });
                      }}
                    />
                  </Box>
                </Stack>
                <Stack direction={"row"} spacing={2}>
                  <Box width={"100%"}>
                    <InputLabel sx={{ mb: 1 }}>Email</InputLabel>
                    <SimpleInput
                      //required
                      type="email"
                      fullwidth
                      value={state.email}
                      placeholder="Email"
                      onChange={(e) => {
                        handleStateChange({
                          email: e.target.value,
                        });
                      }}
                    />
                  </Box>
                  <Box width={"100%"}>
                    <InputLabel sx={{ mb: 1 }}>Phone</InputLabel>
                    <SimpleInput
                      fullwidth
                      value={state.phone}
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
                <Stack>
                  <Box>
                    <InputLabel sx={{ mb: 1 }}>Date of Birth</InputLabel>
                    <SimpleInput
                      fullwidth
                      type="date"
                      value={state.dob.split(" ")[0]}
                      placeholder="Choose Date of Birth"
                      onChange={(e) => {
                        handleStateChange({
                          dob: e.target.value,
                        });
                      }}
                    />
                  </Box>
                </Stack>
                <Stack>
                  <Box>
                    <InputLabel sx={{ mb: 1 }}>BloodType</InputLabel>
                    <MkAutoComplete
                      label="Option"
                      name="option"
                      placeholder="Choose BloodType"
                      fullWidth
                      options={BloodTypeOptionDatas}
                      getOptionLabel={(bloodType) => bloodType}
                      isOptionEqualToValue={(bloodType, value) =>
                        bloodType === value
                      }
                      onChange={(e, v) => {
                        handleStateChange({
                          bloodType: v,
                        });
                      }}
                      value={state.bloodType}
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
                <Stack>
                  <InputLabel sx={{ mb: 1 }}>Allergies</InputLabel>
                  <SimpleInput
                    placeholder="Write your Allergies"
                    fullwidth
                    value={state.allergies}
                    multiline={true}
                    rows={3}
                    onChange={(e) => {
                      handleStateChange({
                        allergies: e.target.value,
                      });
                    }}
                  />
                </Stack>
                <Stack>
                  <Box>
                    <Button
                      fullWidth
                      variant="contained"
                      type="submit"
                      color="primary"
                      disabled={isLoading || isUpdateLoading}
                    >
                      {update_data ? "Update" : "Create"}
                    </Button>
                  </Box>
                </Stack>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Drawer>
    </div>
  );
};

PatientDrawer.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.any,
};
export default PatientDrawer;
