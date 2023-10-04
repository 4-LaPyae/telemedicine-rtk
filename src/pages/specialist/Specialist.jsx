import {
    IconButton,
    InputAdornment,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useState } from "react";
// import TableToolbar from "../../../app/components/Table/TableToolbar";
import TableToolbar from "../../app/components/Table/TableToolbar";
import { useDebounce } from "use-debounce";

import { useGetSpecialistsQuery } from "./feature/specialistApi";
import SpecialistTableItem from "./components/SpecialistTableItem";
import SimpleInput from "../../app/components/SimpleInput";
import SearchIcon from "@mui/icons-material/Search";
import SpecialistDrawer from "./components/SpecialistDrawer";
import TableFooterPagination from "../../app/components/Table/TableFooterPagination";
import SearchFilterComponent from "../../app/components/FIlter/SearchFilterComponent";
import { LoadingAnimation } from "../../app/components/lottieanimation/LoadingAnimation";
import { NodataAnimation } from "../../app/components/lottieanimation/NodataAnimation";
import TableEmptyRow from "../../app/components/Table/TableEmptyRow";
import TableHeader from "../../app/components/Table/TableHeader";

const Specialist = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filterName, setFilterName] = useState("");
    const [open, setOpen] = useState(false);

    const { data: specialists, isLoading } = useGetSpecialistsQuery(
        {
            page: page + 1,
            limit: rowsPerPage,
            filterName: filterName,
        }
        //{ refetchOnMountOrArgChange: true }
    );

    console.log({ specialists });

    const emptyRows =
        page > 0
            ? rowsPerPage - specialists?.data?.specialists?.length
            : rowsPerPage - specialists?.data?.specialists?.length;

    console.log({ emptyRows });

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Box component={Paper} sx={{ padding: "20px 5px" }}>
            <TableToolbar>
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
                            <Box>
                                <Typography
                                    variant="h5"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    Specialist
                                </Typography>
                                <Typography variant="body1">
                                    See information about the
                                    Specialist
                                </Typography>
                            </Box>
                            <Box width={200}>
                                <SearchFilterComponent
                                    placeholderName={"Name..."}
                                    setFilterValue={setFilterName}
                                />
                            </Box>
                        </Stack>
                    </Box>
                    <Box>
                        <SpecialistDrawer
                            open={open}
                            setOpen={setOpen}
                        />
                    </Box>
                </Stack>
            </TableToolbar>
            <TableContainer>
                <Table>
                    <TableHeader headers={tableHeaders} />
                    {isLoading ? (
                        <TableRow>
                            <TableCell
                                colSpan={5}
                                rowSpan={4}
                                align="center"
                            >
                                <LoadingAnimation />
                            </TableCell>
                        </TableRow>
                    ) : (
                        <>
                            {specialists?.data?.specialists.length >
                            0 ? (
                                <>
                                    <TableBody>
                                        {specialists?.data?.specialists.map(
                                            (row, index) => (
                                                <SpecialistTableItem
                                                    item={row}
                                                    key={index}
                                                    setOpen={setOpen}
                                                />
                                            )
                                        )}
                                        <TableEmptyRow
                                            emptyRows={emptyRows}
                                            colSpan={6}
                                            hval={81}
                                        />
                                    </TableBody>
                                    <TableFooterPagination
                                        rowsPerPageOptions={[
                                            10, 15, 20,
                                        ]}
                                        tableList={
                                            specialists?.data.total
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

export default Specialist;

const tableHeaders = [
    {
        id: "image",
        label: "Image",
        align: "start",
        custon_width: "100px",
    },
    {
        id: "english",
        label: "English",
        align: "center",
        custon_width: "200px",
    },
    {
        id: "myanmar",
        label: "Myanmar",
        align: "center",
        custon_width: "200px",
    },
    {
        id: "inhousecount",
        label: "Inhouse Total Dr.",
        align: "center",
        custon_width: "150px",
    },
    {
        id: "cocount",
        label: "Cooperate Total Dr.",
        align: "center",
        custon_width: "200px",
    },
    {
        id: "action",
        label: "Action",
        align: "center",
        custon_width: "100px",
    },
];
