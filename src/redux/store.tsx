import { configureStore } from "@reduxjs/toolkit";
import {
  LoaderReducer,
  ToastReducer,
  UserReducer,
  UserRefetchReducer,
  type LoaderInitialState,
  type ToastInitialState,
  type UserInitialState,
  type UserRefetchInitialState,
} from "./features";

export const store = configureStore({
  reducer: {
    loader: LoaderReducer,
    toast: ToastReducer,
    user: UserReducer,
    userRefetch: UserRefetchReducer,
  },
});

export type AppState = {
  loader: LoaderInitialState;
  toast: ToastInitialState;
  user: UserInitialState | null;
  userRefetch: UserRefetchInitialState;
};

export type AppDispatch = typeof store.dispatch;
