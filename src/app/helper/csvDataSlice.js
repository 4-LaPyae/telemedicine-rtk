import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    csvData: null,
};

const csvDataSlice = createSlice({
    name: "csvData",
    initialState,
    reducers: {
        setCsvData: (state, { payload }) => {
            state.csvData = payload;
        },
        deleteCsvData: (state) => {
            state.csvData = null;
        },
    },
});

export const { setCsvData, deleteCsvData } = csvDataSlice.actions;

export const CsvSlice = csvDataSlice.reducer;
