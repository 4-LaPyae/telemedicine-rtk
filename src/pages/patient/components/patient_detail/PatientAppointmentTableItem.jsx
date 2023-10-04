import {
    Box,
    CircularProgress,
    InputAdornment,
    IconButton,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Alert,
    Avatar,
    Chip,
} from "@mui/material";
import React from "react";
import TableToolbar from "../../../../app/components/Table/TableToolbar";
import { NodataAnimation } from "../../../../app/components/lottieanimation/NodataAnimation";
import TableHeader from "../../../../app/components/Table/TableHeader";
const titles = [
    { id: 1, label: "TokenNo." },
    { id: 2, label: "DoctorName" },
    { id: 3, label: "Appt Date" },
    { id: 4, label: "Appt Detail" },
];
const PatientAppointmentTableItem = () => {
    return (
        <>
            <Box
                component={Paper}
                sx={{
                    width: "100%",
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.1)",
                }}
            >
                <TableToolbar>
                    <Stack>
                        <Box>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: "bold",
                                    color: "#068EA9",
                                }}
                            >
                                MEDICAL RECORDS
                            </Typography>
                        </Box>
                    </Stack>
                </TableToolbar>
                <TableContainer>
                    <Table>
                        <TableHeader headers={titles} />
                        {false ? (
                            <TableRow>
                                <TableCell
                                    colSpan={8}
                                    rowSpan={3}
                                    align="center"
                                >
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        ) : (
                            <>
                                {0 > 0 ? (
                                    <>
                                        <TableBody>
                                            {data?.data?.map(
                                                (row, index) => (
                                                    <TableRow
                                                        key={row._id}
                                                        sx={{
                                                            height: "70px",
                                                        }}
                                                    >
                                                        <TableCell align="center">
                                                            {
                                                                row.token
                                                            }
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Stack
                                                                direction={
                                                                    "row"
                                                                }
                                                                alignItems={
                                                                    "center"
                                                                }
                                                                spacing={
                                                                    1
                                                                }
                                                            >
                                                                <Brightness1
                                                                    style={{
                                                                        fontSize: 16,
                                                                    }}
                                                                    color={
                                                                        row
                                                                            .patient
                                                                            .onlineStatus ===
                                                                        1
                                                                            ? "success"
                                                                            : "grey"
                                                                    }
                                                                />
                                                                <Box>
                                                                    {
                                                                        row
                                                                            .patient
                                                                            .firstName
                                                                    }{" "}
                                                                    {
                                                                        row
                                                                            .patient
                                                                            .lastName
                                                                    }
                                                                </Box>
                                                            </Stack>
                                                        </TableCell>

                                                        <TableCell align="center">
                                                            <Stack
                                                                direction={
                                                                    "row"
                                                                }
                                                                alignItems={
                                                                    "center"
                                                                }
                                                                spacing={
                                                                    1
                                                                }
                                                            >
                                                                <Brightness1
                                                                    style={{
                                                                        fontSize: 16,
                                                                    }}
                                                                    color={
                                                                        row
                                                                            .doctor
                                                                            ?.onlineStatus ===
                                                                        1
                                                                            ? "success"
                                                                            : "grey"
                                                                    }
                                                                />
                                                                <Box>
                                                                    {row.doctorId !=
                                                                    null
                                                                        ? row
                                                                              .doctor
                                                                              .firstName +
                                                                          " " +
                                                                          row
                                                                              .doctor
                                                                              .lastName
                                                                        : "N/A"}
                                                                </Box>
                                                            </Stack>
                                                        </TableCell>

                                                        <TableCell align="center">
                                                            <Chip
                                                                label={
                                                                    row.status ===
                                                                    "ACCEPT"
                                                                        ? "EXAMINING"
                                                                        : row.status
                                                                }
                                                                color={
                                                                    row.status ===
                                                                    "COMPLETE"
                                                                        ? "success"
                                                                        : row.status ===
                                                                          "PENDING"
                                                                        ? "warning"
                                                                        : "info"
                                                                }
                                                            />
                                                        </TableCell>
                                                        {/* <TableCell align="center">
                                                          {moment(
                                                              row.consultantTime
                                                          ).format(
                                                              'yyyy-MM-DD hh:mm a'
                                                          )}
                                                      </TableCell> */}
                                                    </TableRow>
                                                )
                                            )}
                                        </TableBody>

                                        {/* <TableFooterPagination
                        rowsPerPageOptions={[5, 10]}
                        tableList={data?.total}
                        rowsPerPage={arowsPerPage}
                        page={apage}
                        handleChangePage={handleChangeAppointmentPage}
                        handleChangeRowsPerPage={
                          handleChangeAppointmentRowsPerPage
                        }
                      /> */}
                                    </>
                                ) : (
                                    <>
                                        <TableRow>
                                            <TableCell colSpan={4}>
                                                <NodataAnimation />
                                            </TableCell>
                                        </TableRow>
                                    </>
                                )}
                            </>
                        )}
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
};
export default PatientAppointmentTableItem;
