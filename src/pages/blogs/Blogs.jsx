import {
    Box,
    Button,
    // Card,
    // IconButton,
    // InputAdornment,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
// import SimpleInput from "../../app/components/SimpleInput";
// import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import TableToolbar from "../../app/components/Table/TableToolbar";
import { useState } from "react";
import { useGetBlogsQuery } from "./features/BlogApi";
import BlogTableItem from "./components/BlogTableItem";
import TableFooterPagination from "../../app/components/Table/TableFooterPagination";
import MkAutoComplete from "../../app/components/MkAutoComplete";
import { useGetCategoriesQuery } from "../categories/features/CategoriesApi";
import { useGetTagsQuery } from "../tags/features/TagsApi";
import { LoadingAnimation } from "../../app/components/lottieanimation/LoadingAnimation";
import { NodataAnimation } from "../../app/components/lottieanimation/NodataAnimation";
import TableHeader from "../../app/components/Table/TableHeader";

const Blogs = () => {
    const navigate = useNavigate();

    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [searchCat, setSearchCat] = useState(null);
    const { data: allCategories } = useGetCategoriesQuery({
        page: null,
        limit: null,
    });
    // const { data: allTags } = useGetTagsQuery({
    //     page: null,
    //     limit: null,
    // });
    const concateArray = allCategories?.data?.categories;
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setLimit(parseInt(event.target.value, 10));
        setPage(0);
    };
    const { data, isLoading } = useGetBlogsQuery({
        page: page + 1,
        limit: limit,
        category: searchCat?._id ?? "",
    });
    // console.log(searchCat);
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
                                    Blogs List
                                </Typography>
                                <Typography variant="body1">
                                    See information about the blog
                                </Typography>
                            </Box>
                            <Box width={250}>
                                <MkAutoComplete
                                    label="Specialist"
                                    name="specialist"
                                    placeholder="Choose Categories"
                                    fullWidth
                                    value={searchCat}
                                    options={concateArray ?? []}
                                    getOptionLabel={(option) =>
                                        `${option.name}`
                                    }
                                    isOptionEqualToValue={(
                                        option,
                                        value
                                    ) => option?._id === value?._id}
                                    onChange={(e, newValue) => {
                                        setSearchCat(newValue);
                                    }}
                                />
                            </Box>
                        </Stack>
                    </Box>
                    <Box>
                        <Button
                            variant="contained"
                            startIcon={<UploadIcon />}
                            onClick={() => navigate("/blogs/upload")}
                        >
                            Upload
                        </Button>
                    </Box>
                </Stack>
            </TableToolbar>
            <TableContainer>
                <Table>
                    <TableHeader headers={tableHeaders} />
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
                            {data?.data?.blogs?.length > 0 ? (
                                <>
                                    <TableBody>
                                        {data?.data?.blogs?.map(
                                            (row, index) => (
                                                <BlogTableItem
                                                    item={row}
                                                    key={index}
                                                />
                                            )
                                        )}
                                    </TableBody>
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
                    <TableFooterPagination
                        tableList={data?.data?.total}
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

export default Blogs;

const tableHeaders = [
    { id: "name", label: "Thumbnail Image", align: "left" },
    { id: "title", label: "Title", align: "left" },
    { id: "excerpt", label: "Excerpt", align: "left" },
    { id: "categories", label: "Categories", align: "left" },
    { id: "tags", label: "Tags", align: "left" },
    { id: "status", label: "Status", align: "right" },
    { id: "action", label: "Action", align: "right" },
];
