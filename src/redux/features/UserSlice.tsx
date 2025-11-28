import { createSlice } from "@reduxjs/toolkit";

export interface UserInitialState {
  _id: string;
  email: string;
  name: string;
  bio?: string;
  image?: string;
}

const initialState: UserInitialState | null = null;

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (_, action) => action.payload,
    clearUser: () => {
      return null;
    },
  },
});

export const { setUser, clearUser } = UserSlice.actions;
export const UserReducer = UserSlice.reducer;
