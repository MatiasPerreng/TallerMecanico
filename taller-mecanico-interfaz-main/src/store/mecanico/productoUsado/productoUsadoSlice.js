import { createSlice } from "@reduxjs/toolkit";

export const productoUsado = createSlice({
  name: "productoUsado",
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
    },
    onDeleteProducto: (state) => {
      if (state.activeProducto) {
        state.productos = state.productos.filter(
          (producto) => producto.id !== state.activeProducto.id
        );
        state.activeProducto = null;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onSetActiveProducto,
  onLoadProductos,
  onAddNewProducto,
  onUpdateProducto,
  onDeleteProducto,
  onStartLoading,
} = productoUsado.actions;
