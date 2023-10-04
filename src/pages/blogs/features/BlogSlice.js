import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    blogContent: [],
};

const BlogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {
        setBlogContent: (state, { payload }) => {
            console.log(payload);
            state.blogContent.push(payload);
        },
    },
});

export const { setBlogContent } = BlogSlice.actions;
export default BlogSlice.reducer;
