import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Stack, Tooltip, Typography } from "@mui/material";

import FileDownloadIcon from "@mui/icons-material/FileDownload";
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const ModalComponent = ({
    global_title,
    children,
    open,
    handleOpen,
    handleClose,
}) => {
    return (
        <>
            <Tooltip
                arrow
                title="export csv"
                sx={{ cursor: "pointer" }}
            >
                <FileDownloadIcon
                    onClick={handleOpen}
                    sx={{
                        color: "white",
                        background: "gray",
                        width: "40px",
                        height: "40px",
                        padding: "5px",
                        borderRadius: "3px",
                        cursor: "pointer",
                    }}
                />
            </Tooltip>
            <Modal open={open} onClose={handleClose}>
                <Box sx={{ ...style }}>
                    <Typography margin={"20px 0px"} variant="h6">
                        {global_title.header}
                    </Typography>
                    <Typography variant="body2" margin={"20px 0px"}>
                        {global_title.body}
                    </Typography>
                    <Stack
                        direction={"row"}
                        spacing={5}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                    >
                        <Box width={"100%"}>
                            <Button
                                fullWidth
                                variant="outlined"
                                color="error"
                                onClick={handleClose}
                                sx={{
                                    ":hover": {
                                        backgroundColor: "red",
                                    },
                                }}
                            >
                                Cancel
                            </Button>
                        </Box>
                        {children}
                    </Stack>
                </Box>
            </Modal>
        </>
    );
};

export default ModalComponent;
