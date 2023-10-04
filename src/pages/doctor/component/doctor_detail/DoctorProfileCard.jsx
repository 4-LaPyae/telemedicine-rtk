import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import noPhoto from "../../../../app/assets/images/nophoto.jpg";
import { monthDayYearFormatter } from "../../../../app/helper/dateFormatter";

export default function DoctorProfileCard({ doctor }) {
  return (
    <Card style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.1)" }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="350"
        width="350"
        sx={{ padding: "15px", borderRadius: 4 }}
        image={doctor?.profile ?? noPhoto}
      />
      <CardContent sx={{ padding: "5px" }}>
        <Stack alignItems={"center"}>
          <Typography gutterBottom variant="h4" component="div">
            {doctor?.name}
          </Typography>
        </Stack>
        <Stack
          direction={"row"}
          alignItems={"center"}
          paddingBottom={"5px"}
          marginTop={"5px"}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            paddingLeft={"5px"}
          >
            Information
          </Typography>
        </Stack>
        <Stack padding={"5px"}>
          <Stack spacing={2}>
            <Stack direction={"row"} spacing={1.5} alignItems={"center"}>
              <Typography variant="body1">FullName :</Typography>
              <Typography variant="body2">{doctor?.name}</Typography>
            </Stack>
            <Stack direction={"row"} spacing={1.5} alignItems={"center"}>
              <Typography variant="body1">Email : </Typography>
              <Typography variant="body2">{doctor?.email || "N/A"}</Typography>
            </Stack>
            <Stack direction={"row"} spacing={1.5} alignItems={"center"}>
              <Typography variant="body1">Phone : </Typography>
              <Typography variant="body2">{doctor?.phone}</Typography>
            </Stack>
            <Stack direction={"row"} spacing={1.5} alignItems={"center"}>
              <Typography variant="body1">Gender :</Typography>
              <Typography variant="body2">{doctor?.gender}</Typography>
            </Stack>
            <Stack direction={"row"} spacing={1.5} alignItems={"center"}>
              <Typography variant="body1">Date Of Birth :</Typography>
              <Typography variant="body2">
                {/* {doctor?.dob} */}
                {monthDayYearFormatter(doctor?.dob)}
              </Typography>
            </Stack>

            <Stack direction={"row"} spacing={1.5} alignItems={"start"}>
              <Typography variant="body1" width={"10%"}>
                Info :
              </Typography>
              <Typography variant="body2" width={"90%"}>
                {doctor?.info ?? "No Info"}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
