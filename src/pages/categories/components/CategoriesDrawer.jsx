import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import {
    Box,
    Button,
    Divider,
    Drawer,
    IconButton,
    InputLabel,
    Stack,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import SimpleInput from "../../../app/components/SimpleInput";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import { ToastContainer } from "react-toastify";
import {
    errorAlert,
    successAlert,
} from "../../../app/components/Alert/ToastAlertBox";
import {
    useAddCategoryMutation,
    useUpdateCategoryMutation,
} from "../features/CategoriesApi";
import { useDispatch, useSelector } from "react-redux";
import { deleteUpdateData } from "../../../app/helper/helperSlice";

const drawerWidth = 500;
const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "space-between",
}));

const CategoriesDrawer = ({ open, setOpen }) => {
    const theme = useTheme();
    const [name, setName] = useState("");
    const [addCategory, { isLoading }] = useAddCategoryMutation();
    const { update_data } = useSelector((state) => state.HelperSlice);
    const [updateCategory, { isLoading: isUpdateLoading }] =
        useUpdateCategoryMutation();
    const dispatch = useDispatch();
    const onClose = (msg) => {
        setName("");
        setOpen(false);
        successAlert(msg);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (name === "") {
            errorAlert("Name is required!");
        } else {
            if (update_data) {
                const updateData = {
                    id: update_data._id,
                    category: {
                        name: name,
                    },
                };
                updateCategory(updateData)
                    .unwrap()
                    .then((res) => {
                        if (!res.error) {
                            console.log(res);
                            onClose(res.message);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        setName("");
                        errorAlert(err.data.message);
                    });
            } else {
                addCategory({ name })
                    .unwrap()
                    .then((res) => {
                        if (!res.error) {
                            console.log(res);
                            onClose(res.message);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        setName("");
                        errorAlert(err.data.message);
                    });
            }
        }
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handlerDrawerClose = () => {
        setOpen(false);
        setName("");
        if (update_data) {
            dispatch(deleteUpdateData());
        }
    };

    useEffect(() => {
        if (update_data) {
            setName(update_data.name);
        }
    }, [update_data]);

    return (
        <div>
            <ToastContainer />

            <Button
                variant="contained"
                onClick={handleDrawerOpen}
                endIcon={<AddIcon />}
            >
                Add
            </Button>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                    },
                }}
                anchor="right"
                open={open}
                onClose={handlerDrawerClose}
            >
                <Box role="presentation">
                    <DrawerHeader>
                        <Typography variant="h5">
                            {update_data
                                ? `Update (${update_data.name})`
                                : "Create"}
                        </Typography>
                        <IconButton onClick={handlerDrawerClose}>
                            {theme.direction === "rtl" ? (
                                <CloseIcon />
                            ) : (
                                <CloseIcon />
                            )}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />

                    <form onSubmit={submitHandler}>
                        <Stack
                            spacing={3}
                            justifyContent={"center"}
                            alignItems={"center"}
                            sx={{ mt: 1 }}
                        >
                            <Stack width={"95%"} spacing={2}>
                                <Box width={"100%"}>
                                    <InputLabel sx={{ mb: 1 }}>
                                        Category Name
                                    </InputLabel>
                                    <SimpleInput
                                        fullwidth
                                        value={name}
                                        placeholder="Name"
                                        onChange={(e) => {
                                            setName(e.target.value);
                                        }}
                                    />
                                </Box>
                                <Box>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        type="submit"
                                        color="primary"
                                        disabled={
                                            isLoading ||
                                            isUpdateLoading
                                        }
                                    >
                                        {update_data
                                            ? "Update"
                                            : "Create"}
                                    </Button>
                                </Box>
                            </Stack>
                        </Stack>
                    </form>
                </Box>
            </Drawer>
        </div>
    );
};

CategoriesDrawer.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.any,
};
export default CategoriesDrawer;
