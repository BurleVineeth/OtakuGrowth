import type { SkillDifficulty } from "@/components/domain/AddSkillModuleForm/types";
import { createSlice } from "@reduxjs/toolkit";

export interface Skill {
  _id: string;
  name: string;
  description: string;
  category: string;
  difficulty: SkillDifficulty;
  url: string;
}

export interface SkillsInitialState {
  skills: Skill[];
}

const initialState: SkillsInitialState = {
  skills: [],
};

const SkillsSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    setSkills: (state, action) => {
      state.skills = action.payload;
    },
  },
});

export const { setSkills } = SkillsSlice.actions;
export const SkillsReducer = SkillsSlice.reducer;
