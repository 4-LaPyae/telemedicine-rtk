import { useState } from "react";
import {
    Box,
    Paper,
    Select,
    MenuItem,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
} from "@mui/material";
import TableToolbar from "../../app/components/Table/TableToolbar";
import { useGetPatientsQuery } from "./feature/patientApi";
import PatientDrawer from "./components/PatientDrawer";
import PatientTableItem from "../patient/components/PatientTableItem";
import TableFooterPagination from "../../app/components/Table/TableFooterPagination";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Csv from "../../app/components/ReactCsv/CSV";
import SimpleInput from "../../app/components/SimpleInput";
import { dateFormatter } from "../../app/helper/dateFormatter";
import DateRangePickerComponent from "../../app/components/DateRangePicker/DateRangePickerComponent";
import FilterComponent from "../../app/components/FIlter/FilterComponent";
import SearchFilterComponent from "../../app/components/FIlter/SearchFilterComponent";
import { LoadingAnimation } from "../../app/components/lottieanimation/LoadingAnimation";
import { NodataAnimation } from "../../app/components/lottieanimation/NodataAnimation";
import ModalComponent from "../../app/components/model/ModalComponent";
import PopoverComponent from "../../app/components/Popover/PopoverComponent";
import TableEmptyRow from "../../app/components/Table/TableEmptyRow";
import TableHeader from "../../app/components/Table/TableHeader";

const forModalTitle = {
    btnName: "Export",
    header: "Would you like to export Patient Data?",
    body: "This is body Message,you can edit what you want here.",
};

const tableHeaders = (gender, setGender, bloodType, setBloodType) => [
    {
        id: "profile",
        label: "Profile",
        align: "left",
        custon_width: "250px",
    },
    // { id: "phone", label: "Phone", align: "center" },
    {
        id: "dob",
        label: "DOB",
        align: "center",
        custon_width: "200px",
    },
    {
        id: "gender",
        label: !gender
            ? "gender"
            : gender === "All"
            ? "gender"
            : gender,
        myFilter: (
            <FilterComponent
                icon={<ArrowDropDownIcon />}
                lists={["All", "Male", "Female"]}
                setGender={setGender}
            />
        ),
        align: "center",
    },
    {
        id: "bloodtype",
        label: !bloodType
            ? "bloodtype"
            : bloodType === "All"
            ? "bloodtype"
            : bloodType,
        //label: "bloodtype",
        custon_width: "200px",
        myFilter: (
            <FilterComponent
                icon={<ArrowDropDownIcon />}
                lists={[
                    "All",
                    "O+",
                    "O-",
                    "A+",
                    "A-",
                    "B+",
                    "B-",
                    "AB+",
                    "AB-",
                    "UNKNOWN",
                ]}
                setBloodType={setBloodType}
            />
        ),
        align: "center",
    },
    {
        id: "register_date",
        label: "Register Date",
        align: "center",
        custon_width: "200px",
    },
    {
        id: "Success Action",
        label: "SUSPENSE ACTION",
        align: "center",
        custon_width: "200px",
    },
    {
        id: "action",
        label: "Action",
        align: "center",
        custon_width: "200px",
    },
];

