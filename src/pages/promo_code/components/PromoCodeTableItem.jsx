import { Stack, TableCell, TableRow } from "@mui/material";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Switch, FormControlLabel } from "@mui/material";
import { useDispatch } from "react-redux";
import { setUpdateData } from "../../../app/helper/helperSlice";
import PromoCodeDelteModel from "./PromoCodeDeleteModel";
import DeleteModel from "../../../app/components/model/DeleteModel";

// import PatientAlertBox from "./PatientAlertBox";

export default function PromoCodeTableItem({ item, setOpen }) {
    const [openModel, setOpenModel] = useState(false);
    const dispatch = useDispatch();
    const handleDrawerOpen = (e, item) => {
        e.preventDefault();
        setOpen(true);
        dispatch(setUpdateData(item));
    };
    const showDeleteModel = () => setOpenModel(true);
    return (
        <>
            <TableRow key={item._id}>
                <TableCell align="left">{item?.code}</TableCell>
                <TableCell align="left">{item?.expiryDate}</TableCell>
                <TableCell align="left">
                    {item?.package?.name}
                </TableCell>
                <TableCell align="left">
                    <Stack
                        direction={"row"}
                        justifyContent={"left"}
                        alignItems={"left"}
                        spacing={2}
                    >
                        <EditIcon
                            sx={{ color: "blue", cursor: "pointer" }}
                            onClick={(e) => handleDrawerOpen(e, item)}
                        />
                        <DeleteIcon
                            sx={{ color: "red", cursor: "pointer" }}
                            onClick={() => showDeleteModel()}
                        />
                    </Stack>
                </TableCell>
            </TableRow>
            <DeleteModel
                openModel={openModel}
                setOpenModel={setOpenModel}
            >
                <PromoCodeDelteModel id={item._id} />
            </DeleteModel>
        </>
    );
}
