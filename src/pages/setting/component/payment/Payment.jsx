import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
} from "@mui/material";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import { useState } from "react";
import { useGetPaymentsQuery } from "../../feature/paymentApi";
import PaymentTableItem from "./PaymentTableItem";
import PaymentDrawer from "./PaymentDrawer";
import { LoadingAnimation } from "../../../../app/components/lottieanimation/LoadingAnimation";
import { NodataAnimation } from "../../../../app/components/lottieanimation/NodataAnimation";
import TableEmptyRow from "../../../../app/components/Table/TableEmptyRow";

export default function Payment() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const { data: payments, isLoading } = useGetPaymentsQuery({
        page: page + 1,
        limit: rowsPerPage,
    });

    const emptyRows =
        page > 0 ? rowsPerPage - payments.data.payments.length : 0;

    return (
        <Box
            sx={{
                m: 5,
            }}
        >
            <PaymentDrawer
                isDrawerOpen={isDrawerOpen}
                setDrawerOpen={setDrawerOpen}
            />
            <TableContainer component={Paper}>
                <Table
                    sx={{ minWidth: 650 }}
                    aria-label="simple table"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ width: "40%" }}>
                                Image
                            </TableCell>
                            <TableCell
                                style={{ width: "20%" }}
                                align="center"
                            >
                                Payment Type
                            </TableCell>
                            <TableCell
                                style={{ width: "30%" }}
                                align="center"
                            >
                                Payment Name
                            </TableCell>
                            <TableCell
                                style={{ width: "10%" }}
                                align="center"
                            >
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
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
                    ) : payments.data.payments.length > 0 ? (
                        <>
                            <TableBody>
                                {/* {rows.map((item, index) => ( */}
                                {payments?.data?.payments?.map(
                                    (item, index) => (
                                        <PaymentTableItem
                                            key={index}
                                            item={item}
                                            setDrawerOpen={
                                                setDrawerOpen
                                            }
                                        />
                                    )
                                )}
                                <TableEmptyRow
                                    emptyRows={emptyRows}
                                    colSpan={4}
                                    hval={130.5}
                                />
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[
                                            10,
                                            15,
                                            20,
                                            25,
                                            {
                                                label: "All",
                                                value: -1,
                                            },
                                        ]}
                                        colSpan={4}
                                        count={payments?.data?.total}
                                        // count={rows.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        SelectProps={{
                                            inputProps: {
                                                "aria-label":
                                                    "rows per page",
                                            },
                                            native: true,
                                        }}
                                        onPageChange={
                                            handleChangePage
                                        }
                                        onRowsPerPageChange={
                                            handleChangeRowsPerPage
                                        }
                                        ActionsComponent={
                                            TablePaginationActions
                                        }
                                    />
                                </TableRow>
                            </TableFooter>
                        </>
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={7}
                                rowSpan={7}
                                align="center"
                            >
                                <NodataAnimation />
                            </TableCell>
                        </TableRow>
                    )}
                </Table>
            </TableContainer>
        </Box>
    );
}
