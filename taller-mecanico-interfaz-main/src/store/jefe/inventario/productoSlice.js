import { createSlice } from "@reduxjs/toolkit";

export const productoSlice = createSlice({
  name: "producto",
  initialState: {
    isLoadingProducto: false,
    productos: [],
    activeProducto: null,
  },
  reducers: {
    onStartLoading: (state) => {
      state.isLoadingProducto = true;
    },
    onSetActiveProducto: (state, { payload }) => {
      state.activeProducto = payload;
    },
    onLoadProductos: (state, { payload = [] }) => {
      state.isLoadingProducto = false;
      state.productos = payload;
    },
    onAddNewProducto: (state, { payload }) => {
      state.productos.push(payload);
      state.activeProducto = null;
    },
    onUpdateProducto: (state, { payload }) => {
      state.productos = state.productos.map((producto) => {
        if (producto.id === payload.id) {
          return payload;
        }
        return producto;
      });
      state.activeProducto = null;
    },
    onDeleteProducto: (state) => {
      if (state.activeProducto) {
        state.productos = state.productos.filter(
          (producto) => producto.id !== state.activeProducto.id
        );
        state.activeProducto = null;
      }
    },
    onLogoutProducto: (state) => {
      state.isLoadingProducto = false;
      state.productos = [];
      state.activeProducto = null;
    }
  },
});

export const {
  onSetActiveProducto,
  onLoadProductos,
  onAddNewProducto,
  onUpdateProducto,
  onDeleteProducto,
  onStartLoading,
  onLogoutProducto,
} = productoSlice.actions;