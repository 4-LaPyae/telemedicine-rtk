import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { makeStyles } from "@mui/styles";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const useStyles = makeStyles((theme) => ({
    successalert: {
        backgroundColor: "green",
        color: "white",
    },
    erroralert: {
        color: "white",
    },
}));

export default function SnackbarAlert({
    openSnackBar,
    setOpenSnackBar,
    message,
    type,
}) {
    const classes = useStyles();
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenSnackBar(false);
    };

    return (
        <Stack spacing={2} sx={{ width: "100%" }}>
            <Snackbar
                open={openSnackBar}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <Alert
                    onClose={handleClose}
                    severity={type}
                    sx={{
                        width: "100%",
                    }}
                    className={
                        type === "success"
                            ? classes.successalert
                            : classes.erroralert
                    }
                >
                    {message}
                </Alert>
            </Snackbar>
        </Stack>
    );
}
