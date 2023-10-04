import { useState } from "react";

import {
    Avatar,
    Divider,
    IconButton,
    Popover,
    Stack,
    Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { NotificationsRounded } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import LogoutAlert from "../Alert/LogoutAlert";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { clearLocalStorage } from "../../utils/localStorage";
import { checkProfileImageLink } from "../../helper/checkImage";
import { useSelector } from "react-redux";
import DeleteModel from "../model/DeleteModel";

function RightNav() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [openAlert, setOpenAlert] = useState(false);
    const [openModel, setOpenModel] = useState(false);
    const { user } = useSelector((state) => state.LoginSlice);
    console.log({ user });

    const showDeleteModel = () => {
        setOpenModel(true);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
        <>
            <Stack
                direction="row"
                spacing={2}
                divider={<Divider flexItem orientation="vertical" />}
            >
                <IconButton>
                    <NotificationsRounded />
                </IconButton>
                <Avatar
                    onClick={handleClick}
                    src={user?.profile ?? checkProfileImageLink()}
                    alt="user logo"
                ></Avatar>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    sx={{
                        mt: "10px",
                        boxShadow:
                            "0px 0px 50px 0px rgb(82 63 105 / 15%)",
                    }}
                >
                    <Stack
                        divider={
                            <Divider
                                flexItem
                                orientation="horizontal"
                            />
                        }
                    >
                        <Box
                            sx={{
                                color: "#333",
                                padding: "0.75rem 3rem 0.75rem 1rem",
                            }}
                        >
                            <Stack direction="row" spacing={1}>
                                <AdminPanelSettingsIcon
                                    sx={{
                                        color: "#333",
                                    }}
                                />
                                <Typography sx={{ fontSize: "1rem" }}>
                                    {user?.firstName} {user?.lastName}
                                </Typography>
                            </Stack>
                        </Box>

                        <Box
                            sx={{
                                padding: "1rem",
                            }}
                        >
                            <Link
                                to="/profile"
                                onClick={() => handleClose()}
                            >
                                <Stack direction="row" spacing={1}>
                                    <AccountCircleIcon
                                        sx={{
                                            color: "#333",
                                        }}
                                    />
                                    <Typography
                                        sx={{
                                            color: "#333",
                                            fontSize: "1rem",
                                        }}
                                    >
                                        Profile
                                    </Typography>
                                </Stack>
                            </Link>
                        </Box>
                        <Box sx={{ padding: "1rem" }}>
                            <Stack direction="row" spacing={1}>
                                <LogoutIcon
                                    sx={{
                                        color: "#333",
                                        cursor: "pointer",
                                    }}
                                    onClick={showDeleteModel}
                                />
                                <Typography
                                    onClick={showDeleteModel}
                                    sx={{
                                        color: "#333",
                                        fontSize: "1rem",
                                        cursor: "pointer",
                                    }}
                                >
                                    Logout
                                </Typography>
                            </Stack>
                        </Box>
                    </Stack>
                </Popover>
            </Stack>
            <DeleteModel
                openModel={openModel}
                setOpenModel={setOpenModel}
            >
                <LogoutAlert
                    openAlert={openAlert}
                    setOpenAlert={setOpenAlert}
                />
            </DeleteModel>
        </>
    );
}

export default RightNav;
