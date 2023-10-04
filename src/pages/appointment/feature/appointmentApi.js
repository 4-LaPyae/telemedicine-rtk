import baseUrl from "../../../app/hook";
import { createApi } from "@reduxjs/toolkit/dist/query/react";

export const inAppointmentApi = createApi({
  reducerPath: "inAppointmentApi",
  baseQuery: baseUrl,
  tagTypes: ["InAppointment"],
  endpoints: (builder) => ({
    getInAppointment: builder.query({
      // limit=10&page=1&patientName=&doctorName=&status=&startDate=2023-07-04&endDate=2023-07-06
      query({
        page,
        limit,
        docNameAndPhone,
        ptNameAndPhone,
        token,
        startDate,
        endDate,
        status,
      }) {
        return {
          url: `/sys-admin/consultant-appointment?page=${page}&limit=${limit}&doctorNameAndPhone=${docNameAndPhone}&patientNameAndPhone=${ptNameAndPhone}&token=${token}&status=${status}&startDate=${startDate}&endDate=${endDate}`,
          method: "GET",
        };
      },
      providesTags: ["InAppointment"],
    }),
  }),
});

export const coAppointmentApi = createApi({
  reducerPath: "CoAppointmentApi",
  baseQuery: baseUrl,
  tagTypes: ["CoAppointment"],
  endpoints: (builder) => ({
    getCoAppointment: builder.query({
      query({
        page,
        limit,
        doctorNameAndPhone,
        patientNameAndPhone,
        token,
        status,
        startDate,
        endDate,
      }) {
        // page=1&limit=10&doctorName=&patientName=&status&startDate&endDate
        return {
          url: `/sys-admin/appointments?doctorNameAndPhone=${doctorNameAndPhone}&patientNameAndPhone=${patientNameAndPhone}&token=${token}&limit=${limit}&page=${page}&status=${status}&startDate=${startDate}&endDate=${endDate}`,
          method: "GET",
        };
      },
      providesTags: ["CoAppointment"],
    }),
  }),
});

export const { useGetInAppointmentQuery } = inAppointmentApi;

export const { useGetCoAppointmentQuery } = coAppointmentApi;
