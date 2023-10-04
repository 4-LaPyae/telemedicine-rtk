import {
    Avatar,
    Box,
    Button,
    Card,
    Checkbox,
    Chip,
    Input,
    ListItemText,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SimpleInput from "../../../app/components/SimpleInput";
import JoditEditor from "jodit-react";
import { editorConfig } from "../Jodit/Joditconfig";
import PreviewPopOver from "./PreviewPopOver";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useGetCategoriesQuery } from "../../categories/features/CategoriesApi";
import { useGetTagsQuery } from "../../tags/features/TagsApi";
import { useUpdateBlogMutation } from "../features/BlogApi";
import { blogUrl } from "../../../app/hook";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const BlogUpdate = () => {
    const location = useLocation();
    let item = location.state?.item;
    console.log(item);
    const { user } = useSelector((state) => state.LoginSlice);

    const editor = useRef(null);
    const [tagsId, setTagsId] = useState([]);
    const [tagsName, setTagsName] = useState([]);
    const [imgWidth, setImgWidth] = useState("");
    const [imageData, setImageData] = useState("#");
    const [imageFile, setImageFile] = useState(null);
    const [excerpt, setExcerpt] = useState("");
    const navigate = useNavigate();
    const [updateBlog, { isLoading }] = useUpdateBlogMutation();
    const { data: allCategories } = useGetCategoriesQuery({
        page: null,
        limit: null,
    });
    // const { data: allTags } = useGetTagsQuery({
    //     page: null,
    //     limit: null,
    // });
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [popOver, setPopOver] = useState(false);
    const [content, setContent] = useState("");
    const [thumbImg, setThumbImg] = useState(null);
    const [flutterImage, setFlutterImage] = useState("");
    const concateArray = allCategories?.data?.categories;
    useEffect(() => {
        setAuthor(`${user.firstName} ${user.lastName}`);
        setTagsId(item.categories.map((t) => t._id));
        setTitle(item.title);
        setTagsName(item.categories.map((t) => t.name));
        setContent(item.content);
        setImageData(item.thumbnailImage);
        setThumbImg(item.thumbnailImage);
        setExcerpt(item.excerpt);
        setChips(item.tags);
    }, [user, item]);
    // console.log(categoriesId);
    //Upload Photo
    useEffect(() => {
        let responseData;
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, "text/html");
        const imgTags = doc.querySelectorAll("img");
        const srcAttributes = Array.from(imgTags)
            .map((imgTag) => imgTag.getAttribute("src"))
            .find((src) => src.startsWith("data:image"));
        // console.log(srcAttributes);
        const matchThumbnail = Array.from(imgTags)
            .map((imgTag) => imgTag.getAttribute("src"))
            .find((src) => src === thumbImg);
        if (!matchThumbnail) {
            setThumbImg(null);
        }

        async function postDataWithAuthorization() {
            const response = await fetch(blogUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user?.token}`,
                },
                body: JSON.stringify({ photo: srcAttributes }),
            });
            responseData = await response.json();
            console.log(responseData);
            if (!thumbImg) {
                setThumbImg(responseData?.data);
            }
            let matchImgTag = Array.from(imgTags).find(
                (tag) => tag.getAttribute("src") === srcAttributes
            );
            if (matchImgTag) {
                matchImgTag.setAttribute("src", responseData?.data);
            }
            console.log(doc.body.innerHTML);
            setContent(doc.body.innerHTML);
        }
        if (srcAttributes) {
            postDataWithAuthorization();
        }
    }, [content, user?.token, thumbImg]);
    // console.log(content);
    //

    const handleChangeTag = (event) => {
        const {
            target: { value },
        } = event;
        setTagsName(
            typeof value === "string" ? value.split(",") : value
        );
    };
    const calculateWidth = (content) => {
        let tempDiv = document.createElement("div");
        tempDiv.innerHTML = content;
        let imgElement = tempDiv.querySelector("img");
        if (imgElement) {
            let widthValue = imgElement.getAttribute("width");
            return widthValue;
        } else {
            return;
        }
    };
    const imageInputChange = (e) => {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setImageFile(reader.result);
        };

        setImageData(URL.createObjectURL(e.target.files[0]));
        // for base64
    };
    useEffect(() => {
        async function postDataWithAuthorization() {
            const response = await fetch(blogUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user?.token}`,
                },
                body: JSON.stringify({
                    photo: imageFile,
                }),
            });
            setFlutterImage(await response.json());
        }
        postDataWithAuthorization();
    }, [imageFile]);
    useEffect(() => {
        setImgWidth(calculateWidth(content));
    }, [content]);
    //******************this return html will add inline css media query for flutter and resoponsive************
    const returnHTML = (author, date, title, tags) => {
        let dTags = "";
        for (let i = 0; i < tags.length; i++) {
            const t = tags[i];
            dTags += `#${t} `.replace(/\n/g, "");
        }
        return `<body
        style="
            padding: 0;
            margin: 0;
            box-sizing: border-box;
            background-color: beige;
        "
    >
        <div style="padding: 10px 20px">
            <div>
                <img
                src=${flutterImage.data}
                    style="
                        width: 100%;
                        border-radius: 15px;
                        height: 600px;
                        object-fit: cover;
                    "
                />
            </div>
            <p
                style="
                    font-size: 32px;
                    font-weight: bolder;
                    margin-top: 30px;
                "
            >
                ${title}
            </p>
            <hr />
            <p style="font-size: 20px">
                Writtern by <strong>${author}</strong> .
                <i>${date}</i>
            </p>
            <hr />
            <div id='blog_content' style="margin-top: 100px; text-align: justify;font-size: '16px'">
            <content>
                ${content}
                </content>
            </div>
            <footer
                style="
                    margin-top: 30px;
                    font-weight: bold;
                    font-size: 16px;
                "
            >
                <i>${dTags}</i>
            </footer>
        </div>
    </body>
    `;
    };
    const [inputValue, setInputValue] = useState("");
    const [chips, setChips] = useState([]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleInputKeyDown = (e) => {
        if (e.key === "Enter" && inputValue.trim() !== "") {
            // Create a new chip
            const newChips = [...chips, inputValue.trim()];
            setChips(newChips);
            setInputValue("");
        } else if (
            e.key === "Backspace" &&
            inputValue === "" &&
            chips.length > 0
        ) {
            const newChips = [...chips];
            newChips.pop();
            setChips(newChips);
        }
    };

    const handleDeleteChip = (chipToDelete) => () => {
        const newChips = chips.filter(
            (chip) => chip !== chipToDelete
        );
        setChips(newChips);
    };
    const updateBlogData = () => {
        const updateData = {
            title: title,
            originalContent: returnHTML(
                author,
                new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                }),
                title,
                chips
            ).replace(/\n/g, ""),
            excerpt: excerpt,
            author: author,
            tags: chips,
            // categories: categoriesId,
            categories: tagsId,
            thumbnailImage:
                imageFile ?? item.thumbnailImage ?? thumbImg,
        };
        updateBlog({ blog: updateData, id: item._id })
            .unwrap()
            .then((res) => {
                console.log(res);
                if (!res.error) {
                    navigate("/blogs");
                }
            });
    };
    return (
        <Card>
            <ToastContainer />
            <Box sx={{ marginBottom: 5 }} px={1}>
                <Typography variant="h4">
                    Update {location.state.item.title}
                </Typography>
            </Box>
            <Stack direction={"row"} width={"100%"} gap={3} px={2}>
                <Stack direction={"column"} width={"50%"} gap={3}>
                    <Box sx={{ width: "800px" }}>
                        <SimpleInput
                            placeholder="Enter Title.... *"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            fullwidth
                        />
                    </Box>
                    <div>
                        <JoditEditor
                            ref={editor}
                            value={content}
                            config={editorConfig}
                            onBlur={(newContent) =>
                                setContent(newContent)
                            }
                        />
                    </div>
                </Stack>
                <Stack direction={"column"} width={"50%"} gap={2}>
                    <Box>
                        <label htmlFor="contained-button-file">
                            <Input
                                accept="image/*"
                                id="contained-button-file"
                                type="file"
                                name="profile"
                                sx={{
                                    display: "none",
                                }}
                                onChange={imageInputChange}
                            />

                            <Avatar
                                sx={{
                                    width: "100%",
                                    height: 250,
                                    cursor: "pointer",
                                    objectFit: "fill",
                                }}
                                variant="rounded"
                                src={imageData}
                            >
                                <Typography
                                    variant="h5"
                                    color={"#000"}
                                >
                                    Click To Select Thumbnail Image
                                </Typography>
                            </Avatar>
                        </label>
                    </Box>

                    <Box>
                        <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            displayEmpty
                            value={tagsName}
                            onChange={handleChangeTag}
                            input={<SimpleInput fullwidth />}
                            renderValue={(selected) => {
                                if (selected.length === 0) {
                                    return (
                                        <p
                                            style={{
                                                color: "#888C93",
                                            }}
                                        >
                                            Select Categories
                                        </p>
                                    );
                                }

                                return selected.join(", ");
                            }}
                            MenuProps={MenuProps}
                        >
                            <MenuItem disabled value="">
                                <p>Select Categories</p>
                            </MenuItem>
                            {concateArray?.map((item) => (
                                <MenuItem
                                    key={item?._id}
                                    value={item?.name}
                                    onClick={() => {
                                        setTagsId((prevIds) => {
                                            if (
                                                prevIds.includes(
                                                    item._id
                                                )
                                            ) {
                                                return prevIds.filter(
                                                    (id) =>
                                                        id !==
                                                        item._id
                                                );
                                            } else {
                                                return [
                                                    ...prevIds,
                                                    item._id,
                                                ];
                                            }
                                        });
                                    }}
                                >
                                    <Checkbox
                                        checked={
                                            tagsName.indexOf(
                                                item?.name
                                            ) > -1
                                        }
                                    />
                                    <ListItemText
                                        primary={item?.name}
                                    />
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>
                    <Box>
                        <TextField
                            variant="outlined"
                            placeholder={
                                chips.length > 0
                                    ? ""
                                    : "Enter Tags Name"
                            }
                            sx={{
                                border: "#d2d6da solid 2px",
                                borderRadius: "12px",
                            }}
                            value={inputValue}
                            onChange={handleInputChange}
                            onKeyDown={handleInputKeyDown}
                            fullWidth
                            InputProps={{
                                startAdornment: chips.map(
                                    (chip, index) => (
                                        <Chip
                                            key={index}
                                            label={chip}
                                            sx={{ mr: 1 }}
                                            onDelete={handleDeleteChip(
                                                chip
                                            )}
                                        />
                                    )
                                ),
                            }}
                        />
                    </Box>
                    <SimpleInput
                        placeholder="Excerpt (optional)"
                        value={excerpt}
                        multiline={true}
                        rows={3}
                        // disabled
                        onChange={(e) => setExcerpt(e.target.value)}
                    />
                    <SimpleInput
                        placeholder="Author Name"
                        value={author}
                        disabled
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        onClick={() => updateBlogData()}
                        disabled={
                            author === "" ||
                            title === "" ||
                            // categoriesName.length === 0 ||
                            tagsName.length === 0 ||
                            isLoading
                                ? // imageFile === null
                                  true
                                : false
                        }
                    >
                        {isLoading ? "Updating" : "Update"}
                    </Button>
                    <Stack direction={"row"} gap={1}>
                        <Button
                            variant="contained"
                            onClick={() => {
                                setPopOver(true);
                            }}
                            disabled={
                                author === "" ||
                                title === "" ||
                                // categoriesName.length === 0
                                tagsName.length === 0
                                    ? true
                                    : false
                            }
                            sx={{
                                width: "50%",
                                background: "grey",
                                "&:hover": {
                                    background: "#706d6d",
                                },
                            }}
                        >
                            Preview
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            sx={{
                                width: "50%",
                                "&:hover": {
                                    background: "red",
                                },
                            }}
                            onClick={() => navigate("/blogs")}
                        >
                            Cancel
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
            <PreviewPopOver
                popOver={popOver}
                setPopOver={setPopOver}
                header={title}
                tags={chips}
                body={content}
                author={author}
                date={new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                })}
                image={imageData === "#" ? thumbImg : imageData}
            />
        </Card>
    );
};

export default BlogUpdate;
