import React from "react";
import { Chip, Stack, TableCell, TableRow } from "@mui/material";

const CoAppointmentTableItem = ({ item }) => {
    // console.log(item.requestTime);
    return (
        <>
            <TableRow key={item._id}>
                <TableCell align="left">{item.token}</TableCell>
                <TableCell align="left">
                    {item.patientInfo.name} <br />
                    <span style={{ color: "Gray" }}>
                        {item?.patientInfo?.phone ?? "N/A"}
                    </span>
                </TableCell>
                <TableCell align="left">
                    {item.doctorId ? item.doctorsInfo.name : "N/A"}
                    <br />
                    <span style={{ color: "Gray" }}>
                        {item?.doctorsInfo?.phone ?? "N/A"}
                    </span>
                </TableCell>
                <TableCell align="left">
                    {item.status == "COMPLETE" ? (
                        <Chip label={item.status} color="primary" />
                    ) : item.status == "PENDING" ? (
                        <Chip label={item.status} color="warning" />
                    ) : (
                        <Chip label={item.status} color="success" />
                    )}
                </TableCell>
                <TableCell align="left">
                    <Stack direction={"column"} spacing={1}>
                        <p>{item.appointmentTime.split(" ")[0]}</p>
                        <p>
                            {`${item.appointmentTime.split(" ")[1]}`}
                        </p>
                    </Stack>
                </TableCell>
            </TableRow>
        </>
    );
};

export default CoAppointmentTableItem;
