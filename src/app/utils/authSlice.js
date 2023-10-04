import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
    name: "AuthSlice",
    initialState: {
        isAuthenticated: false,
    },
    reducers: {
        handleAuth: (state, { payload }) => {
            state.isAuthenticated = payload;
        },
    },
});

export const AuthSliceReducer = AuthSlice.reducer;
export const { handleAuth } = AuthSlice.actions;
