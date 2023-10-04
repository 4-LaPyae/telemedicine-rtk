import baseUrl from "../../../app/hook";
import { createApi } from "@reduxjs/toolkit/query/react";

export const loginApi = createApi({
  baseQuery: baseUrl,
  endpoints: (builder) => ({
    postLogin: builder.mutation({
      query: (data) => ({
        url: "/sys-admin/login",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const { usePostLoginMutation } = loginApi;
