import {
    Avatar,
    Box,
    Stack,
    TableCell,
    TableRow,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SpecialistDeleteModel from "./SpecialistDeleteModel";
import { useDispatch } from "react-redux";
import { setUpdateData } from "../../../app/helper/helperSlice";
import DeleteModel from "../../../app/components/model/DeleteModel";
export default function SpecialistTableItem({ item, setOpen }) {
    const [openModel, setOpenModel] = useState(false);
    const dispatch = useDispatch();

    const showDeleteModel = () => {
        setOpenModel(true);
    };

    const handleDrawerOpen = (e, item) => {
        e.preventDefault();
        setOpen(true);
        dispatch(setUpdateData(item));
    };
    return (
        <>
            <TableRow key={item._id}>
                <TableCell align="start">
                    <Stack
                        direction={"row"}
                        alignItems={"center"}
                        spacing={2}
                    >
                        <Box>
                            <Avatar
                                sx={{
                                    width: 50,
                                    height: 50,
                                    margin: "0 auto",
                                }}
                                variant="rounded"
                                src={item.image}
                                alt="admin"
                            >
                                {item.name.charAt(0).toUpperCase()}
                            </Avatar>
                        </Box>
                    </Stack>
                </TableCell>
                <TableCell align="center">{item.name}</TableCell>
                <TableCell align="center">{item.myName}</TableCell>
                <TableCell align="center">
                    {item.inhouseDoctorCount}
                </TableCell>
                <TableCell align="center">
                    {item.coDoctorCount}
                </TableCell>
                <TableCell align="center">
                    <Stack
                        direction={"row"}
                        justifyContent={"center"}
                        alignItems={"center"}
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
                <SpecialistDeleteModel id={item._id} />
            </DeleteModel>
        </>
    );
}

//export default PatientTableItem;
