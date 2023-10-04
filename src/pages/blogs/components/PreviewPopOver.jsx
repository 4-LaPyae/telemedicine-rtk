import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Typography,
} from "@mui/material";
import { preview } from "./preview";
import { useEffect, useState } from "react";

const PreviewPopOver = ({
    popOver,
    setPopOver,
    header,
    tags,
    body,
    author,
    date,
    image,
}) => {
    const handleClose = () => {
        setPopOver(false);
    };

    return (
        <Dialog
            open={popOver}
            maxWidth={"xl"}
            component="form"
            onClose={handleClose}
        >
            <DialogContent>
                <Box
                    sx={{
                        width: "100%",
                        height: "600px",
                    }}
                >
                    {preview({
                        header: header,
                        body: body,
                        author: author,
                        date: date,
                        tags: tags,
                        image: image,
                    })}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    onClick={handleClose}
                    color="error"
                    sx={{
                        "&:hover": {
                            background: "red",
                        },
                    }}
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PreviewPopOver;
