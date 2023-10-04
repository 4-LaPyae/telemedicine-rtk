import { createApi } from "@reduxjs/toolkit/dist/query/react";
import baseUrl from "../../../app/hook";
export const categoriesApi = createApi({
    reducerPath: "categoriesApi",
    baseQuery: baseUrl,
    keepUnusedDataFor: 0,
    tagTypes: ["Categories"],
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: ({ page, limit }) => ({
                url:
                    page === null
                        ? `/sys-admin/categories`
                        : `/sys-admin/categories?page=${page}&limit=${limit}`,
                method: "GET",
            }),
            providesTags: ["Categories"],
        }),
        addCategory: builder.mutation({
            query: (category) => ({
                url: `sys-admin/categories`,
                method: "POST",
                body: category,
            }),
            invalidatesTags: ["Categories"],
        }),
        updateCategory: builder.mutation({
            query: ({ id, category }) => ({
                url: `sys-admin/categories/${id}`,
                method: "PUT",
                body: category,
            }),
            invalidatesTags: ["Categories"],
        }),
        changeCategoryStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `sys-admin/categories/${id}/${status}`,
                method: "PUT",
            }),
            invalidatesTags: ["Categories"],
        }),
        deleteCategory: builder.mutation({
            query: ({ id }) => ({
                url: `sys-admin/categories/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Categories"],
        }),
    }),
});
export const {
    useGetCategoriesQuery,
    useAddCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useChangeCategoryStatusMutation,
} = categoriesApi;
