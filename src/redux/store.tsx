import { configureStore } from "@reduxjs/toolkit";
import ToastReducer, { type ToastInitialState } from "./features/ToastSlice";
import LoaderReducer, { type LoaderInitialState } from "./features/LoaderSlice";
import UserReducer, { type UserInitialState } from "./features/UserSlice";

export const store = configureStore({
  reducer: {
    loader: LoaderReducer,
    toast: ToastReducer,
    user: UserReducer,
  },
});

export type AppState = {
  loader: LoaderInitialState;
  toast: ToastInitialState;
  user: UserInitialState | null;
};
export type AppDispatch = typeof store.dispatch;
