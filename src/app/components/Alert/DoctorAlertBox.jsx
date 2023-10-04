import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Stack } from "@mui/material";
import MkButton from "../../assets/theme/MkButton";
import { useDispatch, useSelector } from "react-redux";
import { deleteDoctor } from "../../../components/doctors/features/DoctorApi";

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

export default function DoctorAlertBox({
    openAlert,
    setOpenAlert,
    item,
    type,
}) {
    const dispatch = useDispatch();
    const { deleteStatus } = useSelector((state) => state.DoctorSlice);
    const handleClose = () => setOpenAlert(false);

    return (
        <Modal
            open={openAlert}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
        >
            <Box sx={style}>
                <Typography
                    id='modal-modal-description'
                    sx={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        mb: 1,
                        width: "100%",
                        textAlign: "center",
                    }}
                >
                    Delete
                </Typography>
                <Typography
                    id='modal-modal-description'
                    sx={{
                        fontSize: "15px",
                        mb: 3,
                        width: "100%",
                        textAlign: "center",
                    }}
                >
                    Are you sure want to delete?
                </Typography>
                <Stack
                    direction='row'
                    justifyContent='flex-start'
                    alignItems='center'
                    spacing={2}
                >
                    <MkButton
                        fullWidth
                        variant='outlined'
                        mkcolor='linear-gradient(310deg, #2152ff, #02c6f3)'
                        disabled={deleteStatus === "pending" ? true : false}
                        onClick={() => setOpenAlert(false)}
                    >
                        Cancel
                    </MkButton>
                    {deleteStatus === "pending" ? (
                        <MkButton
                            fullWidth
                            variant='outlined'
                            mkcolor='linear-gradient(310deg, #2152ff, #02c6f3)'
                            disabled
                        >
                            Deleting
                        </MkButton>
                    ) : (
                        <MkButton
                            fullWidth
                            variant='outlined'
                            mkcolor='linear-gradient(310deg, #2152ff, #02c6f3)'
                            onClick={() =>
                                dispatch(deleteDoctor({ id: item._id, type }))
                                    .unwrap()
                                    .then((result) => {
                                        if (result.data) {
                                            setOpenAlert(false);
                                        }
                                    })
                            }
                        >
                            Delete
                        </MkButton>
                    )}
                </Stack>
            </Box>
        </Modal>
    );
}
