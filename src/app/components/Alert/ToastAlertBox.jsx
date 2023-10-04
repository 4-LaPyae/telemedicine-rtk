import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
let isAlertVisible = false;

export const errorAlert = (message) => {
    if (isAlertVisible) {
        return;
    }

    // Set the flag to indicate an alert is now visible
    isAlertVisible = true;
    toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progressStyle: { backgroundColor: "red" },
        style: { color: "red" },
        onClose: () => {
            // When the alert is dismissed, reset the flag
            isAlertVisible = false;
        },
    });
};
export const successAlert = (message) => {
    if (isAlertVisible) {
        return;
    }

    // Set the flag to indicate an alert is now visible
    isAlertVisible = true;
    toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progressStyle: { backgroundColor: "success" },
        style: { color: "green" },
        onClose: () => {
            // When the alert is dismissed, reset the flag
            isAlertVisible = false;
        },
    });
};
