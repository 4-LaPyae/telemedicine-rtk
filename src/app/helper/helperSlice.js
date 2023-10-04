import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  update_data: null,
  //for auto logout
  authorize: true,
};

const helperSlice = createSlice({
  name: "helper",
  initialState,
  reducers: {
    setUpdateData: (state, { payload }) => {
      state.update_data = payload;
    },
    deleteUpdateData: (state) => {
      state.update_data = null;
    },
    setAuthorize: (state) => {
      state.authorize = false;
    },
    setDeleteAuthorize: (state) => {
      state.authorize = true;
    },
  },
});

export const {
  setUpdateData,
  deleteUpdateData,
  setAuthorize,
  setDeleteAuthorize,
} = helperSlice.actions;

export const HelperSlice = helperSlice.reducer;
