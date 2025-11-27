import { configureStore } from "@reduxjs/toolkit";
import ToastReducer from "./features/ToastSlice";
import LoaderReducer from "./features/LoaderSlice";

export const store = configureStore({
  reducer: {
    toast: ToastReducer,
    loader: LoaderReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
