import { createApi } from "@reduxjs/toolkit/dist/query/react";
import baseUrl from "../../../app/hook";
// import { baseBlogUrl } from "../../../app/hook";
export const blogApi = createApi({
    reducerPath: "blogApi",
    baseQuery: baseUrl,
    tagTypes: ["Blogs"],
    endpoints: (builder) => ({
        getBlogs: builder.query({
            query: ({ page, limit, category }) => ({
                url: `sys-admin/blogs?page=${page}&limit=${limit}&categoryId=${category}`,
                method: "GET",
            }),
            providesTags: ["Blogs"],
        }),
        addBlog: builder.mutation({
            query: (blog) => ({
                url: `sys-admin/blogs`,
                method: "POST",
                body: blog,
            }),
            invalidatesTags: ["Blogs"],
        }),
        updateBlog: builder.mutation({
            query: ({ id, blog }) => ({
                url: `sys-admin/blogs/${id}`,
                method: "PUT",
                body: blog,
            }),
            invalidatesTags: ["Blogs"],
        }),
        changeBlogStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `sys-admin/Blogs/${id}/${status}`,
                method: "PUT",
            }),
            invalidatesTags: ["Blogs"],
        }),
        deleteBlog: builder.mutation({
            query: ({ id }) => ({
                url: `sys-admin/blogs/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Blogs"],
        }),
    }),
});
export const {
    useAddBlogMutation,
    useGetBlogsQuery,
    useChangeBlogStatusMutation,
    useDeleteBlogMutation,
    useUpdateBlogMutation,
} = blogApi;
