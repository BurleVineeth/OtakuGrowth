import { createSlice } from "@reduxjs/toolkit";

export interface UserInitialState {
  _id: string;
  createdAt: Date;
  email: string;
  name: string;
  password: string;
  updatedAt: Date;
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
export default UserSlice.reducer;
