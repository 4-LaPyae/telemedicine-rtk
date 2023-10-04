import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState } from "react";
import DoctorInTabPanel from "./component/inhouse/DoctorInTabPanel";
import DoctorCoTabPanel from "./component/cooperate/DoctorCoTabPanel";

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const Doctor = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 0.5, borderColor: "divider" }}>
                <Tabs
                    sx={{
                        width: "100%",
                    }}
                    value={value}
                    onChange={handleChange}
                    aria-label="doctor tabs"
                >
                    <Tab
                        sx={{
                            fontSize: "22px",
                            fontWeight: "bold",
                            width: "50%",
                        }}
                        label="Inhouse"
                        {...a11yProps(0)}
                    />
                    <Tab
                        sx={{
                            fontSize: "22px",
                            fontWeight: "bold",
                            width: "50%",
                        }}
                        label="CoOperate"
                        {...a11yProps(1)}
                    />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <DoctorInTabPanel />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <DoctorCoTabPanel />
            </CustomTabPanel>
        </Box>
    );
};
export default Doctor;
