import {
    FormControlLabel,
    Stack,
    Switch,
    TableCell,
    TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { setUpdateData } from "../../../app/helper/helperSlice";
import { useState } from "react";
import TagsDeleteModel from "./TagsDeleteModel";
import { useChangeTagStatusMutation } from "../features/TagsApi";
import DeleteModel from "../../../app/components/model/DeleteModel";

const TagsTableItem = ({ item, setOpen }) => {
    const [openModel, setOpenModel] = useState(false);
    console.log(item);
    const [changeTagStatus, { isLoading: isUpdateLoading }] =
        useChangeTagStatusMutation();
    const dispatch = useDispatch();
    const changeStatus = (item) => {
        // console.log(item);
        changeTagStatus({
            id: item._id,
            status: item.status === 1 ? 0 : 1,
        });
    };
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
                <TableCell>{item.categories.name}</TableCell>
                {/* <TableCell align="right">
                    <FormControlLabel
                        sx={{ margin: "0 auto" }}
                        control={
                            <Switch
                                checked={
                                    item.status === 1 ? true : false
                                }
                                disabled={isUpdateLoading}
                                onChange={() => changeStatus(item)}
                                color="success"
                            />
                        }
                    />
                </TableCell> */}
                <TableCell>
                    <Stack
                        direction={"row"}
                        justifyContent={"flex-end"}
                        alignItems={"center"}
                        spacing={2}
                    >
                        <EditIcon
                            sx={{ color: "blue", cursor: "pointer" }}
                            onClick={(e) => handleDrawerOpen(e, item)}
                        />
                        {/* <DeleteIcon
                            sx={{ color: "red", cursor: "pointer" }}
                            onClick={() => showDeleteModel()}
                        /> */}
                    </Stack>
                </TableCell>
            </TableRow>
            <DeleteModel
                openModel={openModel}
                setOpenModel={setOpenModel}
            >
                <TagsDeleteModel id={item._id} />
            </DeleteModel>
        </>
    );
};

export default TagsTableItem;
