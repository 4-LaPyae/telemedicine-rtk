import * as React from "react";
import { Box, Stack } from "@mui/material";
import ProfileCardForm from "./components/ProfileCardForm";
import ProfileCard from "./components/ProfileCard";
import { useSelector } from "react-redux";
export default function Profile() {
    const { user } = useSelector((state) => state.LoginSlice);

    return (
        <Stack direction={"row"} width={"100%"} justifyContent={"space-around"}>
            <Box width={"25%"}>
                <ProfileCard user={user} />
            </Box>
            <Box width={"65%"}>
                <ProfileCardForm user={user} />
            </Box>
        </Stack>
    );
}
