import { createApi } from "@reduxjs/toolkit/dist/query/react";
import baseUrl from "../../../app/hook";
export const patientApi = createApi({
  reducerPath: "patientApi",
  baseQuery: baseUrl,
  tagTypes: ["Patients"],
  endpoints: (builder) => ({
    getPatients: builder.query({
      query: ({
        page,
        limit,
        filterNameOrPhone,
        gender,
        bloodType,
        statusType,
        registeredStartDate,
        registeredEndDate,
      }) => ({
        url: `/sys-admin/patients?page=${page}&limit=${limit}&filterNameOrPhone=${filterNameOrPhone}&filterGender=${gender}&filterBloodType=${bloodType}&statusType=${statusType}&registeredStartDate=${registeredStartDate}&registeredEndDate=${registeredEndDate}`,
        method: "GET",
      }),
      providesTags: ["Patients"],
    }),
    addPatient: builder.mutation({
      query: (patient) => ({
        url: `/sys-admin/patients`,
        method: "POST",
        body: patient,
      }),

      invalidatesTags: ["Patients"],
    }),
    detailPatient: builder.query({
      query: ({ id, page, limit, coapage, coalimit }) => ({
        url: `/sys-admin/patients/${id}?page=${page}&limit=${limit}&coapage=${coapage}&coalimit=${coalimit}`,
        method: "GET",
      }),
      providesTags: ["Patients"],
      transformResponse: (response) => {
        return {
          appointments: response.data.appointments,
          consultantappointments: response.data.consultantappointments,
        };
      },
    }),
    updatePatient: builder.mutation({
      query: ({ id, patient }) => ({
        url: `/sys-admin/patients/${id}`,
        method: "PUT",
        body: patient,
      }),
      invalidatesTags: ["Patients"],
    }),
    updatePatientStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/sys-admin/patients/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Patients"],
    }),
    deletePatient: builder.mutation({
      query: ({ id }) => ({
        url: `/sys-admin/patients/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Patients"],
    }),
  }),
});
export const {
  useGetPatientsQuery,
  useAddPatientMutation,
  useDetailPatientQuery,
  useUpdatePatientMutation,
  useUpdatePatientStatusMutation,
  useDeletePatientMutation,
} = patientApi;
