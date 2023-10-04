import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import {
    Box,
    Button,
    Divider,
    Drawer,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
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
import { useDispatch, useSelector } from "react-redux";
import {
    useAddPackageMutation,
    useUpdatePackageMutation,
} from "../features/PackagesApi";
import { deleteUpdateData } from "../../../app/helper/helperSlice";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const drawerWidth = 500;
const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "space-between",
}));

const PackageDrawer = ({ open, setOpen }) => {
    const theme = useTheme();
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [discountP, setDiscountP] = useState("");
    const [duration, setDuration] = useState("");
    const [description, setDescription] = useState([""]);
    const [addPackage, { isLoading }] = useAddPackageMutation();
    const [updatePackage, { isLoading: isUpdateLoading }] =
        useUpdatePackageMutation();
    const { update_data } = useSelector((state) => state.HelperSlice);
    const handleAddField = () => {
        setDescription([...description, ""]);
    };
    const handleDeleteField = (index) => {
        const values = [...description];
        console.log(index);
        values.splice(index, 1);
        setDescription(values);
    };
    const handleInputChange = (index, event) => {
        const values = [...description];
        values[index] = event.target.value;
        setDescription(values);
    };
    const dispatch = useDispatch();
    useEffect(() => {
        if (update_data) {
            setName(update_data.name);
            setPrice(update_data.price);
            setDiscount(
                update_data.discountAmount === 0
                    ? ""
                    : update_data.discountAmount
            );
            setDiscountP(
                update_data.discountPercentage === 0
                    ? ""
                    : update_data.discountPercentage
            );
            setDuration(update_data.duration);
            setDescription(update_data.description);
        }
    }, [update_data]);
    const handleChangeDuration = (e) => {
        setDuration(e.target.value);
    };
    const onClose = (msg) => {
        setName("");
        setPrice("");
        setDiscount("");
        setDuration("");
        setDescription([""]);
        setDiscountP("");
        setOpen(false);
        successAlert(msg);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (name === "") {
            errorAlert("Package Name is required!");
        } else if (price === "") {
            errorAlert("Package Price is required!");
        } else if (duration === "") {
            errorAlert("Package Duration is required!");
        } else if (description === "") {
            errorAlert("Package Description is required!");
        } else {
            if (update_data) {
                updatePackage({
                    data: {
                        name: name,
                        duration: +duration,
                        price: +price,
                        discountAmount: +discount,
                        discountPercentage: +discountP,
                        description: description,
                    },
                    id: update_data._id,
                })
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
                addPackage({
                    name: name,
                    duration: +duration,
                    price: +price,
                    discountAmount: +discount,
                    discountPercentage: +discountP,
                    description: description,
                })
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
        setPrice("");
        setDiscount("");
        setDuration("");
        setDescription([""]);
        setDiscountP("");
        setOpen(false);
        if (update_data) {
            dispatch(deleteUpdateData());
        }
    };

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
                                : "Create Package"}
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
                                <Stack direction={"row"} spacing={1}>
                                    <Box width={"100%"}>
                                        <InputLabel sx={{ mb: 1 }}>
                                            Package Name
                                        </InputLabel>
                                        <SimpleInput
                                            fullwidth
                                            value={name}
                                            placeholder="Enter Package Name"
                                            onChange={(e) => {
                                                setName(
                                                    e.target.value
                                                );
                                            }}
                                        />
                                    </Box>
                                    <Box width={"100%"}>
                                        <InputLabel sx={{ mb: 1 }}>
                                            Price (MMK)
                                        </InputLabel>
                                        <SimpleInput
                                            fullwidth
                                            value={price}
                                            placeholder="Enter Price"
                                            onChange={(event) => {
                                                const { value } =
                                                    event.target;
                                                if (
                                                    /^[0-9]*$/.test(
                                                        value
                                                    )
                                                ) {
                                                    setPrice(value);
                                                } else {
                                                    errorAlert(
                                                        "Please Enter number Only"
                                                    );
                                                }
                                            }}
                                        />
                                    </Box>
                                </Stack>
                                <Stack direction={"row"} spacing={1}>
                                    <Box width={"100%"}>
                                        <InputLabel sx={{ mb: 1 }}>
                                            Discount Amount
                                        </InputLabel>
                                        <SimpleInput
                                            fullwidth
                                            value={discount}
                                            placeholder="Enter Discount (MMK)"
                                            disabled={
                                                discountP !== ""
                                                    ? true
                                                    : false
                                            }
                                            onChange={(event) => {
                                                const { value } =
                                                    event.target;
                                                if (
                                                    /^[0-9]*$/.test(
                                                        value
                                                    )
                                                ) {
                                                    setDiscount(
                                                        value
                                                    );
                                                } else {
                                                    errorAlert(
                                                        "Please Enter number Only"
                                                    );
                                                }
                                            }}
                                        />
                                    </Box>
                                    <Box width={"100%"}>
                                        <InputLabel sx={{ mb: 1 }}>
                                            Discount Percentage
                                        </InputLabel>
                                        <SimpleInput
                                            fullwidth
                                            value={discountP}
                                            disabled={
                                                discount !== ""
                                                    ? true
                                                    : false
                                            }
                                            placeholder="Enter Discount (%)"
                                            onChange={(event) => {
                                                const { value } =
                                                    event.target;
                                                if (
                                                    /^[0-9]*$/.test(
                                                        value
                                                    )
                                                ) {
                                                    setDiscountP(
                                                        value
                                                    );
                                                } else {
                                                    errorAlert(
                                                        "Please Enter number Only"
                                                    );
                                                }
                                            }}
                                        />
                                    </Box>
                                </Stack>
                                <Box>
                                    <InputLabel sx={{ mb: 1 }}>
                                        Select Duration
                                    </InputLabel>
                                    <Select
                                        value={duration}
                                        displayEmpty
                                        inputProps={{
                                            "aria-label":
                                                "Without label",
                                        }}
                                        input={
                                            <SimpleInput fullwidth />
                                        }
                                        onChange={
                                            handleChangeDuration
                                        }
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={3}>
                                            3 Days
                                        </MenuItem>
                                        <MenuItem value={7}>
                                            7 Days
                                        </MenuItem>
                                        <MenuItem value={30}>
                                            1 Month
                                        </MenuItem>
                                        <MenuItem value={90}>
                                            3 Months
                                        </MenuItem>
                                        <MenuItem value={180}>
                                            6 Months
                                        </MenuItem>
                                        <MenuItem value={270}>
                                            9 Months
                                        </MenuItem>
                                        <MenuItem value={360}>
                                            1 Year
                                        </MenuItem>
                                    </Select>
                                </Box>
                                <Box>
                                    <InputLabel sx={{ mb: 1 }}>
                                        <Stack
                                            direction={"row"}
                                            justifyContent={
                                                "space-between"
                                            }
                                            alignItems={"center"}
                                        >
                                            <Box>Description</Box>
                                            <Box
                                                onClick={
                                                    handleAddField
                                                }
                                            >
                                                <AddBoxIcon
                                                    sx={{
                                                        color: "green",
                                                        cursor: "pointer",
                                                    }}
                                                />
                                            </Box>
                                        </Stack>
                                    </InputLabel>
                                    {description.map((des, index) => (
                                        <Box
                                            key={index}
                                            sx={{ mb: 1 }}
                                        >
                                            <Stack
                                                direction={"row"}
                                                gap={2}
                                                alignItems={"center"}
                                            >
                                                <SimpleInput
                                                    placeholder="Write your Description here"
                                                    fullwidth
                                                    value={des}
                                                    multiline={true}
                                                    rows={2}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            index,
                                                            e
                                                        )
                                                    }
                                                />
                                                {description.length >
                                                    1 && (
                                                    <Box
                                                        onClick={() => {
                                                            handleDeleteField(
                                                                index
                                                            );
                                                        }}
                                                    >
                                                        <DeleteForeverIcon
                                                            sx={{
                                                                color: "red",
                                                                cursor: "pointer",
                                                            }}
                                                        />
                                                    </Box>
                                                )}
                                            </Stack>
                                        </Box>
                                    ))}
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

PackageDrawer.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.any,
};
export default PackageDrawer;
