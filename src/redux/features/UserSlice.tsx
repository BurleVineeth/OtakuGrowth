import { createSlice } from "@reduxjs/toolkit";

export interface UserInitialState {
  _id: string;
  email: string;
  name: string;
  bio?: string;
  url?: string;
  public_id?: string;
  fileType?: string;
  level: number;
  class: "E" | "D" | "C" | "B" | "A" | "S";
  totalXP: number;
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
