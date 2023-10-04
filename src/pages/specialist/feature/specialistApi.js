import { createApi } from "@reduxjs/toolkit/dist/query/react";
import baseUrl from "../../../app/hook";
export const specialistApi = createApi({
  reducerPath: "specialistApi",
  baseQuery: baseUrl,
  tagTypes: ["Specialists"],
  endpoints: (builder) => ({
    getSpecialists: builder.query({
      query: ({ page, limit, filterName }) => ({
        url: `/sys-admin/specialists?page=${page}&limit=${limit}&filterName=${filterName}`,
        method: "GET",
      }),
      providesTags: ["Specialists"],
    }),
    addSpecialist: builder.mutation({
      query: (specialist) => ({
        url: `/sys-admin/specialists`,
        method: "POST",
        body: specialist,
      }),
      invalidatesTags: ["Specialists"],
    }),
    updateSpecialist: builder.mutation({
      query: ({ specialist, id }) => ({
        url: `/sys-admin/specialists/${id}`,
        method: "PUT",
        body: specialist,
      }),
      invalidatesTags: ["Specialists"],
    }),
    deleteSpecialist: builder.mutation({
      query: ({ id }) => ({
        url: `/sys-admin/specialists/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Specialists"],
    }),
  }),
});
export const {
  useGetSpecialistsQuery,
  useAddSpecialistMutation,
  useUpdateSpecialistMutation,
  useDeleteSpecialistMutation,
} = specialistApi;
