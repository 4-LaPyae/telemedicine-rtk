import { HomeRounded } from "@mui/icons-material";
import { Breadcrumbs, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Link as RouterLink, useLocation } from "react-router-dom";

function LeftNav() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Breadcrumbs sx={{ height: "2rem", lineHeight: "2rem" }}>
        <RouterLink
          to="/dashboard"
          style={{
            textDecoration: "none",
            color: "#333",
            display: "flex",
            alignItems: "center",
          }}
        >
          <HomeRounded />
        </RouterLink>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;

          return last ? (
            <Typography sx={{ color: "#555", fontSize: "1rem" }} key={value}>
              {value}
            </Typography>
          ) : (
            <RouterLink
              to={to}
              key={value}
              style={{
                textDecoration: "none",
                color: "#333",
                fontSize: "1rem",
              }}
            >
              {value}
            </RouterLink>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
}

export default LeftNav;
