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
      //state.productos = payload;
      payload.forEach((producto) => {
        const exists = state.productos.some(
          (dbProducto) => dbProducto.id === producto.id
        );

        if (!exists) {
          state.productos.push(producto);
        }
      });
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
} = productoSlice.actions;
