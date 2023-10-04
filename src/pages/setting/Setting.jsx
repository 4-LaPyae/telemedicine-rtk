import { Box, Button, Card, CardActions, CardMedia } from "@mui/material";
import { settingItems } from "./Data";
import { useNavigate } from "react-router-dom";

const Setting = () => {
  const navigate = useNavigate();

  const Navigate = (sectionId) => {
    navigate(`/setting/${sectionId}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
      }}
    >
      {settingItems.map((item, index) => (
        <Card
          key={index}
          sx={{
            width: "30%",
            margin: "20px",
            boxShadow: 3,
          }}
        >
          <CardMedia
            component="img"
            sx={{ width: "100%", height: "200px", objectFit: "contain", p: 3 }}
            image={item.icon}
            title="green iguana"
          />
          <CardActions sx={{ justifyContent: "end" }}>
            <Button
              onClick={() => Navigate(item.sectionId)}
              sx={{
                "&:hover": { backgroundColor: "transparent", color: "blue" },
              }}
              disableRipple
              disableFocusRipple
            >
              {item.text}
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default Setting;
