import {
    ListItem,
    ListItemButton,
    ListItemText,
    ListItemIcon,
} from "@mui/material";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

function NavItem({ item, open, listAction }) {
    return (
        <Link to={`/${item.route}`}>
            <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                    sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                        "&.selected": {
                            backgroundColor: "#94C595", // Change to the desired active color
                        },
                        "&:hover": {
                            backgroundColor: "#94C595", // Change to the desired onClick effect color
                        },
                    }}
                    onClick={listAction}
                >
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: open ? 3 : "auto",
                            justifyContent: "center",
                        }}
                    >
                        <FontAwesomeIcon
                            icon={item.icon}
                            style={{
                                color: "#000000",
                                fontSize: "20px",
                                padding: "0px 3px 0px 4px",
                            }}
                        />
                    </ListItemIcon>
                    <ListItemText
                        primary={item.text}
                        sx={{
                            opacity: open ? 1 : 0,
                            color: "#000000 !important",
                        }}
                    />
                </ListItemButton>
            </ListItem>
        </Link>
    );
}
NavItem.propTypes = {
    item: PropTypes.object,
    open: PropTypes.bool,
    listAction: PropTypes.func,
};
export default NavItem;
