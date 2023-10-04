import React, { useEffect, useState } from "react";
import { useGetInAppointmentQuery } from "../../feature/appointmentApi";
import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
} from "@mui/material";
import TableToolbar from "../../../../app/components/Table/TableToolbar";
import SimpleInput from "../../../../app/components/SimpleInput";
import SearchIcon from "@mui/icons-material/Search";
import { useDebounce } from "use-debounce";
import InAppointmentTableItem from "./InAppointmentTableItem";
import TableFooterPagination from "../../../../app/components/Table/TableFooterPagination";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { dateFormatter } from "../../../../app/helper/dateFormatter";
import { errorAlert } from "../../../../app/components/Alert/ToastAlertBox";
import { ToastContainer } from "react-toastify";
import DateRangePickerComponent from "../../../../app/components/DateRangePicker/DateRangePickerComponent";
import FilterComponent from "../../../../app/components/FIlter/FilterComponent";
import SearchFilterComponent from "../../../../app/components/FIlter/SearchFilterComponent";
import { LoadingAnimation } from "../../../../app/components/lottieanimation/LoadingAnimation";
import { NodataAnimation } from "../../../../app/components/lottieanimation/NodataAnimation";
import PopoverComponent from "../../../../app/components/Popover/PopoverComponent";
import TableEmptyRow from "../../../../app/components/Table/TableEmptyRow";
import TableHeader from "../../../../app/components/Table/TableHeader";

const titleFunction = (appointmentStatus, setAppintmentStatus) => {
    return [
        {
            id: "token",
            label: "Token",
            align: "left",
            custon_width: "200px",
        },
        {
            id: "patient",
            label: "Patient Name",
            align: "left",
            custon_width: "250px",
        },
        {
            id: "doctor",
            label: "Doctor Name",
            align: "left",
            custon_width: "250px",
        },
        {
            id: "status",
            align: "left",
            label: !appointmentStatus
                ? "status"
                : appointmentStatus === "All"
                ? "status"
                : appointmentStatus,
            myFilter: (
                <FilterComponent
                    icon={<ArrowDropDownIcon />}
                    lists={["All", "Pending", "Complete", "Accept"]}
                    setAppintmentStatus={setAppintmentStatus}
                />
            ),
            custon_width: "250px",
            stackPosition: "flex-start",
        },
        {
            id: "time",
            label: "Requested Time",
            align: "left",
            custon_width: "250px",
        },
    ];
};

const InAppointmentTabPanel = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filterPatientNameOrPhone, setFilterPatientNameOrPhone] =
        useState("");
    const [filterDoctorNameOrPhone, setFilterDoctorNameOrPhone] =
        useState("");
    const [filterToken, setFilterToken] = useState("");
    const [date, setDate] = useState({
        startDate: "",
        endDate: "",
    });
    const [appointmentStatus, setAppintmentStatus] = useState("");
    const titles = titleFunction(
        appointmentStatus,
        setAppintmentStatus
    );

    const { data: inAppoData, isLoading } = useGetInAppointmentQuery({
        page: page + 1,
        limit: rowsPerPage,
        docNameAndPhone: filterDoctorNameOrPhone,
        ptNameAndPhone: filterPatientNameOrPhone,
        token: filterToken,
        startDate: !date.startDate
            ? ""
            : dateFormatter(date.startDate),
        endDate: !date.endDate ? "" : dateFormatter(date.endDate),
        status:
            appointmentStatus === "All"
                ? ""
                : appointmentStatus.toUpperCase(),
    });

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows =
        page > 0
            ? rowsPerPage - inAppoData?.data?.appointments?.length
            : rowsPerPage - inAppoData?.data?.appointments?.length;

    const searchItems = [
        {
            id: 1,
            name: "Patient Name and Phone",
            func: setFilterDoctorNameOrPhone,
        },
        {
            id: 2,
            name: "Doctor Name and Phone",
            func: setFilterPatientNameOrPhone,
        },
        {
            id: 3,
            name: "Token No.",
            func: setFilterToken,
        },
    ];
    return (
        <>
            <ToastContainer />
            <Box component={Paper} sx={{ padding: "25px 0px" }}>
                <TableToolbar>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems={"center"}
                        sx={{
                            flex: "1 1 100%",
                            margin: "0px 0 30px 0",
                        }}
                    >
                        <Box>
                            <Stack
                                direction={"row"}
                                spacing={5}
                                alignItems={"center"}
                            >
                                <Box>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontWeight: "bold",
                                            marginBottom: "8px",
                                        }}
                                    >
                                        Inhouse Appointment
                                    </Typography>
                                    <Typography variant="body1">
                                        See informations about the
                                        inhouse appointment list
                                    </Typography>
                                </Box>
                            </Stack>
                        </Box>
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
                        spacing={4}
                        marginBottom={4}
                    >
                        {searchItems.map((i) => (
                            <Box width={250} key={i.id}>
                                <SearchFilterComponent
                                    placeholderName={i.name}
                                    setFilterValue={i.func}
                                />
                            </Box>
                        ))}
                    </Stack>
                </TableToolbar>
                <TableContainer>
                    <Table>
                        <TableHeader headers={titles} />
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    <LoadingAnimation />
                                </TableCell>
                            </TableRow>
                        ) : (
                            <>
                                {inAppoData?.data?.appointments
                                    ?.length > 0 ? (
                                    <>
                                        <TableBody>
                                            {inAppoData?.data.appointments.map(
                                                (row, index) => (
                                                    <InAppointmentTableItem
                                                        item={row}
                                                        key={index}
                                                    />
                                                )
                                            )}
                                            <TableEmptyRow
                                                emptyRows={emptyRows}
                                                colSpan={5}
                                                hval={63}
                                            />
                                        </TableBody>
                                        <TableFooterPagination
                                            tableList={
                                                inAppoData?.data
                                                    ?.total
                                            }
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            rowsPerPageOptions={[
                                                10, 15, 20,
                                            ]}
                                            handleChangePage={
                                                handleChangePage
                                            }
                                            handleChangeRowsPerPage={
                                                handleChangeRowsPerPage
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
        </>
    );
};

export default InAppointmentTabPanel;
