import { createSlice } from "@reduxjs/toolkit";

export const frenoSlice = createSlice({
  name: "freno",
  initialState: {
    isLoadingFrenos: true,
    frenos: [],
    activeFreno: null,
  },
  reducers: {
    onStartLoadingFrenos: (state) => {
      state.isLoadingFrenos = true;
    },
    onSetActiveFrenos: (state, { payload }) => {
      state.activeFreno = payload;
    },
    onLoadFrenos: (state, { payload = [] }) => {
      state.frenos = payload;
      state.isLoadingFrenos = false;
    },
    onUpdateFrenos: (state, { payload }) => {
      state.frenos = state.frenos.map((freno) => {
        if (freno.id === payload.id) {
          return payload;
        }
        return freno;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onStartLoadingFrenos,
  onSetActiveFrenos,
  onLoadFrenos,
  onUpdateFrenos,
} = frenoSlice.actions;
