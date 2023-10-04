import { createApi } from "@reduxjs/toolkit/dist/query/react";
import baseUrl from "../../../app/hook";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: baseUrl,
  tagTypes: ["Payments"],
  endpoints: (builder) => ({
    getPayments: builder.query({
      query({ page, limit }) {
        return {
          url: `/sys-admin/payments?page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
      providesTags: ["Payments"],
    }),
    addPayment: builder.mutation({
      query: (payment) => ({
        url: `/sys-admin/payments`,
        method: "POST",
        body: payment,
      }),
      invalidatesTags: ["Payments"],
    }),
    updatePayment: builder.mutation({
      query: (data) => ({
        url: `sys-admin/payments/${data.id}`,
        method: "PUT",
        body: data.payment,
      }),
      invalidatesTags: ["Payments"],
    }),
    deletePayment: builder.mutation({
      query: ({ id }) => ({
        url: `sys-admin/payments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Payments"],
    }),
  }),
});

export const {
  useGetPaymentsQuery,
  useAddPaymentMutation,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
} = paymentApi;
