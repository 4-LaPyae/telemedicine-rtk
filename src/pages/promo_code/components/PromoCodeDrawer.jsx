import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import SimpleInput from "../../../app/components/SimpleInput";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import { ToastContainer } from "react-toastify";
import {
  errorAlert,
  successAlert,
} from "../../../app/components/Alert/ToastAlertBox";
import { useDispatch, useSelector } from "react-redux";
import {
  useAddPromoCodeMutation,
  useUpdatePromoCodeMutation,
} from "../feature/promoCodeApi";
import MkAutoComplete from "../../../app/components/MkAutoComplete";
import {
  useGetPackagesOptionsQuery,
  useGetPackagesQuery,
} from "../../packages/features/PackagesApi";
import { Update } from "@mui/icons-material";
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
  code: "",
  expiryDate: "",
  package: null,
};

const PromoCodeDrawer = ({ open, setOpen }) => {
  const [state, setState] = useState(initialState);
  const theme = useTheme();
  const dispatch = useDispatch();
  const { data, isLading } = useGetPackagesOptionsQuery();
  const [addPromoCode, { isLoading: isCreateLoading }] =
    useAddPromoCodeMutation();
  const [updatePromoCode, { isLading: isUpdateLoading }] =
    useUpdatePromoCodeMutation();
  const packageDropdown = data?.data?.packages;
  const { update_data } = useSelector((state) => state.HelperSlice);
  const handleStateChange = (val) => {
    setState((prev) => ({ ...prev, ...val }));
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handlerDrawerClose = () => {
    setOpen(false);
    setState(initialState);
    if (update_data) {
      dispatch(deleteUpdateData());
    }
  };

  const valid = !!state.code && !!state.expiryDate && !!state.package;
  const toastErrorMessage = () => {
    if (!Boolean(state.code)) errorAlert("Promo Code is required!");
    if (!Boolean(state.expiryDate)) errorAlert("Expiry Date is required!");
    if (!Boolean(state.package)) errorAlert("Package is required!");
  };
  const onClose = (msg) => {
    setState(initialState);
    setOpen(false);
    successAlert(msg);
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
    } else {
      const updateData = {
        code: state?.code,
        expiryDate: state?.expiryDate,
        packageId: state.package._id,
      };
      if (update_data) {
        updatePromoCode({ id: update_data._id, data: updateData })
          .unwrap()
          .then((res) => {
            closeHandler(res);
          })
          .catch((err) => {
            errorAlert(err.data.message);
          });
      } else {
        addPromoCode(updateData)
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
  useEffect(() => {
    if (update_data) {
      setState(update_data);
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
        onClose={handlerDrawerClose}
      >
        <Box role="presentation">
          <DrawerHeader>
            <Typography variant="h5">
              {" "}
              {update_data ? "Update" : "Create"}
            </Typography>
            <Typography variant="h6" alignItems={"center"} color={"gray"}>
              {update_data ? `${update_data?.code}'s Info` : ""}
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
                  <Box width={"100%"}>
                    <InputLabel sx={{ mb: 1 }}>Promo Code</InputLabel>
                    <SimpleInput
                      //required
                      fullwidth
                      value={state.code}
                      placeholder="Enter Promo Code"
                      onChange={(e) => {
                        handleStateChange({
                          code: e.target.value,
                        });
                      }}
                    />
                  </Box>
                </Stack>
                <Stack>
                  <Box>
                    <InputLabel sx={{ mb: 1 }}>Expiry Date</InputLabel>
                    <SimpleInput
                      fullwidth
                      type="date"
                      value={state.expiryDate.split(" ")[0]}
                      placeholder="Choose expiry Date"
                      onChange={(e) => {
                        handleStateChange({
                          expiryDate: e.target.value,
                        });
                      }}
                    />
                  </Box>
                </Stack>
                <Stack>
                  <Box>
                    <InputLabel sx={{ mb: 1 }}>Package Name</InputLabel>
                    <MkAutoComplete
                      disabled={isLading}
                      label="package"
                      name="package"
                      placeholder="Choose Package"
                      fullWidth
                      value={state.package}
                      options={packageDropdown}
                      getOptionLabel={(option) => option.name}
                      isOptionEqualToValue={(option, value) =>
                        option?._id === value?._id
                      }
                      onChange={(e, newValue) => {
                        handleStateChange({
                          package: newValue,
                        });
                      }}
                    />
                  </Box>
                </Stack>
                <Stack>
                  <Box>
                    <Button
                      fullWidth
                      variant="contained"
                      type="submit"
                      color="primary"
                      disabled={isCreateLoading || isUpdateLoading}
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

PromoCodeDrawer.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.any,
};
export default PromoCodeDrawer;
