import { Toolbar, Typography } from "@mui/material";
import PropTypes from "prop-types";
function TableToolbar({ children }) {
    return (
        <Toolbar>
            <Typography
                sx={{ flex: "1 1 100%" }}
                variant="h6"
                component="div"
            >
                {children}
            </Typography>
        </Toolbar>
    );
}
TableToolbar.propTypes = {
    children: PropTypes.object,
};
export default TableToolbar;
