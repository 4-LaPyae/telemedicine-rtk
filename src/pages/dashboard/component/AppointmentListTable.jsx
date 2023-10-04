import React, { useEffect, useState } from "react";
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
import TableToolbar from "../../../app/components/Table/TableToolbar";
import TableFooterPagination from "../../../app/components/Table/TableFooterPagination";
import { Brightness1 } from "@mui/icons-material";
import SimpleInput from "../../../app/components/SimpleInput";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { errorAlert } from "../../../app/components/Alert/ToastAlertBox";
import { useGetAppointmentsQuery } from "../feature/dashboardApi";
import { dateFormatter } from "../../../app/helper/dateFormatter";
import DateRangePickerComponent from "../../../app/components/DateRangePicker/DateRangePickerComponent";
import FilterComponent from "../../../app/components/FIlter/FilterComponent";
import { NodataAnimation } from "../../../app/components/lottieanimation/NodataAnimation";
import PopoverComponent from "../../../app/components/Popover/PopoverComponent";
import TableEmptyRow from "../../../app/components/Table/TableEmptyRow";
import TableHeader from "../../../app/components/Table/TableHeader";

const tableHeaders = (value, setValue) => {
    return [
        { id: 3, label: "TokenNo." },
        { id: 1, label: "PatientName" },
        { id: 2, label: "DoctorName" },
        {
            id: "status",
            label: !value
                ? "status"
                : value === "Default"
                ? "status"
                : value,
            myFilter: (
                <FilterComponent
                    icon={<ArrowDropDownIcon />}
                    lists={["Pending", "Complete", "Accept"]}
                    setOnlineStatus={setValue}
                />
            ),
        },
    ];
};
const AppointmentListTable = () => {
    const [value, setValue] = useState("");
    const [paramData, setParamData] = useState({
        page: 1,
        rowsPerPage: 10,
        pName: "",
        dName: "",
        token: "",
        status: "",
    });
    const [date, setDate] = useState({ startDate: "", endDate: "" });

    const titles = tableHeaders(value, setValue);

    //console.log({ value });
    // const handleFilterChange = (val) => {
    //   setFilter((prev) => ({ ...prev, ...val }));
    // };
    const { data, isLoading } = useGetAppointmentsQuery({
        page: paramData.page,
        limit: paramData.rowsPerPage,
        pName: paramData.pName,
        dName: paramData.dName,
        token: paramData.token,
        status: paramData.status,
        startDate: !date.startDate
            ? ""
            : dateFormatter(date.startDate),
        endDate: !date.endDate ? "" : dateFormatter(date.endDate),
    });
    console.log(data);

    const emptyRows =
        paramData.page > 0
            ? paramData.rowsPerPage - data?.appointments?.length
            : paramData.rowsPerPage - data?.appointments?.length;
    const handleChangeAppointmentPage = (event, newPage) => {
        setParamData({ ...paramData, page: newPage });
    };

    const handleChangeAppointmentRowsPerPage = (event) => {
        setParamData({
            ...paramData,
            rowsPerPage: parseInt(event.target.value, 10),
        });
    };

    return (
        <Box
            component={Paper}
            sx={{
                padding: "10px 5px",
                width: "50%",
                borderRadius: "10px",
                boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.1)",
            }}
        >
            <TableToolbar>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems={"center"}
                >
                    <Box>
                        <Stack
                            direction={"row"}
                            spacing={5}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                        >
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: "bold",
                                    color: "#068EA9",
                                }}
                            >
                                Appointment
                            </Typography>
                            <Box>
                                <PopoverComponent
                                    setDate={setDate}
                                    value={1}
                                >
                                    <DateRangePickerComponent />
                                </PopoverComponent>
                            </Box>
                        </Stack>
                        <Stack
                            direction={"row"}
                            justifyContent={"space-around"}
                            spacing={5}
                            alignItems={"center"}
                            mt={2}
                            mb={2}
                        >
                            <Box>
                                <SimpleInput
                                    fullwidth
                                    placeholder="Doctor Name"
                                    // onChange={(e) => {
                                    //   handleFilterChange({
                                    //     doctorName: e.target.value,
                                    //   });
                                    //}}
                                    startAdornment={
                                        <InputAdornment>
                                            <IconButton disabled>
                                                <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </Box>
                            <Box>
                                <SimpleInput
                                    fullwidth
                                    placeholder="Patient Name"
                                    // onChange={(e) => {
                                    //   handleFilterChange({
                                    //     patientName: e.target.value,
                                    //   });
                                    // }}
                                    startAdornment={
                                        <InputAdornment>
                                            <IconButton disabled>
                                                <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </Box>
                            <Box>
                                <SimpleInput
                                    fullwidth
                                    placeholder="Token No"
                                    // onChange={(e) => {
                                    //   handleFilterChange({
                                    //     tokenNo: e.target.value,
                                    //   });
                                    // }}
                                    // onKeyPress={(event) => {
                                    //   if (!/[0-9]/.test(event.key)) {
                                    //     event.preventDefault();
                                    //     errorAlert("Please Type English number Only.");
                                    //   }
                                    // }}
                                    startAdornment={
                                        <InputAdornment>
                                            <IconButton disabled>
                                                <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </Box>
                        </Stack>
                    </Box>
                </Stack>
            </TableToolbar>
            <TableContainer>
                <Table>
                    <TableHeader headers={titles} />
                    {isLoading ? (
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
                            {data?.data?.length > 0 ? (
                                <>
                                    <TableBody>
                                        {data?.data?.map((row) => (
                                            <TableRow
                                                key={row._id}
                                                sx={{
                                                    height: "70px",
                                                }}
                                            >
                                                <TableCell align="center">
                                                    {row.token}
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Stack
                                                        direction={
                                                            "row"
                                                        }
                                                        alignItems={
                                                            "center"
                                                        }
                                                        spacing={1}
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
                                                        spacing={1}
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
                                        ))}
                                        {emptyRows > 0 && (
                                            <TableEmptyRow
                                                emptyRows={emptyRows}
                                                colSpan={6}
                                                hval={70}
                                            />
                                        )}
                                    </TableBody>

                                    <TableFooterPagination
                                        rowsPerPageOptions={[5, 10]}
                                        tableList={data?.total}
                                        rowsPerPage={
                                            paramData.arowsPerPage
                                        }
                                        page={paramData.page}
                                        handleChangePage={
                                            handleChangeAppointmentPage
                                        }
                                        handleChangeRowsPerPage={
                                            handleChangeAppointmentRowsPerPage
                                        }
                                    />
                                </>
                            ) : (
                                <>
                                    <TableRow>
                                        <TableCell colSpan={6}>
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
    );
};

export default AppointmentListTable;
