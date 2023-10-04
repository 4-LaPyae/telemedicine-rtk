import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
const FilterComponent = ({
    lists,
    setGender,
    setOnlineStatus,
    setBloodType,
    setAppintmentStatus,
}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedValue, setSelectedValue] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event, value) => {
        setSelectedValue(value);
        if (setGender) setGender(value);
        if (setOnlineStatus) setOnlineStatus(value);
        if (setBloodType) setBloodType(value);
        if (setAppintmentStatus) setAppintmentStatus(value);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton onClick={handleClick}>
                {/* if icon changed icon(prop) need */}
                {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                {lists.map((option, index) => (
                    <MenuItem
                        key={option}
                        selected={index === selectedValue}
                        onClick={(event) =>
                            handleMenuItemClick(event, option)
                        }
                    >
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default FilterComponent;
