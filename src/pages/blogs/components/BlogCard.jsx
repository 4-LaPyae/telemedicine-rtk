import { Box, Stack, Typography } from "@mui/material";

const BlogCard = ({ image, body, date, category }) => {
    return (
        <Stack direction={"column"} gap={2} sx={{ width: "400px" }}>
            <Box>
                <img
                    src={image}
                    alt="test"
                    style={{
                        width: "100%",
                        height: "250px",
                        objectFit: "fill",
                        borderRadius: "20px",
                    }}
                />
            </Box>
            <Box>
                <Typography
                    sx={{ px: 2 }}
                    fontSize={"19px"}
                    fontWeight={"bold"}
                    textAlign={"justify"}
                >
                    {body}
                </Typography>
            </Box>
            <Stack
                direction={"row"}
                justifyContent={"space-between"}
                width={"100%"}
            >
                <Typography
                    sx={{ px: 2 }}
                    color={"green"}
                    fontStyle={"italic"}
                    fontWeight={"bold"}
                >
                    {date}
                </Typography>
                <Typography
                    sx={{ px: 2 }}
                    color={"green"}
                    fontStyle={"italic"}
                    fontWeight={"bold"}
                >
                    {category}
                </Typography>
            </Stack>
        </Stack>
    );
};

export default BlogCard;
