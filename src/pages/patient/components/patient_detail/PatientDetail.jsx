import { Box, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import PatientProfileCard from "./PatientProfileCard";
import PatientAppointmentTableItem from "./PatientAppointmentTableItem";
const PatientDetail = () => {
  const location = useLocation();

  const { data } = location.state;
  console.log({ data });
  return (
    <Stack
      direction={"row"}
      width={"100%"}
      spacing={5}
      justifyContent={"space-around"}
    >
      <Box width={"30%"}>
        <PatientProfileCard user={data} />
      </Box>
      <Box width={"70%"}>
        <PatientAppointmentTableItem />
      </Box>
    </Stack>
  );
};

export default PatientDetail;