const Patients = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filterNameOrPhone, setFilterNameOrPhone] = useState("");
    const [gender, setGender] = useState("");
    const [bloodType, setBloodType] = useState("");
    const [statusType, setStatusType] = useState("ACTIVE");
    const [open, setOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const handleOpen = () => {
        setModalOpen(true);
    };

    const handleClose = () => {
        setModalOpen(false);
    };

    const [date, setDate] = useState({
        startDate: "",
        endDate: "",
    });
    const titles = tableHeaders(
        gender,
        setGender,
        bloodType,
        setBloodType
    );
    const { data, isLoading } = useGetPatientsQuery({
        page: page + 1,
        limit: rowsPerPage,
        filterNameOrPhone: filterNameOrPhone,
        gender: gender === "All" ? "" : gender.toUpperCase(),
        bloodType:
            bloodType === "All" ? "" : encodeURIComponent(bloodType),
        statusType,
        registeredStartDate: !date.startDate
            ? ""
            : dateFormatter(date.startDate),
        registeredEndDate: !date.endDate
            ? ""
            : dateFormatter(date.endDate),
    });
    console.log(date);
    const emptyRows =
        page > 0
            ? rowsPerPage - data?.data?.patients?.length
            : rowsPerPage - data?.data?.patients?.length;
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
    };
    const handleChangeStatusType = (e) => {
        e.preventDefault();
        setStatusType(e.target.value);
    };
    const formattedPatientCsvTitle = [
        [
            "Name",
            "Email",
            "Phone",
            "Date of Birth",
            "Gender",
            "Register Date",
            "Completed Inhouse Appointments", //Appointment ကို မထည့်ထားပေးသေးဘူး လိုရင်ထည့်လို့ရအောင်
            "Completed Cooperate Appointments", //Appointment ကို မထည့်ထားပေးသေးဘူး လိုရင်ထည့်လို့ရအောင်
        ],
    ];
    const formattedPatientData = data?.data?.patients?.map(
        (patient) => [
            patient.name,
            patient.email,
            patient.phone,
            patient.dob,
            patient.gender,
            "N/A",
            patient.completeappintmentCount,
            patient.completeconsultantappintmentCount,
        ]
    );
    let csvPatientFormat;
    if (formattedPatientData) {
        csvPatientFormat = formattedPatientCsvTitle.concat(
            formattedPatientData
        );
    }
    console.log("date", date);

    return (
        <>
            <Box component={Paper} sx={{ padding: "10px 0" }}>
                <TableToolbar>
                    <Stack
                        direction={"row"}
                        justifyContent={"space-between"}
                        paddingBottom={2}
                    >
                        <Box>
                            <Typography
                                variant="h5"
                                sx={{ fontWeight: "bold" }}
                            >
                                Patient List
                            </Typography>
                            <Typography variant="body1">
                                See information about the patient
                            </Typography>
                        </Box>
                        <ModalComponent
                            open={modalOpen}
                            handleClose={handleClose}
                            handleOpen={handleOpen}
                            global_title={forModalTitle}
                        >
                            {csvPatientFormat && (
                                <Csv
                                    data={csvPatientFormat}
                                    handleClose={handleClose}
                                    filename="Patient list"
                                />
                            )}
                        </ModalComponent>
                    </Stack>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems={"center"}
                        // spacing={2}
                        sx={{
                            flex: "1 1 100%",
                            margin: "0px 0px 30px 0px",
                        }}
                    >
                        <Box>
                            <Stack
                                direction={"row"}
                                spacing={5}
                                alignItems={"center"}
                            >
                                <Box width={200}>
                                    <SearchFilterComponent
                                        placeholderName={
                                            "Name Or Phone"
                                        }
                                        setFilterValue={
                                            setFilterNameOrPhone
                                        }
                                    />
                                </Box>
                                <Box>
                                    <Select
                                        labelId="demo-simple-select-autowidth-label"
                                        id="demo-simple-select-autowidth"
                                        value={statusType}
                                        input={
                                            <SimpleInput fullwidth />
                                        }
                                        onChange={
                                            handleChangeStatusType
                                        }
                                        autoWidth
                                        // label="Age"
                                    >
                                        <MenuItem value={"ACTIVE"}>
                                            All Patients
                                        </MenuItem>
                                        <MenuItem value={"DELETE"}>
                                            Deleted Patients
                                        </MenuItem>
                                    </Select>
                                </Box>
                                <Box>
                                    <PopoverComponent
                                        setDate={setDate}
                                        value={2}
                                    >
                                        <DateRangePickerComponent />
                                    </PopoverComponent>
                                </Box>
                            </Stack>
                        </Box>
                        <Stack direction={"row"} spacing={3}>
                            <PatientDrawer
                                open={open}
                                setOpen={setOpen}
                            />
                        </Stack>
                    </Stack>
                </TableToolbar>
                <TableContainer>
                    <Table>
                        <TableHeader headers={titles} />
                        {isLoading ? (
                            <TableRow>
                                <TableCell
                                    colSpan={10}
                                    rowSpan={6}
                                    align="center"
                                >
                                    <LoadingAnimation />
                                </TableCell>
                            </TableRow>
                        ) : (
                            <>
                                {data?.data?.patients.length > 0 ? (
                                    <>
                                        <TableBody>
                                            {data?.data?.patients.map(
                                                (row, index) => (
                                                    <PatientTableItem
                                                        item={row}
                                                        key={index}
                                                        setOpen={
                                                            setOpen
                                                        }
                                                    />
                                                )
                                            )}
                                            <TableEmptyRow
                                                emptyRows={emptyRows}
                                                colSpan={7}
                                            />
                                        </TableBody>
                                        <TableFooterPagination
                                            rowsPerPageOptions={[
                                                10, 20, 30,
                                            ]}
                                            tableList={
                                                data?.data?.total
                                            }
                                            rowsPerPage={rowsPerPage}
                                            page={page}
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
                                            <TableCell colSpan={9}>
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

export default Patients;
