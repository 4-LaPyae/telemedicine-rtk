import {
    Box,
    Paper,
    Stack,
    Typography,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Table,
} from "@mui/material";
import TableToolbar from "../../app/components/Table/TableToolbar";
import PromoCodeDrawer from "./components/PromoCodeDrawer";
import { useState } from "react";
import { useGetPromoCodesQuery } from "./feature/promoCodeApi";
import PromoCodeTableItem from "./components/PromoCodeTableItem";
import TableFooterPagination from "../../app/components/Table/TableFooterPagination";
import { LoadingAnimation } from "../../app/components/lottieanimation/LoadingAnimation";
import { NodataAnimation } from "../../app/components/lottieanimation/NodataAnimation";
import TableEmptyRow from "../../app/components/Table/TableEmptyRow";
import TableHeader from "../../app/components/Table/TableHeader";
const title = [
    {
        id: "code",
        label: "code",
        align: "left",
        custon_width: "15%",
    },
    {
        id: "duration",
        label: "valid until (duration)",
        align: "left",
        custon_width: "10%",
    },
    {
        id: "package",
        label: "package name",
        align: "left",
        custon_width: "15%",
    },
    {
        id: "action",
        label: "Action",
        align: "left",
        custon_width: "10%",
    },
];
const PromoCode = () => {
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const { data, isLoading } = useGetPromoCodesQuery({
        page: page + 1,
        limit: rowsPerPage,
    });
    const emptyRows =
        page > 0
            ? rowsPerPage - data?.data?.data?.length
            : rowsPerPage - data?.data?.data?.length;
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    console.log(data?.data?.total);
    return (
        <>
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
                                        Promo Code List
                                    </Typography>
                                    <Typography variant="body1">
                                        See information about the
                                        Promo Code
                                    </Typography>
                                </Box>
                            </Stack>
                        </Box>
                        <Box>
                            <PromoCodeDrawer
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
                                {data?.data?.data?.length > 0 ? (
                                    <>
                                        <TableBody>
                                            {data?.data?.data?.map(
                                                (row, index) => (
                                                    <PromoCodeTableItem
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
                                            tableList={
                                                data?.data?.total
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
        </>
    );
};

export default PromoCode;
