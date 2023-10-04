import {
    Box,
    Button,
    Popover,
    Stack,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { cloneElement } from "react";
import {
    dateFormatter,
    monthDayYearFormatter,
} from "../../helper/dateFormatter";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { subDays } from "date-fns";
const PopoverComponent = ({ children, setDate, value }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedDateRange, setSelectedDateRange] = useState({
        startDate: value === 1 ? new Date() : subDays(new Date(), 6),
        endDate: new Date(),
        key: "selection",
    });
    const [buttonName, setButtonName] = useState(false);

    console.log({ selectedDateRange });

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleButtonClick = () => {
        setDate(selectedDateRange);
        handleClose();
        setButtonName(true);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    useEffect(() => setDate(selectedDateRange), []);

    return (
        <>
            <Button
                variant="outlined"
                sx={{ fontSize: "14px", padding: "5px 15px" }}
                aria-describedby={id}
                onClick={handleClick}
            >
                <Stack direction={"column"}>
                    <Stack>
                        <Typography variant="body2">
                            {value === 1
                                ? "Appointment Date Filter"
                                : "Register Date Filter"}
                        </Typography>
                    </Stack>

                    <Stack direction={"row"}>
                        <Box>
                            <span>
                                {monthDayYearFormatter(
                                    dateFormatter(
                                        selectedDateRange?.startDate
                                    )
                                )}
                            </span>
                        </Box>
                        <Box>
                            <ArrowRightAltIcon
                                sx={{ margin: "0px 20px" }}
                            />
                        </Box>
                        <Box>
                            <span>
                                {monthDayYearFormatter(
                                    dateFormatter(
                                        selectedDateRange?.endDate
                                    )
                                )}
                            </span>
                        </Box>
                        <DateRangeIcon sx={{ marginLeft: "30px" }} />
                    </Stack>
                </Stack>
            </Button>
            <Popover
                id={id}
                open={open}
                onClose={handleClose}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
            >
                {cloneElement(children, {
                    selectedDateRange,
                    setSelectedDateRange,
                    value,
                })}
                <hr />
                <Stack
                    sx={{
                        padding: "10px",
                    }}
                    direction={"row"}
                    justifyContent="space-between"
                >
                    <Button
                        sx={{
                            ":hover": { backgroundColor: "red" },
                            color: "red",
                            border: "none",
                        }}
                        onClick={handleClose}
                    >
                        CLOSE
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleButtonClick}
                    >
                        OK
                    </Button>
                </Stack>
            </Popover>
        </>
    );
};

export default PopoverComponent;
