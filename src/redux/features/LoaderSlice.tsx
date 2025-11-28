import { createSlice } from "@reduxjs/toolkit";

export interface LoaderInitialState {
  loading: boolean;
}

const initialState: LoaderInitialState = {
  loading: false,
};

const LoaderSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.loading = true;
    },
    dismissLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { showLoading, dismissLoading } = LoaderSlice.actions;
export const LoaderReducer = LoaderSlice.reducer;
