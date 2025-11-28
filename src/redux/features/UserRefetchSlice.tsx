import { createSlice } from "@reduxjs/toolkit";

export interface UserRefetchInitialState {
  trigger: number;
}

const initialState: UserRefetchInitialState = {
  trigger: 0,
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    refetchUser: (state) => {
      state.trigger += 1;
    },
    resetUserTrigger: (state) => {
      state.trigger = 0;
    },
  },
});

export const { refetchUser, resetUserTrigger } = UserSlice.actions;
export const UserRefetchReducer = UserSlice.reducer;
