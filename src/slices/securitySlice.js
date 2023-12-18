import { createSlice } from "@reduxjs/toolkit";
import {
  loadUser,
  login,
  register,
  update,
  updatePassword
} from "../actions/userAction";
import { saveAddressInfo } from "../actions/cartAction";

const initialState = {
  loading: false,
  errores: [],
  isAuthenticated: false,
  user: null,
  isUpdated: false,
  direccionEnvio: null,
};

export const securitySlice = createSlice({
  name: "security",
  initialState,
  reducers: {
    logout: (state, action) => {
      localStorage.removeItem("token");
      state.isAuthenticated = false;
      state.user = null;
      state.errores = [];
      state.loading = false;
      state.direccionEnvio = null;
    },
    resetUpdateStatus: (state, action) => {
      state.isUpdated = false;
    },
  },
  extraReducers: {
    // sistem login

    [login.pending]: (state) => {
      state.loading = true;
      state.errores = [];
    },
    [login.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      state.errores = [];
      state.isAuthenticated = true;
      state.direccionEnvio = payload.direccionEnvio;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.errores = action.payload;
      state.isAuthenticated = false;
      state.user = null;
    },

    // user regsiter

    [register.pending]: (state) => {
      state.loading = true;
      state.errores = [];
    },
    [register.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      state.errores = [];
      state.isAuthenticated = true;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.errores = action.payload;
      state.isAuthenticated = false;
      state.user = null;
    },

    // update user info

    [update.pending]: (state) => {
      state.loading = true;
      state.errores = [];
    },
    [update.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      state.errores = [];
      state.isAuthenticated = true;
      state.isUpdated = true;
    },
    [update.rejected]: (state, action) => {
      state.loading = false;
      state.errores = action.payload;
      state.isAuthenticated = false;
      state.user = null;
    },

    // updatePassword

    [updatePassword.pending]: (state) => {
      state.loading = true;
      state.errores = [];
    },
    [updatePassword.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isAuthenticated = true;
    },
    [updatePassword.rejected]: (state, action) => {
      state.loading = false;
      state.errores = action.payload;
      state.isAuthenticated = false;
      state.user = null;
    },

    // loadInfoUser

    [loadUser.pending]: (state) => {
      state.loading = true;
      state.errores = [];
    },
    [loadUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      state.errores = [];
      state.direccionEnvio = payload.direccionEnvio;
    },
    [loadUser.rejected]: (state, action) => {
      state.loading = false;
      state.errores = action.payload;
      state.isAuthenticated = false;
      state.user = null;
    },

    // Address

    [saveAddressInfo.pending]: (state) => {
      state.loading = true;
      state.errores = [];
    },
    [saveAddressInfo.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.errores = [];
      state.isUpdated = true;
      state.direccionEnvio = payload;
    },
    [saveAddressInfo.rejected]: (state, action) => {
      state.loading = false;
      state.errores = action.payload;
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { logout, resetUpdateStatus } = securitySlice.actions;
export const securityReducer = securitySlice.reducer;
