import { Box, Stack } from "@mui/material";

export const OnlineStatus = ({ status, byNum, center }) => {
  let text;
  let bgcolor;
  let text_and_circ_lecolor;

  //console.log(status);

  if (byNum) {
    text = status === 1 ? "ONLINE" : "OFFLINE";
    bgcolor = status === 1 ? "#c1f5c3" : "#facac3";
    text_and_circ_lecolor = status === 1 ? "green" : "red";
  } else {
    text = status === "" ? "" : status === "ON" ? "ONLINE" : "OFFLINE";
    bgcolor = status === "ON" ? "#c1f5c3" : "#facac3";
    text_and_circ_lecolor = status === "ON" ? "green" : "red";
  }

  return (
    <Box
      sx={{
        backgroundColor: bgcolor,
        width: "80px",
        borderRadius: "6px",
        margin: center ? "0 auto" : "",
      }}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-around"}
        alignItems={"center"}
      >
        <div
          style={{
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: text_and_circ_lecolor,
          }}
        ></div>
        <div style={{ color: text_and_circ_lecolor }}>{text}</div>
      </Stack>
    </Box>
  );
};
