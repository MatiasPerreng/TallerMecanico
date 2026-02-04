import { createSlice } from "@reduxjs/toolkit";

export const ordenSlice = createSlice({
  name: "orden",
  initialState: {
    isLoadingOrdenes: true,
    ordenes: [],
    activeOrdenes: null,
  },
  reducers: {
    onStartLoading: (state) => {
      state.isLoadingOrdenes = true;
    },
    onSetActiveOrdenes: (state, { payload }) => {
      state.activeOrdenes = payload;
    },
    onLoadOrdenes: (state, { payload = [] }) => {
      state.isLoadingOrdenes = false;
      //state.ordenes = payload;
      payload.forEach((orden) => {
        const exists = state.ordenes.some((dbOrden) => dbOrden.id === orden.id);

        if (!exists) {
          state.ordenes.push(orden);
        }
      });
    },
    onAddNewOrden: (state, { payload }) => {
      state.ordenes.push(payload);
      state.activeOrdenes = null;
    },
    onUpdateOrden: (state, { payload }) => {
      state.ordenes = state.ordenes.map((orden) => {
        if (orden.id === payload.id) {
          return payload;
        }
        return orden;
      });
    },
    onDeleteOrden: (state) => {
      if (state.activeOrdenes) {
        state.ordenes = state.ordenes.filter(
          (orden) => orden.id !== state.activeOrdenes.id
        );
        state.activeOrdenes = null;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onSetActiveOrdenes,
  onLoadOrdenes,
  onAddNewOrden,
  onUpdateOrden,
  onDeleteOrden,
  onStartLoading,
} = ordenSlice.actions;
