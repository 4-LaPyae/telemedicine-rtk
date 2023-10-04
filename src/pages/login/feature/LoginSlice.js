import { createSlice } from "@reduxjs/toolkit";
import { loginApi } from "./LoginApi";

const initialState = {
  user: null,
  loginSuccessAlert: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUserData: (state, { payload }) => {
      state.user = payload;
    },
    setLoginAlert: (state, { payload }) => {
      state.loginSuccessAlert = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      loginApi.endpoints.postLogin.matchFulfilled,
      (state, { payload }) => {
        console.log("Slice ", payload);
        state.user = payload.data;
        state.loginSuccessAlert = payload.message;
      }
    );
  },
});

export const { setUserData, setLoginAlert } = loginSlice.actions;
export default loginSlice.reducer;
