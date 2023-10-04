import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import noPhoto from "../../../../app/assets/images/nophoto.jpg";
import { monthDayYearFormatter } from "../../../../app/helper/dateFormatter";

export default function PatientProfileCard({ user }) {
  console.log(user);
  return (
    <Card style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.1)" }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="350"
        width="350"
        sx={{ padding: "15px", borderRadius: 4 }}
        image={user?.profile ?? noPhoto}
      />
      <CardContent sx={{ padding: "5px" }}>
        <Stack alignItems={"center"}>
          <Typography gutterBottom variant="h4" component="div">
            {user?.name}
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
              <Typography variant="body2">{user?.name}</Typography>
            </Stack>
            <Stack direction={"row"} spacing={1.5} alignItems={"center"}>
              <Typography variant="body1">Email : </Typography>
              <Typography variant="body2">{user?.email || "N/A"}</Typography>
            </Stack>
            <Stack direction={"row"} spacing={1.5} alignItems={"center"}>
              <Typography variant="body1">Phone : </Typography>
              <Typography variant="body2">{user?.phone}</Typography>
            </Stack>
            <Stack direction={"row"} spacing={1.5} alignItems={"center"}>
              <Typography variant="body1">Gender :</Typography>
              <Typography variant="body2">{user?.gender}</Typography>
            </Stack>
            <Stack direction={"row"} spacing={1.5} alignItems={"center"}>
              <Typography variant="body1">Date Of Bith :</Typography>
              <Typography variant="body2">
                {monthDayYearFormatter(user?.dob)}
              </Typography>
            </Stack>
            <Stack direction={"row"} spacing={1.5} alignItems={"center"}>
              <Typography variant="body1">CompleteAppintmentCount:</Typography>
              <Typography variant="body2">
                {user?.completeappintmentCount}
              </Typography>
            </Stack>
            <Stack direction={"row"} spacing={1.5} alignItems={"center"}>
              <Typography variant="body1">
                CompleteConsultantAppintmentCount:
              </Typography>
              <Typography variant="body2">
                {user?.completeconsultantappintmentCount}
              </Typography>
            </Stack>

            <Stack direction={"row"} spacing={1.5} alignItems={"start"}>
              <Typography variant="body1" width={"20%"}>
                Allergies :
              </Typography>
              <Typography variant="body2" width={"80%"}>
                {user?.allergies ?? "No Allergies"}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
