import baseUrl from "../../../app/hook";
import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { specialistApi } from "../../specialist/feature/specialistApi";

export const doctorApi = createApi({
  reducerPath: "doctorsApi",
  baseQuery: baseUrl,
  tagTypes: ["InHouseDoctor", "Specialists"],
  endpoints: (builder) => ({
    getDoctors: builder.query({
      query({
        page,
        limit,
        type,
        statusType,
        filterNameOrPhone,
        filterSpecialist,
        filterGender,
        filterDutyStatus,
        startDate,
        endDate,
      }) {
        return {
          url: `/sys-admin/doctors?page=${page}&limit=${limit}&type=${type}&statusType=${statusType}&filterNameOrPhone=${filterNameOrPhone}&filterSpecialist=${filterSpecialist}&filterGender=${filterGender}&filterDutyStatus=${filterDutyStatus}&filterStartDateForAppointment=${startDate}&filterEndDateForAppointment=${endDate}`,
          method: "GET",
        };
      },

      providesTags: ["InHouseDoctor"],
    }),
    postDoctors: builder.mutation({
      query: (data) => {
        return {
          url: "/sys-admin/doctors",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["InHouseDoctor"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(specialistApi.util.invalidateTags(["Specialists"]));
      },
    }),
    getDoctorDetail: builder.query({
      query({ id }) {
        return {
          url: `/sys-admin/doctors/${id}/INHOUSE`,
          method: "GET",
        };
      },
      providesTags: ["InHouseDoctor"],
      transformResponse: (response) => {
        return {
          doctor: response.data.doctor,
          appointments: response.data.appointments,
        };
      },
    }),
    updateDoctors: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/sys-admin/doctors/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["InHouseDoctor"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(specialistApi.util.invalidateTags(["Specialists"]));
      },
    }),
    changeInDutyDoc: builder.mutation({
      query: ({ data, id, doctorType }) => {
        return {
          url: `/sys-admin/doctors/${id}/${doctorType}`,
          method: "PATCH",
          body: data,
        };
      },

      invalidatesTags: ["InHouseDoctor"],
    }),
    deleteInhouseDoctor: builder.mutation({
      query: ({ id }) => ({
        url: `/sys-admin/doctors/${id}/INHOUSE`,
        method: "DELETE",
      }),

      invalidatesTags: ["InHouseDoctor"],
    }),
  }),
});

export const coDoctorApi = createApi({
  reducerPath: "coDoctorApi",
  baseQuery: baseUrl,
  tagTypes: ["CoOperateDoctor"],
  endpoints: (builder) => ({
    getCoDoctors: builder.query({
      query: ({
        page,
        limit,
        type,
        statusType,
        filterNameOrPhone,
        filterSpecialist,
        filterGender,
        startDate,
        endDate,
      }) => ({
        url: `/sys-admin/doctors?page=${page}&limit=${limit}&type=${type}&statusType=${statusType}&filterNameOrPhone=${filterNameOrPhone}&filterSpecialist=${filterSpecialist}&filterGender=${filterGender}&filterStartDateForAppointment=${startDate}&filterEndDateForAppointment=${endDate}`,
        method: "GET",
      }),

      providesTags: ["CoOperateDoctor"],
    }),
    postCoDoctors: builder.mutation({
      query: (data) => {
        return {
          url: "/sys-admin/doctors",
          method: "POST",
          body: data,
        };
      },

      invalidatesTags: ["CoOperateDoctor"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(specialistApi.util.invalidateTags(["Specialists"]));
      },
    }),
    changeCoDutyDoc: builder.mutation({
      query: ({ data, id, doctorType }) => {
        return {
          url: `/sys-admin/doctors/${id}/${doctorType}`,
          method: "PATCH",
          body: data,
        };
      },

      invalidatesTags: ["CoOperateDoctor"],
    }),
    getCoDoctorDetail: builder.query({
      query({ id }) {
        return {
          url: `/sys-admin/doctors/${id}/COOPERATE`,
          method: "GET",
        };
      },
      providesTags: ["CoOperateDoctor"],
      transformResponse: (response) => {
        return {
          doctor: response.data.doctor,
          appointments: response.data.appointments,
        };
      },
    }),
    updateCoDoctors: builder.mutation({
      query: ({ data, id }) => {
        return {
          url: `/sys-admin/doctors/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["CoOperateDoctor"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        dispatch(specialistApi.util.invalidateTags(["Specialists"]));
      },
    }),
    deleteCoDoctors: builder.mutation({
      query: ({ id }) => {
        return {
          url: `/sys-admin/doctors/${id}/COOPERATE`,
          method: "DELETE",
        };
      },

      invalidatesTags: ["CoOperateDoctor"],
    }),
  }),
});

export const {
  useGetDoctorsQuery,
  usePostDoctorsMutation,
  useGetDoctorDetailQuery,
  useUpdateDoctorsMutation,
  useChangeInDutyDocMutation,
  useDeleteInhouseDoctorMutation,
} = doctorApi;
export const {
  useGetCoDoctorsQuery,
  usePostCoDoctorsMutation,
  useGetCoDoctorDetailQuery,
  useChangeCoDutyDocMutation,
  useUpdateCoDoctorsMutation,
  useDeleteCoDoctorsMutation,
} = coDoctorApi;
