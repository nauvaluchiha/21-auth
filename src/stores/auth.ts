import { createSlice } from "@reduxjs/toolkit";
import { auth } from "@/utils/auth";

export const authSlice = createSlice({
  name: "auth",
  initialState: auth.isAuthenticated(),
  reducers: {
    login: () => true,
    logout: () => false,
  },
});

export const selectAuth = (state: any) => state.auth;

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;