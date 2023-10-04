import {
    Box,
    IconButton,
    InputAdornment,
    MenuItem,
    Paper,
    Select,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
} from "@mui/material";
import { useState } from "react";
import TableToolbar from "../../../../app/components/Table/TableToolbar";
import SimpleInput from "../../../../app/components/SimpleInput";
import SearchIcon from "@mui/icons-material/Search";
// import { useDebounce } from "use-debounce";
import { useGetCoDoctorsQuery } from "../../feature/doctorApi";
import DoctorCoTableItem from "./DoctorCoTableItem";
import DoctorCoDrawer from "./DoctorCoDrawer";
import TableFooterPagination from "../../../../app/components/Table/TableFooterPagination";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { dateFormatter } from "../../../../app/helper/dateFormatter";
import Csv from "../../../../app/components/ReactCsv/CSV";
import CloseIcon from "@mui/icons-material/Close";
import DateRangePickerComponent from "../../../../app/components/DateRangePicker/DateRangePickerComponent";
import FilterComponent from "../../../../app/components/FIlter/FilterComponent";
import { LoadingAnimation } from "../../../../app/components/lottieanimation/LoadingAnimation";
import { NodataAnimation } from "../../../../app/components/lottieanimation/NodataAnimation";
import ModalComponent from "../../../../app/components/model/ModalComponent";
import PopoverComponent from "../../../../app/components/Popover/PopoverComponent";
import TableEmptyRow from "../../../../app/components/Table/TableEmptyRow";
import TableHeader from "../../../../app/components/Table/TableHeader";

const forModalTitle = {
    header: "Would you like to export Cooperate Doctor Data?",
    body: "This is body Message,you can edit what you want here.",
};

const tableHeaders = (
    gender,
    setGender
    // statusValue,
    // setStatusValue
) => [
    {
        id: "profile",
        label: "Profile",
        align: "left",
        custon_width: "25%",
    },
    // { id: "phone", label: "Phone", align: "left" },
    {
        id: "name",
        label: "Specialist",
        align: "left",
        custon_width: "15%",
    },
    // {
    //   id: "exp",
    //   label: "Exp.",
    //   align: "center",
    //   custon_width: "12%",
    // },
    {
        id: "ca",
        label: "completed appointment",
        align: "center",
        custon_width: "18%",
    },

    {
        id: "gender",
        label: !gender
            ? "gender"
            : gender === "All"
            ? "gender"
            : gender,
        align: "center",
        myFilter: (
            <FilterComponent
                icon={<ArrowDropDownIcon />}
                lists={["All", "Male", "Female"]}
                setGender={setGender}
            />
        ),
        custon_width: "16%",
    },

    {
        id: "suspense-action",
        label: "Suspense Action",
        align: "center",
        custon_width: "12%",
    },
    {
        id: "action",
        label: "Action",
        align: "center",
        custon_width: "12%",
    },
];

