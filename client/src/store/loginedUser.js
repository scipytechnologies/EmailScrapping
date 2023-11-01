import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isConnected: false,
  firstName: "",
  lastName: "",
  email: "",
};

export const LoginedUserSlice = createSlice({
  name: "loginedUser",
  initialState,
  reducers: {
    loggeduser: (state, action) => {
      state.id = action.payload;
    },
    isConnected: (state) => {
      state.isConnected = true;
      console.log("connected");
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    logout: (state) => {
      state.user = "";
      state.isConnected = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRole, isConnected, loggeduser, logout } =
  LoginedUserSlice.actions;

export default LoginedUserSlice.reducer;
