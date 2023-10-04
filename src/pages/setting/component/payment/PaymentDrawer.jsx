import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import SimpleInput from "../../../../app/components/SimpleInput";
import PaymentImage from "../../../../app/assets/images/debit-card.png";
import {
  useAddPaymentMutation,
  useUpdatePaymentMutation,
} from "../../feature/paymentApi";
import { useDispatch, useSelector } from "react-redux";
import { deleteUpdateData } from "../../../../app/helper/helperSlice";
import { useTheme } from "@emotion/react";
import CloseIcon from "@mui/icons-material/Close";
import {
  errorAlert,
  successAlert,
} from "../../../../app/components/Alert/ToastAlertBox";
import { ToastContainer } from "react-toastify";

const initialPaymentData = {
  name: "",
  image: PaymentImage,
  type: "",
};

const paymentTypes = ["Card", "Mobile Pay"];

export default function PaymentDrawer({ isDrawerOpen, setDrawerOpen }) {
  const theme = useTheme();
  const [paymentDataState, setPaymentDataState] = useState(initialPaymentData);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [imageData, setImageData] = useState(PaymentImage);
  const [opacity, setOpacity] = useState("20%");
  const [addPayment, { isLoading }] = useAddPaymentMutation();
  const [updatePayment, { isUpdateLoading }] = useUpdatePaymentMutation();
  const { update_data } = useSelector((state) => state.HelperSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    setPaymentMethod(update_data ? update_data.name : "");
    setPaymentType(update_data ? update_data.type : "");
    setOpacity(update_data ? "100%" : "20%");
    setImageData(update_data ? update_data.image : PaymentImage);
  }, [update_data]);

  const handleOpenDrawer = () => {
    setDrawerOpen(true);
  };

  const handlePaymentTypeChange = (e) => {
    setPaymentType(e.target.value);
  };

  const handleCloseDrawer = (res) => {
    setPaymentMethod("");
    setImageData(PaymentImage);
    setOpacity("20%");
    setPaymentType("");
    setDrawerOpen(false);
    if (update_data) {
      dispatch(deleteUpdateData());
    }
  };
  const closeSubmit = (res) => {
    if (!res.error) {
      console.log(res.message);
      successAlert(res.message);
      setPaymentMethod("");
      setImageData(PaymentImage);
      setOpacity("20%");
      setPaymentType("");
      setDrawerOpen(false);
      if (update_data) {
        dispatch(deleteUpdateData());
      }
    } else {
      errorAlert(res.message);
    }
  };

  const imageInputChange = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setPaymentDataState({ image: reader.result });
      setImageData(reader.result);
    };
    setOpacity("100%");

    // setImageData(URL.createObjectURL(e.target.files[0]));
  };

  const submitHandler = (e) => {
    if (update_data) {
      e.preventDefault();
      updatePayment({
        id: update_data._id,
        payment: {
          name: paymentMethod,
          image: imageData == update_data.image ? null : imageData,
          type: paymentType,
        },
      })
        .unwrap()
        .then((res) => {
          closeSubmit(res);
          console.log(res);
        })
        .catch((err) => {
          errorAlert(err.data.message);
        });
    } else {
      e.preventDefault();
      addPayment({
        name: paymentMethod,
        image: imageData,
        type: paymentType,
      })
        .unwrap()
        .then((res) => {
          closeSubmit(res);
          console.log(res);
        })
        .catch((err) => {
          errorAlert(err.data.message);
        });
    }
  };

  return (
    <Box>
      <ToastContainer />
      <Button
        variant="contained"
        onClick={handleOpenDrawer}
        endIcon={<AddIcon />}
        sx={{ my: 2, float: "right" }}
      >
        Add
      </Button>
      <Drawer anchor="right" open={isDrawerOpen} onClose={handleCloseDrawer}>
        <Box>
          <Stack
            sx={{
              m: 1,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h3">
              {update_data ? "Update" : "Create"}
            </Typography>
            <IconButton onClick={handleCloseDrawer}>
              {theme.direction === "rtl" ? <CloseIcon /> : <CloseIcon />}
            </IconButton>
          </Stack>
          <Divider sx={{ width: "400px" }} />

          <form
            onSubmit={submitHandler}
            style={{
              margin: "10px",
              marginTop: "30px",
              display: "flex",
              flexDirection: "column",
              gap: 30,
            }}
          >
            <Stack>
              <InputLabel sx={{ mb: 1 }}>Payment Method</InputLabel>
              <SimpleInput
                fullwidth
                value={paymentMethod}
                placeholder="Payment Method"
                onChange={(e) => {
                  setPaymentMethod(e.target.value);
                }}
              />
            </Stack>
            <Stack>
              <InputLabel sx={{ mb: 1 }}>Payment Type</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="Payment Type"
                value={paymentType}
                onChange={handlePaymentTypeChange}
                displayEmpty
                input={<SimpleInput fullwidth />}
                renderValue={
                  paymentType !== "" ? undefined : () => "Select Payment Type"
                }
              >
                <MenuItem disabled value="">
                  <em>- Select Payment Type -</em>
                </MenuItem>
                {paymentTypes.map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
            <Stack>
              <InputLabel sx={{ mb: 1 }}>Payment Method Image</InputLabel>
              <label
                htmlFor="contained-button-file"
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "50px",
                }}
              >
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
                    width: 200,
                    height: 200,
                    cursor: "pointer",
                    opacity: opacity,
                    border: 1,
                    p: 1,
                  }}
                  variant="rounded"
                  src={imageData}
                />
              </label>
            </Stack>

            <Button
              fullWidth
              variant="contained"
              type="submit"
              color="primary"
              disabled={
                imageData == PaymentImage ||
                paymentType == "" ||
                paymentMethod == ""
                  ? true
                  : false
              }
            >
              {update_data ? "Update" : "Create"}
            </Button>
          </form>
        </Box>
      </Drawer>
    </Box>
  );
}
