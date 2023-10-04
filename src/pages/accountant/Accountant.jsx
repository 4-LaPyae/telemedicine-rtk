import { useState } from "react";
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
import TableToolbar from "../../app/components/Table/TableToolbar";
import TableFooterPagination from "../../app/components/Table/TableFooterPagination";
import AccountantTableItem from "./components/AccountantTableItem";
import Csv from "../../app/components/ReactCsv/CSV";
import {
    getAllSubscribedPatients,
    useGetAccountantQuery,
} from "./features/AccountantApi";
import {
    ChangeDate,
    changeDateTime,
} from "../../app/helper/changeDateandTimeFormat";
import { formatNumberWithCommas } from "../../app/helper/withComma";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteCsvData,
    setCsvData,
} from "../../app/helper/csvDataSlice";
import { LoadingAnimation } from "../../app/components/lottieanimation/LoadingAnimation";
import { NodataAnimation } from "../../app/components/lottieanimation/NodataAnimation";
import ModalComponent from "../../app/components/model/ModalComponent";
import TableHeader from "../../app/components/Table/TableHeader";
import SimpleInput from "../../app/components/SimpleInput";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
const title = [
    {
        id: "patientInfo",
        label: "Patient Info",
        align: "left",
        // custon_width: "15%",
    },
    {
        id: "packageInfo",
        label: "Package Info",
        align: "left",
        // custon_width: "15%",
    },
    {
        id: "subcribeDate",
        label: "Subcribe Date",
        align: "left",
        // custon_width: "15%",
    },
    {
        id: "ExpiresDate",
        label: "Expired Date",
        align: "left",
        // custon_width: "15%",
    },
    {
        id: "promocode",
        label: "PromoCode",
        align: "left",
        // custon_width: "15%",
    },
    {
        id: "totalPrice",
        label: "Total Price",
        align: "left",
        // custon_width: "15%",
    },
];

export default function Accountant() {
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [modalOpen, setModalOpen] = useState(false);
    const [phoneName, setPhoneName] = useState("");
    const [filterPhoneName, setFilterPhoneName] = useState("");
    const dispatch = useDispatch();
    const { csvData } = useSelector((state) => state.CsvSlice);

    const { data, isLoading } = useGetAccountantQuery({
        page: page + 1,
        limit: limit,
        filterPhoneName,
        packageId: "",
        promoCode: "",
    });
    const handleOpen = () => {
        setModalOpen(true);
        getAllSubscribedPatients().then((result) => {
            dispatch(setCsvData(result.data));
        });
    };

    const handleClose = () => {
        setModalOpen(false);
        dispatch(deleteCsvData());
    };
    const handleChange = (e) => {
        e.preventDefault();
        if (name.length === 1) {
            setFilterPhoneName("");
        }
        setPhoneName(e.target.value);
    };
    const handleEnter = (e) => {
        // console.log(e.key);
        if (e.key === "Enter") {
            setFilterPhoneName(e.target.value);
        }
    };

    const formattedSubscribeTitle = [
        [
            "PatientName",
            "Patient Phone Number",
            "Patient Registar Date",
            "Package Name",
            "Subscribe Date",
            "Subscribe Time",
            "Expired Date",
            "Expired Time",
            "PromoCode",
            "Total Price",
        ],
    ];
    const forModalTitle = {
        header: "Would you like to export Subscribe Patient List?",
        body: (
            <div>
                {/* <h3>Your Data will contain</h3>
                <ul>
                    {formattedSubscribeTitle.map((title) =>
                        title.map((smTitle, index) => (
                            <li key={index}>{smTitle}</li>
                        ))
                    )}
                </ul> */}
            </div>
        ),
    };
    const formattedSubcribeData = csvData?.subscribePackages.map(
        (doc) => [
            doc.patient.name,
            doc.patient.phone,
            ChangeDate(doc.patient.createdAt),
            doc.package.name,
            changeDateTime(doc.subscribeDate).date,
            changeDateTime(doc.subscribeDate).time,
            changeDateTime(doc.expireDate).date,
            changeDateTime(doc.expireDate).time,
            doc.promocode ?? "N/A",
            `${formatNumberWithCommas(doc.totalPrice)} MMK`,
        ]
    );
    let csvSubscribePatientFormat;
    if (formattedSubcribeData) {
        csvSubscribePatientFormat = formattedSubscribeTitle.concat(
            formattedSubcribeData
        );
    }
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setLimit(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Box component={Paper} sx={{ padding: "20px 5px" }}>
            <TableToolbar>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems={"center"}
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
                            <Box>
                                <Typography
                                    variant="h5"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    Subscribed Patients List
                                </Typography>
                                <Typography variant="body1">
                                    See information about the
                                    subscribe patients
                                </Typography>
                            </Box>
                            <Box>
                                <Box width={200}>
                                    <SimpleInput
                                        fullwidth
                                        placeholder="Name or Phone"
                                        onChange={handleChange}
                                        onKeyPress={handleEnter}
                                        value={phoneName}
                                        startAdornment={
                                            <InputAdornment>
                                                <IconButton disabled>
                                                    <SearchIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        endAdornment={
                                            phoneName.length > 0 && (
                                                <InputAdornment>
                                                    <IconButton>
                                                        <CloseIcon
                                                            onClick={() => {
                                                                setPhoneName(
                                                                    ""
                                                                );
                                                                setFilterPhoneName(
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
                            </Box>
                        </Stack>
                    </Box>
                    <Box>
                        <ModalComponent
                            global_title={forModalTitle}
                            open={modalOpen}
                            handleClose={handleClose}
                            handleOpen={handleOpen}
                        >
                            {csvSubscribePatientFormat ? (
                                <Csv
                                    data={csvSubscribePatientFormat}
                                    handleClose={handleClose}
                                    filename="SubscribedPatientList"
                                />
                            ) : (
                                <Box width={"100%"}>
                                    <Button
                                        fullWidth
                                        disabled
                                        variant="outlined"
                                    >
                                        Loading
                                    </Button>
                                </Box>
                            )}
                        </ModalComponent>
                    </Box>
                </Stack>
            </TableToolbar>
            <TableContainer>
                <Table>
                    <TableHeader headers={title} />

                    {isLoading ? (
                        <TableRow>
                            <TableCell
                                colSpan={7}
                                rowSpan={7}
                                align="center"
                            >
                                <LoadingAnimation />
                            </TableCell>
                        </TableRow>
                    ) : (
                        <>
                            {data?.data?.subscribePackages?.length >
                            0 ? (
                                <>
                                    <TableBody>
                                        {data?.data.subscribePackages?.map(
                                            (row, index) => (
                                                <AccountantTableItem
                                                    item={row}
                                                    key={index}
                                                    // setOpen={setOpen}
                                                />
                                            )
                                        )}
                                    </TableBody>
                                    <TableFooterPagination
                                        tableList={data?.data.total}
                                        rowsPerPage={limit}
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
                                        <TableCell colSpan={7}>
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
}
