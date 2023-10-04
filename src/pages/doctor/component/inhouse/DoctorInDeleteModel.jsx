import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, Stack } from "@mui/material";
import { useDeleteInhouseDoctorMutation } from "../../feature/doctorApi";

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

const DoctorInDeleteModel = ({ setOpenModel, id }) => {
  const [deleteInhouseDoctor, { isLoading: isDeleteLoading }] =
    useDeleteInhouseDoctorMutation();

  const deleteDoctorHandler = (e) => {
    e.preventDefault();
    deleteInhouseDoctor({ id })
      .unwrap()
      .then((res) => {
        console.log(res);
      });
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
        Do you really want to delete this doctor?
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
            onClick={deleteDoctorHandler}
          >
            Delete
          </Button>
        )}
      </Stack>
    </Box>
  );
};

export default DoctorInDeleteModel;
