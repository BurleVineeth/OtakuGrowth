import { configureStore } from "@reduxjs/toolkit";
import ToastReducer from "./features/ToastSlice";
import LoaderReducer from "./features/LoaderSlice";
import UserReducer from "./features/UserSlice";

export const store = configureStore({
  reducer: {
    loader: LoaderReducer,
    toast: ToastReducer,
    user: UserReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
