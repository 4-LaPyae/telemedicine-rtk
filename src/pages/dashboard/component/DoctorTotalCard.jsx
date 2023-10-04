import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import PortraitIcon from "@mui/icons-material/Portrait";
import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserDoctor } from "@fortawesome/free-solid-svg-icons";
import { useGetInhouseDoctorsTotalQuery } from "../feature/dashboardApi";
import { useSelector } from "react-redux";

export const DoctorTotalCard = () => {
  const { data, isLoading } = useGetInhouseDoctorsTotalQuery({ status: "" });
  const { total } = useSelector((state) => state.DashboardSlice);
  return (
    <Card
      sx={{
        minWidth: 345,
        minHeight: 150,
        background: "linear-gradient(to right, #21d4fd, #90FCF9)",
        color: "#grey",
      }}
    >
      <CardContent style={{ padding: "5px 10px" }}>
        <Typography gutterBottom variant="h5" padding={1.5} component="div">
          Inhouse Doctor
        </Typography>
        <Stack
          direction="row"
          alignItems={"center"}
          justifyContent={"space-between"}
          sx={{
            padding: "8px 10px",
          }}
        >
          <FontAwesomeIcon icon={faUserDoctor} style={{ fontSize: "62px" }} />
          <Box>
            <Stack alignItems={"center"} justifyContent={"center"} spacing={1}>
              <Typography variant="h5" color="text.secondary">
                Total
              </Typography>
              <Typography variant="h3" fontWeight={"bold"}>
                ({total ?? 0}/{isLoading && 0} {data ?? 0})
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};
