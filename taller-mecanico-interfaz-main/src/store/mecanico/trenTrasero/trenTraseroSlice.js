import { createSlice } from "@reduxjs/toolkit";

export const trenTraseroSlice = createSlice({
  name: "trenTrasero",
  initialState: {
    isLoadingTrenTrasero: true,
    trenTrasero: [],
    activeTrenTrasero: null,
  },
  reducers: {
    onStartLoadingTrenTrasero: (state) => {
      state.isLoadingTrenTrasero = true;
    },
    onSetActiveTrenTrasero: (state, { payload }) => {
      state.activeTrenTrasero = payload;
    },
    onLoadTrenTrasero: (state, { payload = [] }) => {
      state.trenTrasero = payload;
      state.isLoadingTrenTrasero = false;
    },
    onUpdateTrenTrasero: (state, { payload }) => {
      state.trenTrasero = state.trenTrasero.map((tren) => {
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
  onStartLoadingTrenTrasero,
  onSetActiveTrenTrasero,
  onLoadTrenTrasero,
  onUpdateTrenTrasero,
} = trenTraseroSlice.actions;
