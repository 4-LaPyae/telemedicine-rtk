import {
    Box,
    Stack,
    TableCell,
    TableRow,
    Tooltip,
    Typography,
    tooltipClasses,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { formatNumberWithCommas } from "../../../app/helper/withComma";
import { useDispatch } from "react-redux";
import { setUpdateData } from "../../../app/helper/helperSlice";
import PackagesDeleteModel from "./PackagesDeleteModel";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import DeleteModel from "../../../app/components/model/DeleteModel";
const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "#f5f5f9",
        color: "rgba(0, 0, 0, 0.87)",
        maxWidth: 250,
        fontSize: theme.typography.pxToRem(12),
        border: "1px solid #dadde9",
    },
}));

export default function PackagesTableItem({ item, setOpen }) {
    // console.log(item);
    const first_three_description = item?.description
        .slice(0, 1)
        .map((i, index) => {
            return (
                <Typography key={index} variant="subtitle">
                    {i}{" "}
                </Typography>
            );
        });

    const [openModel, setOpenModel] = useState(false);

    const dispatch = useDispatch();
    const showDeleteModel = () => {
        setOpenModel(true);
    };
    const handleDrawerOpen = (e, item) => {
        e.preventDefault();
        setOpen(true);
        dispatch(setUpdateData(item));
    };
    return (
        <>
            <TableRow key={item._id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{`${item.duration} days`}</TableCell>
                <TableCell align="center" sx={{ color: "blue" }}>
                    <strong>
                        {formatNumberWithCommas(item.price)}
                    </strong>
                </TableCell>
                <TableCell align="center" sx={{ color: "red" }}>
                    <strong>{item.discountPercentage}</strong>
                </TableCell>
                <TableCell align="center" sx={{ color: "red" }}>
                    <strong>
                        {formatNumberWithCommas(item.discountAmount)}
                    </strong>
                </TableCell>

                <TableCell>
                    <Box>
                        {first_three_description}
                        {item.description.length > 1 ? (
                            <Typography
                                variant="subtitle"
                                color="secondary"
                                sx={{
                                    cursor: "pointer",
                                    marginTop: "10px",
                                }}
                            >
                                <HtmlTooltip
                                    title={
                                        <>
                                            {item.description
                                                .slice(1)
                                                .map((des, index) => (
                                                    <li
                                                        key={index}
                                                        style={{
                                                            fontSize:
                                                                "16px",
                                                        }}
                                                    >
                                                        {des}
                                                    </li>
                                                ))}
                                        </>
                                    }
                                >
                                    More ...
                                </HtmlTooltip>
                            </Typography>
                        ) : (
                            ""
                        )}
                    </Box>
                </TableCell>
                <TableCell>
                    <Stack
                        direction={"row"}
                        justifyContent={"flex-start"}
                        alignItems={"center"}
                        spacing={2}
                    >
                        <EditIcon
                            sx={{ color: "blue", cursor: "pointer" }}
                            onClick={(e) => handleDrawerOpen(e, item)}
                        />
                        <DeleteIcon
                            sx={{ color: "red", cursor: "pointer" }}
                            onClick={() => showDeleteModel()}
                        />
                    </Stack>
                </TableCell>
            </TableRow>
            <DeleteModel
                openModel={openModel}
                setOpenModel={setOpenModel}
            >
                <PackagesDeleteModel id={item._id} />
            </DeleteModel>
        </>
    );
}
