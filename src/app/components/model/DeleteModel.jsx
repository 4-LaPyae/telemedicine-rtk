import Modal from "@mui/material/Modal";
import { cloneElement } from "react";

export default function DeleteModel({
    openModel,
    setOpenModel,
    children,
}) {
    const handleClose = () => setOpenModel(false);
    return (
        <Modal
            open={openModel}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            {cloneElement(children, { setOpenModel })}
        </Modal>
    );
}
