import { createApi } from "@reduxjs/toolkit/dist/query/react";
import baseUrl from "../../../app/hook";
export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: baseUrl,
  tagTypes: ["Dashboards"],
  endpoints: (builder) => ({
    getInhouseDoctors: builder.query({
      query: ({ page, limit, onlineStatus }) => ({
        url: `sys-admin/home-progress/inhouseDoctor?page=${page}&limit=${limit}&status=${onlineStatus}`,
        method: "GET",
      }),
      providesTags: ["Dashboards"],
      transformResponse: (response) => {
        return response.data;
      },
    }),
    getInhouseDoctorsTotal: builder.query({
      query: ({ status }) => ({
        url: `sys-admin/home-progress/inhouseDoctor?page=1&limit=10&status=${status}`,
        method: "GET",
      }),
      providesTags: ["Dashboards"],
      transformResponse: (response) => {
        return response.data.total ?? 0;
      },
    }),
    getAppointments: builder.query({
      query: ({
        page,
        limit,
        pName,
        dName,
        status,
        token,
        startDate,
        endDate,
      }) => ({
        url: `sys-admin/home-progress/appointment?page=${page}&limit=${limit}&pName=${pName}&dName=${dName}&status=${status}&token=${token}&startDate=${startDate}&endDate=${endDate}`,
        method: "GET",
      }),
      providesTags: ["Dashboards"],
      transformResponse: (response) => {
        return response.data;
      },
    }),
    getAppointmentTotal: builder.query({
      query: ({ pName, dName, status, token, startDate, endDate }) => ({
        url: `sys-admin/home-progress/appointment?page=1&limit=10&pName=${pName}&dName=${dName}status=${status}&token=${token}&startDate=${startDate}&endDate=${endDate}`,
        method: "GET",
      }),
      providesTags: ["Dashboards"],
      transformResponse: (response) => {
        return response.data.total ?? 0;
      },
    }),
  }),
});
export const {
  useGetInhouseDoctorsQuery,
  useGetInhouseDoctorsTotalQuery,
  useGetAppointmentsQuery,
  useGetAppointmentTotalQuery,
} = dashboardApi;
