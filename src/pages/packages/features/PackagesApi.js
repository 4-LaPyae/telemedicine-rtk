import { createApi } from "@reduxjs/toolkit/dist/query/react";
import baseUrl from "../../../app/hook";
export const packagesApi = createApi({
  reducerPath: "packagesApi",
  baseQuery: baseUrl,
  tagTypes: ["Packages"],
  endpoints: (builder) => ({
    getPackages: builder.query({
      query: ({ page, limit }) => ({
        url: `/sys-admin/packages?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Packages"],
    }),
    getPackagesOptions: builder.query({
      query: () => ({
        url: `/sys-admin/packages`,
        method: "GET",
      }),
      providesTags: ["Packages"],
    }),
    addPackage: builder.mutation({
      query: (data) => ({
        url: `sys-admin/packages`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Packages"],
    }),
    updatePackage: builder.mutation({
      query: ({ data, id }) => ({
        url: `sys-admin/packages/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Packages"],
    }),
    deletePackage: builder.mutation({
      query: ({ id }) => ({
        url: `sys-admin/packages/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Packages"],
    }),
  }),
});
export const {
  useGetPackagesQuery,
  useGetPackagesOptionsQuery,
  useAddPackageMutation,
  useUpdatePackageMutation,
  useDeletePackageMutation,
} = packagesApi;
