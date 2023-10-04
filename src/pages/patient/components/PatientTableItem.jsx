import {
    Avatar,
    Box,
    Button,
    Chip,
    IconButton,
    Stack,
    TableCell,
    TableRow,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Switch, FormControlLabel } from "@mui/material";
import PatientDeleteModel from "./PatientDeleteModel";
import { useDispatch } from "react-redux";
import { setUpdateData } from "../../../app/helper/helperSlice";
import { Link, useNavigate } from "react-router-dom";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import Tooltip from "@mui/material/Tooltip";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { withStyles } from "@mui/styles";
import PatientAllergiesPopover from "./patient_detail/PatientAllergiestPopover";
import {
    monthDayYearFormatter,
    registerDateFormatter,
} from "../../../app/helper/dateFormatter";
import { useUpdatePatientStatusMutation } from "../feature/patientApi";
import DeleteModel from "../../../app/components/model/DeleteModel";
// import PatientAlertBox from "./PatientAlertBox";

export default function PatientTableItem({ item, setOpen }) {
    const [openModel, setOpenModel] = useState(false);
    const [suspeneStatus, setSuspenseStatus] = useState(
        item?.status === "ACTIVE" ? true : false
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [updatePatientStatus] = useUpdatePatientStatusMutation();

    //console.log("patient", item);
    // const showDeleteModel = () => {
    //   setOpenModel(true);
    // };

    const handleDrawerOpen = (e, item) => {
        e.preventDefault();
        setOpen(true);
        dispatch(setUpdateData(item));
    };

    const patientDetailHandler = () => {
        navigate(`/patients/${item.name.replace(/\s/g, "")}`, {
            state: {
                data: item,
            },
        });
    };

    // function findPatinetAge(birthdate) {
    //   const today = new Date();
    //   const age =
    //     today.getFullYear() - birthdate.getFullYear() - today.getMonth() <
    //       birthdate.getMonth() ||
    //     (today.getMonth() === birthdate.getMonth() && today);
    //   return age;
    // }

    function calculateAge(dateOfBirth) {
        const dob = new Date(dateOfBirth);
        const currentDate = new Date();
        // Calculate the difference in years
        let age = currentDate.getFullYear() - dob.getFullYear();
        // Check if the birthday hasn't occurred yet this year
        if (
            currentDate.getMonth() < dob.getMonth() ||
            (currentDate.getMonth() === dob.getMonth() &&
                currentDate.getDate() < dob.getDate())
        ) {
            age--; // Subtract 1 from the age if the birthday hasn't occurred yet
        }
        return age;
    }
    const suspenseHandler = (e) => {
        e.preventDefault();
        setSuspenseStatus(e.target.checked);
        const status = {
            status: suspeneStatus ? "ACTIVE" : "SUSPENSE",
        };
        updatePatientStatus({
            id: item?._id,
            data: status,
        });
    };
    return (
        <>
            <TableRow key={item._id}>
                <TableCell
                    align="start"
                    sx={{
                        minWidth: "209px",
                    }}
                >
                    <Stack
                        direction={"row"}
                        alignItems={"center"}
                        spacing={2}
                        sx={{ cursor: "pointer" }}
                        onClick={patientDetailHandler}
                    >
                        <Box>
                            <Avatar
                                sx={{
                                    width: 50,
                                    height: 50,
                                    margin: "0 auto",
                                }}
                                variant="rounded"
                                src={item.profile}
                                alt="admin"
                            >
                                {item.name.charAt(0).toUpperCase()}
                            </Avatar>
                        </Box>
                        <Box>
                            <Typography variant="h6" gutterBottom>
                                {item.name}
                            </Typography>
                            <Typography gutterBottom>
                                {item.email ?? "N/A"}
                            </Typography>
                            <Typography> {item.phone}</Typography>
                        </Box>
                    </Stack>
                </TableCell>
                <TableCell align="center">
                    {calculateAge(item.dob)} Yrs
                    <Tooltip
                        arrow
                        title={monthDayYearFormatter(item?.dob)}
                    >
                        <IconButton
                            color="primary"
                            sx={{ cursor: "initial" }}
                        >
                            <CalendarMonthIcon />
                        </IconButton>
                    </Tooltip>
                </TableCell>
                <TableCell align="center">
                    <Tooltip arrow title={item.gender}>
                        {item.gender === "MALE" ? (
                            <MaleIcon color="primary" />
                        ) : (
                            <FemaleIcon color="secondary" />
                        )}
                    </Tooltip>
                </TableCell>
                <TableCell align="center">
                    <Tooltip
                        arrow
                        title={
                            item?.bloodType === "UNKNOWN"
                                ? "Unknown"
                                : ""
                        }
                    >
                        <Chip
                            label={
                                item?.bloodType === "UNKNOWN"
                                    ? "Unk"
                                    : item?.bloodType
                            }
                            color={
                                item?.bloodType === "UNKNOWN"
                                    ? "secondary"
                                    : "danger"
                            }
                        />
                    </Tooltip>
                </TableCell>
                <TableCell align="center">
                    {registerDateFormatter(item?.createdAt) ?? "N/A"}
                </TableCell>
                <TableCell align="center">
                    <Switch
                        onChange={suspenseHandler}
                        checked={suspeneStatus}
                    />
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
                        {/* <DeleteIcon
              sx={{ color: "red", cursor: "pointer" }}
              onClick={() => showDeleteModel()}
            /> */}
                    </Stack>
                </TableCell>
            </TableRow>
            <DeleteModel
                openModel={openModel}
                setOpenModel={setOpenModel}
            >
                <PatientDeleteModel id={item._id} />
            </DeleteModel>
        </>
    );
}
