import { configureStore } from "@reduxjs/toolkit";
import {
  LoaderReducer,
  SkillsReducer,
  ToastReducer,
  UserReducer,
  UserRefetchReducer,
  type LoaderInitialState,
  type SkillsInitialState,
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
    skills: SkillsReducer,
  },
});

export type AppState = {
  loader: LoaderInitialState;
  toast: ToastInitialState;
  user: UserInitialState | null;
  userRefetch: UserRefetchInitialState;
  skills: SkillsInitialState;
};

export type AppDispatch = typeof store.dispatch;
