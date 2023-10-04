import { useEffect, useState } from "react";
import {
    Box,
    CircularProgress,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
    Avatar,
} from "@mui/material";
import TableToolbar from "../../../app/components/Table/TableToolbar";
import TableFooterPagination from "../../../app/components/Table/TableFooterPagination";
import { checkImageLink } from "../../../app/helper/checkImage";
import { OnlineStatus } from "../../../app/components/Status/OnlineStatus";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useGetInhouseDoctorsQuery } from "../feature/dashboardApi";
import { useDispatch } from "react-redux";
import { setOnlineTotal } from "../feature/dashboardSlice";
import FilterComponent from "../../../app/components/FIlter/FilterComponent";
import { NodataAnimation } from "../../../app/components/lottieanimation/NodataAnimation";
import TableEmptyRow from "../../../app/components/Table/TableEmptyRow";
import TableHeader from "../../../app/components/Table/TableHeader";

const tableHeaders = (value, setValue) => {
    return [
        { id: "profile", label: "Profile", align: "left" },
        { id: "fullname", label: "FullName", align: "center" },
        {
            id: "status",
            label: !value
                ? "status"
                : value === "All"
                ? "status"
                : value,
            myFilter: (
                <FilterComponent
                    icon={<ArrowDropDownIcon />}
                    lists={["All", "Online", "Offline"]}
                    setOnlineStatus={setValue}
                />
            ),
        },
        { id: "phone", label: "Phone", align: "center" },
        { id: "gender", label: "Gender", align: "center" },
    ];
};
const DoctorListTable = () => {
    const [paramData, setParamDAta] = useState({
        page: 0,
        rowsPerPage: 10,
        status: "",
    });
    const [value, setValue] = useState("");
    const { data, isLoading } = useGetInhouseDoctorsQuery({
        page: paramData.page + 1,
        limit: paramData.rowsPerPage,
        onlineStatus:
            value === ""
                ? ""
                : value === "Online"
                ? "ON"
                : value === "All"
                ? ""
                : "OFF",
    });
    const dispatch = useDispatch();
    const titles = tableHeaders(value, setValue);

    const handleChangePage = (event, newPage) => {
        setParamDAta({ ...paramData, page: newPage });
    };
    const handleChangeRowsPerPage = (event) => {
        setParamDAta({
            ...paramData,
            rowsPerPage: parseInt(event.target.value, 10),
        });
    };
    //console.log(data);
    const emptyRows =
        paramData.page > 0
            ? paramData.rowsPerPage - data?.doctors?.length
            : paramData.rowsPerPage - data?.doctors?.length;

    useEffect(() => {
        //console.log("total" + data?.total);
        dispatch(setOnlineTotal(data?.total));
    }, [data]);
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
                        >
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: "bold",
                                    color: "#068EA9",
                                }}
                            >
                                Inhouse Doctors
                            </Typography>
                        </Stack>
                        {/* <Online /> */}
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
                            {data?.doctors?.length > 0 ? (
                                <>
                                    <TableBody>
                                        {data?.doctors?.map((row) => (
                                            <TableRow
                                                key={row._id}
                                                sx={{
                                                    height: "70px",
                                                }}
                                            >
                                                <TableCell align="start">
                                                    <Stack
                                                        direction={
                                                            "row"
                                                        }
                                                        alignItems={
                                                            "center"
                                                        }
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
                                                                    row.profile ??
                                                                    checkImageLink(
                                                                        row.profile,
                                                                        row.gender
                                                                    )
                                                                }
                                                                alt="admin"
                                                            ></Avatar>
                                                        </Box>
                                                    </Stack>
                                                </TableCell>
                                                <TableCell align="center">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="center">
                                                    <OnlineStatus
                                                        status={
                                                            row.dutyStatus
                                                        }
                                                        byNum={false}
                                                        center={false}
                                                    />
                                                </TableCell>
                                                <TableCell align="center">
                                                    {row.phone ??
                                                        "N/A"}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {row.gender}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        <TableEmptyRow
                                            emptyRows={emptyRows}
                                            colSpan={5}
                                            hval={70}
                                        />
                                    </TableBody>
                                    <TableFooterPagination
                                        rowsPerPageOptions={[10, 20]}
                                        tableList={data?.total}
                                        rowsPerPage={
                                            paramData.rowsPerPage
                                        }
                                        page={paramData.page}
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
                                        <TableCell colSpan={5}>
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

export default DoctorListTable;
