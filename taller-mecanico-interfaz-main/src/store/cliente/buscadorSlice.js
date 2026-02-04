import { createSlice } from "@reduxjs/toolkit";

export const buscadorSlice = createSlice({
  name: "buscador",
  initialState: {
    isLoadingBuscador: false,
    buscador: [],
    activeBuscador: null,
  },
  reducers: {
    onStartLoadingBuscador: (state) => {
      state.isLoadingBuscador = true;
    },
    onSetActiveBuscador: (state, { payload }) => {
      state.activeBuscador = payload;
    },
    onLoadBuscador: (state, { payload = [] }) => {
      state.buscador = payload;
      state.isLoadingBuscador = false;
    },
    onUpdateBuscador: (state, { payload }) => {
      state.buscador = state.buscador.map((buscador) => {
        if (buscador.id === payload.id) {
          return payload;
        }
        return buscador;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onStartLoadingBuscador,
  onSetActiveBuscador,
  onLoadBuscador,
  onUpdateBuscador,
} = buscadorSlice.actions;
