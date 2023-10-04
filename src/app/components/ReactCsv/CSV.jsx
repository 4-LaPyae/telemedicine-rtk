import { Box, Button } from "@mui/material";
import { CSVLink } from "react-csv";
import { currentDateandTime } from "../../helper/changeDateandTimeFormat";

const Csv = ({ data, filename, handleClose }) => {
    //Cache ထိုင်နေတယ် တခေါက်ပဲ ထုတ်လို့ရ/ ထပ်ပြင်ရဦးမယ်
    //Solution Button ကို အထဲထည့်ပါ
    return (
        <Box width={"100%"}>
            <CSVLink
                data={data}
                filename={`${filename}_${currentDateandTime()}.csv`}
                target="_blank"
            >
                <Button
                    fullWidth
                    variant="outlined"
                    color="success"
                    onClick={handleClose}
                >
                    Export
                </Button>
            </CSVLink>
        </Box>
    );
};

export default Csv;
