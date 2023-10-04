import { Box, Button, Stack, Typography } from "@mui/material";
import { useDeletePaymentMutation } from "../../feature/paymentApi";
import { useSelector } from "react-redux";

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

export default function PaymentDeleteModal({ id, setDeleteModalOpen }) {
  const [deletePayment, { isLoading: isDeleteLoading }] =
    useDeletePaymentMutation();
  const { update_data } = useSelector((state) => state.HelperSlice);

  const handleModalClose = () => {
    setDeleteModalOpen(false);
  };

  const handlePaymentDelete = () => {
    deletePayment({ id });
    setDeleteModalOpen(false);
  };

  return (
    <Box sx={style}>
      <Typography
        sx={{
          fontSize: "20px",
          fontWeight: "bold",
          mb: 1,
          width: "100%",
          textAlign: "center",
        }}
      >
        Are you sure?
      </Typography>
      <Typography
        sx={{
          fontSize: "15px",
          mb: 3,
          width: "100%",
          textAlign: "center",
        }}
      >
        Do you really want to delete this payment method?
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
          color="success"
          onClick={handleModalClose}
        >
          Cancel
        </Button>
        {isDeleteLoading ? (
          <Button color="secondary" fullWidth variant="outlined" disabled>
            Deleting
          </Button>
        ) : (
          <Button
            color="error"
            fullWidth
            variant="outlined"
            sx={{
              ":hover": { backgroundColor: "red" },
            }}
            onClick={handlePaymentDelete}
          >
            Delete
          </Button>
        )}
      </Stack>
    </Box>
  );
}
