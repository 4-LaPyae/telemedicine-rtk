import { createApi } from "@reduxjs/toolkit/dist/query/react";
import baseUrl from "../../../app/hook";
export const tagsApi = createApi({
    reducerPath: "tagsApi",
    baseQuery: baseUrl,
    keepUnusedDataFor: 0,
    tagTypes: ["Tags"],
    endpoints: (builder) => ({
        getTags: builder.query({
            query: ({ page, limit }) => ({
                url:
                    page === null
                        ? `/sys-admin/sub_categories`
                        : `/sys-admin/sub_categories?page=${page}&limit=${limit}`,
                method: "GET",
            }),
            providesTags: ["Tags"],
        }),
        addTag: builder.mutation({
            query: (category) => ({
                url: `/sys-admin/sub_categories`,
                method: "POST",
                body: category,
            }),
            invalidatesTags: ["Tags"],
        }),
        updateTag: builder.mutation({
            query: ({ id, category }) => ({
                url: `/sys-admin/sub_categories/${id}`,
                method: "PUT",
                body: category,
            }),
            invalidatesTags: ["Tags"],
        }),
        changeTagStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `sys-admin/sub_categories/${id}/${status}`,
                method: "PUT",
            }),
            invalidatesTags: ["Tags"],
        }),
        deleteTag: builder.mutation({
            query: ({ id }) => ({
                url: `sys-admin/sub_categories/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Tags"],
        }),
    }),
});
export const {
    useGetTagsQuery,
    useAddTagMutation,
    useUpdateTagMutation,
    useDeleteTagMutation,
    useChangeTagStatusMutation,
} = tagsApi;
