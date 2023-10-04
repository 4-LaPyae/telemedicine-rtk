import {
    Avatar,
    MenuItem,
    Select,
    Stack,
    TableCell,
    TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PaymentDeleteModal from "./PaymentDeleteModal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUpdateData } from "../../../../app/helper/helperSlice";
import SimpleInput from "../../../../app/components/SimpleInput";
import DeleteModel from "../../../../app/components/model/DeleteModel";

export default function PaymentTableItem({ item, setDrawerOpen }) {
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [paymentType, setPaymentType] = useState();
    const dispatch = useDispatch();

    const handleDeleteModal = () => {
        setDeleteModalOpen(true);
    };

    const handleEdit = (item) => {
        setDrawerOpen(true);
        dispatch(setUpdateData(item));
    };

    const handlePaymentTypeChange = (e) => {
        setPaymentType(e.target.value);
    };

    return (
        <>
            <TableRow key={item.name}>
                <TableCell component="th" scope="row" align="center">
                    <Avatar
                        variant="rounded"
                        sx={{ width: "100px", height: "100px" }}
                        alt=""
                        src={item.image}
                    />
                </TableCell>
                <TableCell align="center">{item.type}</TableCell>
                <TableCell align="center">{item.name}</TableCell>
                <TableCell>
                    <Stack
                        direction={"row"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        spacing={2}
                    >
                        <EditIcon
                            sx={{ color: "blue", cursor: "pointer" }}
                            onClick={() => {
                                handleEdit(item);
                            }}
                        />
                        <DeleteIcon
                            sx={{ color: "red", cursor: "pointer" }}
                            onClick={handleDeleteModal}
                        />
                    </Stack>
                </TableCell>
            </TableRow>
            <DeleteModel
                openModel={isDeleteModalOpen}
                setOpenModel={setDeleteModalOpen}
            >
                <PaymentDeleteModal
                    id={item._id}
                    setDeleteModalOpen={setDeleteModalOpen}
                />
            </DeleteModel>
        </>
    );
}
