import { createSlice } from "@reduxjs/toolkit";

// ! initial state
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("token")) || null,
  },

  // ? reducers
  reducers: {
    loginAction: (state, action) => {
      state.user = action.payload;
    },
    // *logout
    logoutAction: (state, action) => {
      state.user = null;
    },
  },
});

// ! Generate actions
export const { loginAction, logoutAction } = authSlice.actions;

// ! Generate the reducer
const authReducer = authSlice.reducer;
export default authReducer;
