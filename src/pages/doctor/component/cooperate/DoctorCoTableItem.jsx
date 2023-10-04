import {
    Avatar,
    Box,
    Chip,
    Stack,
    Switch,
    TableCell,
    TableRow,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { checkImageLink } from "../../../../app/helper/checkImage";
import { setUpdateData } from "../../../../app/helper/helperSlice";
import { useDispatch } from "react-redux";
import { OnlineStatus } from "../../../../app/components/Status/OnlineStatus";
import DoctorCoDeleteModel from "./DoctorCoDeleteModel";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import { useChangeCoDutyDocMutation } from "../../feature/doctorApi";
import WorkIcon from "@mui/icons-material/Work";
import DeleteModel from "../../../../app/components/model/DeleteModel";

const DoctorCoTableItem = ({ item, setOpen, statusType }) => {
    // console.log(item.status);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [openModel, setOpenModel] = useState(false);
    const [suspenseStatus, setSuspenseStatus] = useState(
        item.status === "ACTIVE" ? true : false
    );
    const [changeCoDutyDoc] = useChangeCoDutyDocMutation();
    const handleDrawerOpen = (e, item) => {
        e.preventDefault();
        setOpen(true);
        dispatch(setUpdateData(item));
    };
    const showDeleteModel = () => {
        setOpenModel(true);
    };
    const doctorDetailHandler = () => {
        navigate(`/doctors/${item.name.replace(/\s/g, "")}`, {
            state: {
                data: item,
            },
        });
    };

    const suspenseSwitchHandler = (e) => {
        e.preventDefault();
        setSuspenseStatus(e.target.checked);
        let dutyData;
        console.log(suspenseStatus);
        if (!suspenseStatus) {
            dutyData = {
                dutyStatus: "ON",
                status: "ACTIVE",
            };
        } else {
            dutyData = {
                dutyStatus: "ON",
                status: "SUSPENDED",
            };
        }
        console.log(dutyData);

        changeCoDutyDoc({
            data: dutyData,
            id: item._id,
            doctorType: "COOPERATE",
        });
    };

    return (
        <>
            <TableRow key={item._id}>
                <TableCell align="start">
                    <Stack
                        direction={"row"}
                        alignItems={"center"}
                        spacing={2}
                        sx={{ cursor: "pointer" }}
                        onClick={doctorDetailHandler}
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
                                    checkImageLink(
                                        item.profile,
                                        item.gender
                                    )
                                }
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
                            <Typography>{item.phone}</Typography>
                        </Box>
                    </Stack>
                </TableCell>
                {/* <TableCell align="left">{item.phone}</TableCell> */}
                <TableCell align="left">
                    <Stack>
                        <Typography>
                            {item.specialist.name ?? "N/A"}
                        </Typography>
                        <Typography>
                            {item.specialist.myName ?? "မရှိပါ"}
                        </Typography>
                        <div
                            style={{
                                // border: "1px solid #000",
                                backgroundColor: "#8b8bf9",
                                width: "115px",
                                borderRadius: "10px",
                                padding: "5px",
                                marginTop: "10px",
                            }}
                        >
                            <Stack
                                direction={"row"}
                                alignItems={"center"}
                                spacing={1}
                            >
                                <Tooltip title="Work Experience">
                                    <WorkIcon
                                        sx={{ color: "brown" }}
                                    />
                                </Tooltip>
                                <Typography fontSize={15}>
                                    {item.experience}
                                    {item.experience > 1
                                        ? "Years"
                                        : "Year"}
                                </Typography>
                            </Stack>
                        </div>
                    </Stack>
                </TableCell>
                {/* <TableCell align="center">
                    {item.experience}
                    {item.experience > 1 ? " Yrs" : "Yr"}
                </TableCell> */}
                <TableCell align="center">
                    {item.completeappintmentCount}
                </TableCell>
                <TableCell align="center">
                    {" "}
                    <Tooltip arrow title={item.gender}>
                        {item.gender === "MALE" ? (
                            <MaleIcon color="primary" />
                        ) : (
                            <FemaleIcon color="secondary" />
                        )}
                    </Tooltip>
                </TableCell>
                {/* <TableCell align="center">
          <OnlineStatus status={item.status} byNum={true} center={true} />
        </TableCell> */}
                {/* <TableCell align="center">
                    <Switch
                        onChange={(e) => {
                            setSuspenseStatus(e.target.checked);
                        }}
                        checked={suspenseStatus}
                    />
                </TableCell> */}
                <TableCell align="center">
                    <Switch
                        onChange={suspenseSwitchHandler}
                        checked={suspenseStatus}
                        disabled={statusType === 0 ? false : true}
                    />
                </TableCell>
                <TableCell align="center">
                    {statusType === 0 ? (
                        <Stack
                            direction={"row"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            spacing={2}
                        >
                            <EditIcon
                                sx={{
                                    color: "blue",
                                    cursor: "pointer",
                                }}
                                onClick={(e) =>
                                    handleDrawerOpen(e, item)
                                }
                            />
                            {/* <DeleteIcon
                                sx={{
                                    color: "red",
                                    cursor: "pointer",
                                }}
                                onClick={() => showDeleteModel()}
                            /> */}
                        </Stack>
                    ) : (
                        <p style={{ color: "red" }}>DELETED</p>
                    )}
                </TableCell>
            </TableRow>
            <DeleteModel
                openModel={openModel}
                setOpenModel={setOpenModel}
            >
                <DoctorCoDeleteModel id={item._id} />
            </DeleteModel>
        </>
    );
};

export default DoctorCoTableItem;
