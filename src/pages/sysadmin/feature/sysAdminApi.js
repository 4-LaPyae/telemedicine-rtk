import baseUrl from "../../../app/hook";
import { createApi } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
    reducerPath: "adminApi",
    baseQuery: baseUrl,
    endpoints: (builder) => ({
        getAdminList: builder.query({
            query() {
                return {
                    url: `sys-admin`,
                    method: "GET",
                };
            },
            providesTags: ["SysAdmin"],
        }),
        postAdmin: builder.mutation({
            query: (data) => {
                console.log(data);
                return {
                    url: "/sys-admin",
                    method: "POST",
                    body: data,
                };
            },
            invalidatesTags: ["SysAdmin"],
        }),
        updateAdmin: builder.mutation({
            query: ({ id, data }) => {
                return {
                    url: `/sys-admin/${id}`,
                    method: "PUT",
                    body: data,
                };
            },
            invalidatesTags: ["SysAdmin"],
        }),
        deleteAdmin: builder.mutation({
            query: (id) => {
                return {
                    url: `/sys-admin/${id}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["SysAdmin"],
        }),
    }),
});

export const {
    useGetAdminListQuery,
    usePostAdminMutation,
    useUpdateAdminMutation,
    useDeleteAdminMutation,
} = adminApi;