const DoctorCoTabPanel = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filterName, setFilterName] = useState("");
    const [name, setName] = useState("");
    const [statusType, setStatusType] = useState(0);
    const [open, setOpen] = useState(false);
    // const debouncedSearchQuery = useDebounce(filterName, 500);
    const [filterSpecialist, setFilterSpecialist] = useState("");
    const [specialist, setSpecialist] = useState("");
    // const debouncedSearchSpecialistQuery = useDebounce(
    //     filterSpecialist,
    //     500
    // );
    const [gender, setGender] = useState("");
    const [statusValue, setStatusValue] = useState("");
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
        statusValue,
        setStatusValue
    );

    const { data: coDoctors, isLoading } = useGetCoDoctorsQuery({
        page: page + 1,
        limit: rowsPerPage,
        // filterNameOrPhone: debouncedSearchQuery[0],
        filterNameOrPhone: filterName,
        type: 1,
        statusType: statusType,
        // filterSpecialist: debouncedSearchSpecialistQuery[0],
        filterSpecialist: filterSpecialist,
        filterGender: gender === "All" ? "" : gender.toUpperCase(),
        startDate: !date.startDate
            ? ""
            : dateFormatter(date.startDate),
        endDate: !date.endDate ? "" : dateFormatter(date.endDate),
    });

    const formattedCooperateTitle = [
        [
            "Name",
            "Email",
            "Phone",
            "Specialist",
            "Experience",
            "Completed Appointments",
        ],
    ];

    const formattedCooperateData = coDoctors?.data?.doctors?.map(
        (doc) => [
            doc.name,
            doc.email,
            doc.phone,
            doc.specialist.name,
            doc.experience,
            doc.completeappintmentCount,
        ]
    );

    // console.log(formattedCooperateData);

    let csvCoDocFormat;
    if (formattedCooperateData) {
        csvCoDocFormat = formattedCooperateTitle.concat(
            formattedCooperateData
        );
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows =
        page > 0
            ? rowsPerPage - coDoctors?.data?.doctors?.length
            : rowsPerPage - coDoctors?.data?.doctors?.length;
    const handleChange = (e) => {
        e.preventDefault();
        if (name.length === 1) {
            setFilterName("");
        }
        setName(e.target.value);
    };
    const handleEnter = (e) => {
        // console.log(e.key);
        if (e.key === "Enter") {
            setFilterName(e.target.value);
        }
    };

    const specialistHandleChange = (e) => {
        e.preventDefault();
        if (specialist.length === 1) {
            setFilterSpecialist("");
        }
        setSpecialist(e.target.value);
    };
    const handleSpecialistEnter = (e) => {
        // console.log(e.key);
        if (e.key === "Enter") {
            setFilterSpecialist(e.target.value);
        }
    };

    const handleChangeStatusType = (event) => {
        setStatusType(event.target.value);
    };
    return (
        <Box component={Paper} sx={{ padding: "10px 0px" }}>
            <TableToolbar>
                <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    paddingBottom={2}
                >
                    <Box sx={{ textAlign: "center" }}>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: "bold",
                            }}
                        >
                            Doctor List
                        </Typography>
                        <Typography variant="body1">
                            See Informations about the CoOperate
                            doctors
                        </Typography>
                    </Box>
                    <ModalComponent
                        global_title={forModalTitle}
                        open={modalOpen}
                        handleClose={handleClose}
                        handleOpen={handleOpen}
                    >
                        {csvCoDocFormat && (
                            <Csv
                                data={csvCoDocFormat}
                                handleClose={handleClose}
                                filename="CoOperate Doctor List"
                            />
                        )}
                    </ModalComponent>
                </Stack>
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
                            spacing={2}
                            alignItems={"center"}
                        >
                            <Box width={200}>
                                <SimpleInput
                                    fullwidth
                                    placeholder="Name or Phone"
                                    onChange={handleChange}
                                    onKeyPress={handleEnter}
                                    value={name}
                                    startAdornment={
                                        <InputAdornment>
                                            <IconButton disabled>
                                                <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    endAdornment={
                                        name.length > 0 && (
                                            <InputAdornment>
                                                <IconButton>
                                                    <CloseIcon
                                                        onClick={() => {
                                                            setName(
                                                                ""
                                                            );
                                                            setFilterName(
                                                                ""
                                                            );
                                                        }}
                                                    />
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }
                                />
                            </Box>
                            <Box width={200}>
                                <SimpleInput
                                    fullwidth
                                    placeholder="Specialist"
                                    onChange={specialistHandleChange}
                                    onKeyPress={handleSpecialistEnter}
                                    value={specialist}
                                    startAdornment={
                                        <InputAdornment>
                                            <IconButton disabled>
                                                <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    endAdornment={
                                        specialist.length > 0 && (
                                            <InputAdornment>
                                                <IconButton>
                                                    <CloseIcon
                                                        onClick={() => {
                                                            setSpecialist(
                                                                ""
                                                            );
                                                            setFilterSpecialist(
                                                                ""
                                                            );
                                                        }}
                                                    />
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }
                                />
                            </Box>
                            <Box>
                                <Select
                                    labelId="demo-simple-select-autowidth-label"
                                    id="demo-simple-select-autowidth"
                                    value={statusType}
                                    input={<SimpleInput />}
                                    onChange={handleChangeStatusType}
                                    autoWidth
                                >
                                    <MenuItem value={0}>
                                        All Doctors
                                    </MenuItem>
                                    <MenuItem value={1}>
                                        Deleted Doctors
                                    </MenuItem>
                                </Select>
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
                    </Box>
                    <Box>
                        <DoctorCoDrawer
                            open={open}
                            setOpen={setOpen}
                        />
                    </Box>
                </Stack>
            </TableToolbar>
            <TableContainer>
                <Table>
                    <TableHeader headers={titles} />
                    {isLoading ? (
                        <TableRow>
                            <TableCell colSpan={10} align="center">
                                <LoadingAnimation />
                            </TableCell>
                        </TableRow>
                    ) : (
                        <>
                            {coDoctors?.data?.doctors.length > 0 ? (
                                <>
                                    <TableBody>
                                        {coDoctors?.data.doctors.map(
                                            (row, index) => (
                                                <DoctorCoTableItem
                                                    statusType={
                                                        statusType
                                                    }
                                                    item={row}
                                                    key={index}
                                                    setOpen={setOpen}
                                                />
                                            )
                                        )}
                                        <TableEmptyRow
                                            emptyRows={emptyRows}
                                            colSpan={8}
                                        />
                                    </TableBody>
                                    <TableFooterPagination
                                        tableList={
                                            coDoctors?.data?.total
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
                                        <TableCell colSpan={8}>
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

export default DoctorCoTabPanel;
