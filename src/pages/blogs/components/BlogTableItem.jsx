import {
    Avatar,
    FormControlLabel,
    Stack,
    Switch,
    TableCell,
    TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useChangeBlogStatusMutation } from "../features/BlogApi";
import BlogDeleteModel from "./BlogDeleteModel";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteModel from "../../../app/components/model/DeleteModel";

const BlogTableItem = ({ item }) => {
    const [changeBlogStatus, { isLoading: isUpdateLoading }] =
        useChangeBlogStatusMutation();
    // console.log(item);
    const navigate = useNavigate();
    const [openModel, setOpenModel] = useState(false);
    const showDeleteModel = () => {
        setOpenModel(true);
    };
    const changeStatus = (item) => {
        // console.log(item);
        changeBlogStatus({
            id: item._id,
            status: item.status === 1 ? 0 : 1,
        });
    };

    var tempElement = document.createElement("div");
    tempElement.innerHTML = item?.content;

    // Extract the text between the HTML tags
    var textBetweenTags =
        tempElement.textContent || tempElement.innerText;

    // Split the text into words and limit to the first 20 words
    var words = textBetweenTags.split(/\s+/);
    var first10Words = words.slice(0, 10).join(" ");

    return (
        <>
            <TableRow key={item._id}>
                <TableCell>
                    <Avatar
                        sx={{
                            width: 60,
                            height: 60,
                            // margin: "0 auto",
                        }}
                        variant="rounded"
                        src={item.thumbnailImage}
                        alt="admin"
                    >
                        {item.title.charAt(0).toUpperCase()}
                    </Avatar>
                </TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>
                    {item.excerpt === ""
                        ? first10Words
                        : item.excerpt}
                </TableCell>
                <TableCell>
                    {item.categories?.map((t) => (
                        <div
                            key={t.name}
                            style={{
                                display: "inline-block",
                                border: "1px solid lime",
                                padding: "5px",
                                background: "lime",
                                marginRight: "10px",
                                borderRadius: "10px",
                            }}
                        >
                            <p>{t.name}</p>
                        </div>
                    ))}
                </TableCell>
                <TableCell>
                    <div
                        style={{
                            fontWeight: "bold",
                            fontStyle: "italic",
                        }}
                    >
                        {item.tags?.length < 1
                            ? item.tags.map((t) => `#${t}`)
                            : item.tags.map((t) => `#${t} `)}
                    </div>
                </TableCell>
                <TableCell align="right">
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
                </TableCell>
                <TableCell>
                    <Stack
                        direction={"row"}
                        justifyContent={"flex-end"}
                        alignItems={"center"}
                        spacing={2}
                    >
                        <EditIcon
                            sx={{ color: "blue", cursor: "pointer" }}
                            onClick={() =>
                                navigate("/blogs/update", {
                                    state: { item: item },
                                })
                            }
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
                <BlogDeleteModel id={item._id} />
            </DeleteModel>
        </>
    );
};

export default BlogTableItem;
