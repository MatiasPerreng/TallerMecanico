import { createSlice } from "@reduxjs/toolkit";

export const trenDelanteroSlice = createSlice({
  name: "trenDelantero",
  initialState: {
    isLoadingTrenDelantero: true,
    trenDelantero: [],
    activeTrenDelantero: null,
  },
  reducers: {
    onStartLoadingTrenDelantero: (state) => {
      state.isLoadingTrenDelantero = true;
    },
    onSetActiveTrenDelantero: (state, { payload }) => {
      state.activeTrenDelantero = payload;
    },
    onLoadTrenDelantero: (state, { payload = [] }) => {
      state.trenDelantero = payload;
      state.isLoadingTrenDelantero = false;
    },
    onUpdateTrenDelantero: (state, { payload }) => {
      state.trenDelantero = state.trenDelantero.map((tren) => {
        if (tren.id === payload.id) {
          return payload;
        }
        return tren;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onStartLoadingTrenDelantero,
  onSetActiveTrenDelantero,
  onLoadTrenDelantero,
  onUpdateTrenDelantero,
} = trenDelanteroSlice.actions;
