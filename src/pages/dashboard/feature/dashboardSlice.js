import { createSlice } from "@reduxjs/toolkit";
import { dashboardApi } from "./dashboardApi";
const initialState = {
  total: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setOnlineTotal: (state, { payload }) => {
      state.total = payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addMatcher(
  //     dashboardApi.endpoints.getInhouseDoctors.matchFulfilled,
  //     (state, { payload }) => {
  //       state.total = payload.total;
  //     }
  //   );
  // },
});

export const { setOnlineTotal } = dashboardSlice.actions;
export const DashboardSlice = dashboardSlice.reducer;
