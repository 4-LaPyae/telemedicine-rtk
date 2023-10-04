import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const AppointmentTotalCard = () => {
  return (
    <div>
      <Card
        sx={{
          minWidth: 345,
          minHeight: 150,
          background: "linear-gradient(to right,#90FCF9, #21d4fd)",
          color: "#grey",
        }}
      >
        <CardContent style={{ padding: "5px 10px" }}>
          <Typography gutterBottom variant="h5" padding={1.5} component="div">
            Current Appointments
          </Typography>
          <Stack
            direction="row"
            alignItems={"center"}
            justifyContent={"space-between"}
            sx={{
              padding: "8px 10px",
            }}
          >
            <CalendarMonthIcon
              sx={{
                fontSize: "62px",
              }}
            />
            <Box>
              <Stack
                alignItems={"center"}
                justifyContent={"center"}
                spacing={1}
              >
                <Typography variant="h5" color="text.secondary">
                  Total
                </Typography>
                <Typography variant="h3" fontWeight="bold">
                  (0/{0})
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentTotalCard;
