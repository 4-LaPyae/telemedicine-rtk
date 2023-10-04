import { useState } from "react";
import {
    Box,
    InputAdornment,
    IconButton,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
    TableHead,
} from "@mui/material";
import TableToolbar from "../../app/components/Table/TableToolbar";
import SimpleInput from "../../app/components/SimpleInput/index";
import SearchIcon from "@mui/icons-material/Search";
import { useDebounce } from "use-debounce";
import { useGetCategoriesQuery } from "./features/CategoriesApi";
import CategoriesDrawer from "./components/CategoriesDrawer";
import CategoriesTableItem from "./components/CategoriesTableItem";
import TableFooterPagination from "../../app/components/Table/TableFooterPagination";
import { LoadingAnimation } from "../../app/components/lottieanimation/LoadingAnimation";
import { NodataAnimation } from "../../app/components/lottieanimation/NodataAnimation";
import TableHeader from "../../app/components/Table/TableHeader";

const title = [
    {
        id: "name",
        label: "Name",
    },
    // { id: "status", label: "Status", align: "right" },
    {
        id: "action",
        label: "Action",
        align: "right",
    },
];
const Categories = () => {
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [filterName, setFilterName] = useState("");
    const [open, setOpen] = useState(false);
    const handleSearch = (e) => {
        e.preventDefault();
        setFilterName(e.target.value);
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setLimit(parseInt(event.target.value, 10));
        setPage(0);
    };
    const debouncedSearchQuery = useDebounce(filterName, 500);
    const { data, isLoading } = useGetCategoriesQuery({
        page: page + 1,
        limit: limit,
        // filterName: debouncedSearchQuery[0],
    });
    // console.log(data);
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
                                    Blog Categories List
                                </Typography>
                                <Typography variant="body1">
                                    See information about the blog
                                    categories
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
                        <CategoriesDrawer
                            open={open}
                            setOpen={setOpen}
                        />
                    </Box>
                </Stack>
            </TableToolbar>
            <TableContainer>
                <Table>
                    <TableHeader headers={title} />
                    {/* <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography
                                    variant="body2"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    Name
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography
                                    variant="body2"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    Status
                                </Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography
                                    variant="body2"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    Action
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead> */}
                    {isLoading ? (
                        <TableRow>
                            <TableCell
                                colSpan={6}
                                rowSpan={6}
                                align="center"
                            >
                                <LoadingAnimation />
                            </TableCell>
                        </TableRow>
                    ) : (
                        <>
                            {data?.data.categories.length > 0 ? (
                                <>
                                    <TableBody>
                                        {data?.data.categories?.map(
                                            (row, index) => (
                                                <CategoriesTableItem
                                                    item={row}
                                                    key={index}
                                                    setOpen={setOpen}
                                                />
                                            )
                                        )}
                                    </TableBody>
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
                    <TableFooterPagination
                        tableList={data?.data.total}
                        rowsPerPage={limit}
                        page={page}
                        rowsPerPageOptions={[10, 15, 20]}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={
                            handleChangeRowsPerPage
                        }
                    />
                </Table>
            </TableContainer>
        </Box>
    );
};

export default Categories;
