import { createSlice } from "@reduxjs/toolkit"; 

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoadingAuth: false,
    status: "checking",
    user: {},
    errorMessage: undefined,
  },
  reducers: {
    onStartLoading: (state) => {
      state.isLoadingAuth = true;
    },
    onChecking: (state) => {
      state.status = "checking";
      state.user = {};
      state.errorMessage = undefined;
    },
    onLogin: (state, { payload }) => {
      state.isLoadingAuth = false;
      state.status = "authenticated";
      state.user = payload;
      state.errorMessage = undefined;
    },
    onRegister: (state, { payload }) => {
      state.user = payload;
      state.errorMessage = undefined;
    },

    onAuthError: (state, { payload }) => {
      state.status = "not-authenticated"; 
      state.user = {};
      state.errorMessage = payload;
      state.isLoadingAuth = false;
    },

    onSetErrorMessage: (state, { payload }) => {
        state.errorMessage = payload;
        state.isLoadingAuth = false;
    },
    onLogout: (state, { payload }) => {
      state.status = "not-authenticated";
      state.user = {};
      state.errorMessage = payload;
    },
    onClearErrorMessage: (state) => {
      state.errorMessage = undefined;
    },
  },
});

export const {
  onChecking,
  onLogin,
  onRegister,
  onAuthError,
  onSetErrorMessage,
  onLogout,
  onClearErrorMessage,
  onStartLoading,
} = authSlice.actions;