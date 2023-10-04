import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Avatar, Box, Stack } from "@mui/material";
import noPhoto from "../../../app/assets/images/nophoto.jpg";
export default function ProfileCard({ user }) {
    return (
        <Card style={{ boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.1)" }}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="300px"
                width="300px"
                sx={{ padding: "15px", borderRadius: 4 }}
                image={user?.profile ?? noPhoto}
            />

            <CardContent>
                <Stack alignItems={"center"}>
                    <Typography
                        gutterBottom
                        variant="h4"
                        component="div"
                    >
                        {user?.firstName} {user?.lastName}
                    </Typography>
                    <Typography
                        gutterBottom
                        variant="body1"
                        component="div"
                    >
                        {user?.email}
                    </Typography>
                    <Typography
                        gutterBottom
                        variant="body1"
                        component="div"
                    >
                        {user?.phone}
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    );
}
