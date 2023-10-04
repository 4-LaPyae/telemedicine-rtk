import { createApi } from "@reduxjs/toolkit/dist/query/react";
import baseUrl from "../../../app/hook";
export const promoCodeApi = createApi({
  reducerPath: "promoCodeApi",
  baseQuery: baseUrl,
  tagTypes: ["PromoCodes"],
  endpoints: (builder) => ({
    getPromoCodes: builder.query({
      query: ({ page, limit }) => ({
        url: `/sys-admin/promocode?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["PromoCodes"],
    }),
    addPromoCode: builder.mutation({
      query: (data) => ({
        url: `/sys-admin/promocode`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["PromoCodes"],
    }),
    updatePromoCode: builder.mutation({
      query: ({ id, data }) => ({
        url: `/sys-admin/promocode/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["PromoCodes"],
    }),
    deletePromoCode: builder.mutation({
      query: (id) => ({
        url: `/sys-admin/promocode/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PromoCodes"],
    }),
  }),
});
export const {
  useGetPromoCodesQuery,
  useAddPromoCodeMutation,
  useUpdatePromoCodeMutation,
  useDeletePromoCodeMutation,
} = promoCodeApi;
