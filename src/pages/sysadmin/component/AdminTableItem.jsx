import {
    Avatar,
    Box,
    FormControlLabel,
    Stack,
    Switch,
    TableCell,
    TableRow,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { checkProfileImageLink } from "../../../app/helper/checkImage";
import { setUpdateData } from "../../../app/helper/helperSlice";
import AdminDeleteModel from "./AdminDeleteModel";
import DeleteModel from "../../../app/components/model/DeleteModel";

const AdminTableItem = ({ item, setOpen }) => {
    const [openModel, setOpenModel] = useState(false);
    const [checked, setChecked] = useState(
        item.status ? true : false
    );
    const dispatch = useDispatch();

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const updateHandler = (e, id) => {
        e.preventDefault();
        setOpen(true);
        dispatch(setUpdateData(item));
    };

    const deleteHandler = (e) => {
        e.preventDefault();
        setOpenModel(true);
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
                                src={
                                    item.profile ??
                                    checkProfileImageLink()
                                }
                                alt="admin"
                            >
                                {item?.firstName
                                    ?.charAt(0)
                                    .toUpperCase()}
                            </Avatar>
                        </Box>
                        <Box>
                            <Typography variant="h6" gutterBottom>
                                {item.firstName} {item.lastName}
                            </Typography>
                            <Typography gutterBottom>
                                {item.email}
                            </Typography>
                        </Box>
                    </Stack>
                </TableCell>
                <TableCell align="start">Admin</TableCell>
                <TableCell align="start">
                    <FormControlLabel
                        control={
                            <Switch
                                checked={checked}
                                onChange={handleChange}
                                color="success"
                            />
                        }
                    />
                </TableCell>
                <TableCell align="start">
                    <Stack
                        direction={"row"}
                        justifyContent={"start"}
                        alignItems={"center"}
                        spacing={2}
                    >
                        <EditIcon
                            onClick={(e) =>
                                updateHandler(e, item._id)
                            }
                            sx={{ color: "blue", cursor: "pointer" }}
                        />
                        <DeleteIcon
                            sx={{ color: "red", cursor: "pointer" }}
                            onClick={deleteHandler}
                        />
                    </Stack>
                </TableCell>
            </TableRow>
            <DeleteModel
                openModel={openModel}
                setOpenModel={setOpenModel}
            >
                <AdminDeleteModel id={item._id} />
            </DeleteModel>
        </>
    );
};

export default AdminTableItem;
