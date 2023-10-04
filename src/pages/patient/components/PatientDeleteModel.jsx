import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, Stack } from "@mui/material";
import PropTypes from "prop-types";
import { useDeletePatientMutation } from "../feature/patientApi";

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
export default function PatientDeleteModel({ setOpenModel, id }) {
  const [deletePatient, { isLoading: isDeleteLoading }] =
    useDeletePatientMutation();
  const deletePatientHandler = () => {
    deletePatient({ id });
    setOpenModel(false);
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
        Are you sure?
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
        Do you really want to delete this patient?
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
          onClick={() => setOpenModel(false)}
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
            onClick={deletePatientHandler}
          >
            Delete
          </Button>
        )}
      </Stack>
    </Box>
  );
}
PatientDeleteModel.propTypes = {
  setOpenAlert: PropTypes.func,
  id: PropTypes.string,
};
