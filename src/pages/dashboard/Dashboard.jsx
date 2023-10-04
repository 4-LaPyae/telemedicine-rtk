import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import DoctorListTable from "./component/DoctorListTable";
import AppointmentListTable from "./component/AppointmentListTable";
import { useDispatch, useSelector } from "react-redux";
import { successAlert } from "../../app/components/Alert/ToastAlertBox";
import { setLoginAlert } from "../login/feature/LoginSlice";
import { DoctorTotalCard } from "./component/DoctorTotalCard";
import AppointmentTotalCard from "./component/AppointmentTotalCard";

const Dashboard = () => {
  // const { loginSuccessAlert } = useSelector((state) => state.LoginSlice);
  // useEffect(() => {
  //   if (loginSuccessAlert) {
  //     successAlert(loginSuccessAlert);
  //     dispatch(setLoginAlert());
  //   }
  // }, []);
  return (
    <>
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems={"center"}
        spacing={4}
        width={"100%"}
      >
        <Box>
          <Stack direction={"row"} alignItems={"center"} spacing={4}>
            <DoctorTotalCard />
            <AppointmentTotalCard />
          </Stack>
        </Box>
      </Stack>
      <Stack alignItems="start" marginTop={3} direction={"row"} spacing={4}>
        <DoctorListTable />
        <AppointmentListTable />
      </Stack>
    </>
  );
};

export default Dashboard;
