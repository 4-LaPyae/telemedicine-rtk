import { useState } from "react";
import {
    Box,
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
import { useGetPackagesQuery } from "./features/PackagesApi";
import PackagesTableItem from "./components/PackagesTableItem";
import PackageDrawer from "./components/PackagesDrawer";
import { LoadingAnimation } from "../../app/components/lottieanimation/LoadingAnimation";
import { NodataAnimation } from "../../app/components/lottieanimation/NodataAnimation";
import TableHeader from "../../app/components/Table/TableHeader";

const title = [
    {
        id: "packageName",
        label: "Package Name",
        align: "left",
        custon_width: "15%",
    },
    {
        id: "duration",
        label: "Duration",
        align: "left",
        custon_width: "10%",
    },
    {
        id: "price",
        label: "Price (MMK)",
        align: "center",
        custon_width: "15%",
    },
    {
        id: "discountP",
        label: "Discount (%)",
        align: "center",
        custon_width: "15%",
    },
    {
        id: "discountA",
        label: "Discount (MMK)",
        align: "center",
        custon_width: "15%",
    },
    {
        id: "description",
        label: "Description",
        align: "left",
        custon_width: "20%",
    },
    {
        id: "action",
        label: "Action",
        align: "left",
        custon_width: "10%",
    },
];
const Package = () => {
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [open, setOpen] = useState(false);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const { data, isLoading } = useGetPackagesQuery({
        page: page + 1,
        limit: limit,
    });
    // console.log(data);

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
                                    Packages List
                                </Typography>
                                <Typography variant="body1">
                                    See information about the packages
                                </Typography>
                            </Box>
                            <Box>
                                {/* <SimpleInput
                                    placeholder="Name"
                                    onChange={handleSearch}
                                    startAdornment={
                                        <InputAdornment>
                                            <IconButton disabled>
                                                <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                /> */}
                            </Box>
                        </Stack>
                    </Box>
                    <Box>
                        <PackageDrawer
                            open={open}
                            setOpen={setOpen}
                        />
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
                            {data?.data?.packages?.length > 0 ? (
                                <>
                                    <TableBody>
                                        {data?.data?.packages?.map(
                                            (row, index) => (
                                                <PackagesTableItem
                                                    item={row}
                                                    key={index}
                                                    setOpen={setOpen}
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
};

export default Package;
