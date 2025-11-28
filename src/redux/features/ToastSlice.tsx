import { createSlice } from "@reduxjs/toolkit";

export enum TOAST_TYPES {
  DEFAULT = "default",
  ERROR = "error",
  INFO = "info",
  SUCCESS = "success",
  WARNING = "warning",
}

export interface ToastInitialState {
  message: string;
  type: TOAST_TYPES;
}

const initialState: ToastInitialState = {
  message: "",
  type: TOAST_TYPES.DEFAULT,
};

const ToastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    presentToast: (state, action) => {
      const { message, type = "" } = action.payload;
      state.message = message;
      state.type = type;
    },
    clearToast: (state) => {
      state.message = "";
      state.type = TOAST_TYPES.DEFAULT;
    },
  },
});

export const { presentToast, clearToast } = ToastSlice.actions;
export const ToastReducer = ToastSlice.reducer;
