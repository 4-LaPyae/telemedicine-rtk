import {
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import React, { useState } from "react";
import TableToolbar from "../../app/components/Table/TableToolbar";
import { useGetAdminListQuery } from "./feature/sysAdminApi";
import { useSelector } from "react-redux";
import AdminTableItem from "./component/AdminTableItem";
import AdminDrawer from "./component/AdminDrawer";
import Csv from "../../app/components/ReactCsv/CSV";
import { LoadingAnimation } from "../../app/components/lottieanimation/LoadingAnimation";
import { NodataAnimation } from "../../app/components/lottieanimation/NodataAnimation";
import ModalComponent from "../../app/components/model/ModalComponent";
import TableHeader from "../../app/components/Table/TableHeader";

const titles = [
    { id: "profile", label: "Profile", custon_width: "200px" },
    { id: "role", label: "Role", custon_width: "200px" },
    { id: "status", label: "Status", custon_width: "200px" },
    { id: "action", label: "Action", custon_width: "200px" },
];

const csvTitle = [
    { id: "firstName", label: "First Name" },
    { id: "lastName", label: "Last Name" },
    { id: "email", label: "Email" },
    { id: "status", label: "Status" },
];

const forModalTitle = {
    btnName: "Export",
    header: "Would you like to export Admin Data?",
    body: "This is Body Message, you can change what you want.",
};

const SysAdmin = () => {
    const { user } = useSelector((state) => state.LoginSlice);
    const [open, setOpen] = useState(false);
    let loading = false;

    const [modalOpen, setModalOpen] = useState(false);
    const handleOpen = () => {
        setModalOpen(true);
    };
    const handleClose = () => {
        setModalOpen(false);
    };

    const { data, isLoading } = useGetAdminListQuery();
    const admins = data?.data;

    const filteredAdminList = admins?.filter((admin) => {
        return admin._id !== user._id;
    });

    const formattedAdminTitles = [
        csvTitle?.map((title) => title.label),
    ];
    const formattedAdminDatas = filteredAdminList?.map((admin) => [
        admin.firstName,
        admin.lastName,
        admin.email,
        admin.status,
    ]);
    // console.log(formattedAdminTitles, formattedAdminDatas);
    let csvAdminFormat;
    if (formattedAdminDatas) {
        csvAdminFormat = formattedAdminTitles.concat(
            formattedAdminDatas
        );
    }
    // console.log(csvAdminFormat);

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
                        <Typography
                            variant="h5"
                            sx={{ fontWeight: "bold" }}
                        >
                            System Admin
                        </Typography>
                        <Typography variant="body1">
                            See information about the admin
                        </Typography>
                    </Box>
                    <Box>
                        <Stack direction={"row"} spacing={3}>
                            <ModalComponent
                                global_title={forModalTitle}
                                open={modalOpen}
                                handleClose={handleClose}
                                handleOpen={handleOpen}
                            >
                                {csvAdminFormat && (
                                    <Csv
                                        handleClose={handleClose}
                                        data={csvAdminFormat}
                                        filename={"System Admin List"}
                                    />
                                )}
                            </ModalComponent>
                            <AdminDrawer
                                open={open}
                                setOpen={setOpen}
                            />
                        </Stack>
                    </Box>
                </Stack>
            </TableToolbar>
            <TableContainer>
                <Table>
                    <TableHeader headers={titles} />
                    {isLoading ? (
                        <TableRow>
                            <TableCell
                                colSpan={8}
                                rowSpan={3}
                                align="center"
                            >
                                <LoadingAnimation />
                            </TableCell>
                        </TableRow>
                    ) : (
                        <>
                            {filteredAdminList?.length > 0 ? (
                                <TableBody>
                                    {filteredAdminList?.map(
                                        (row, index) => (
                                            <AdminTableItem
                                                item={row}
                                                key={index}
                                                setOpen={setOpen}
                                            />
                                        )
                                    )}
                                </TableBody>
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6}>
                                        <NodataAnimation />
                                    </TableCell>
                                </TableRow>
                            )}
                        </>
                    )}
                </Table>
            </TableContainer>
        </Box>
    );
};

export default SysAdmin;
