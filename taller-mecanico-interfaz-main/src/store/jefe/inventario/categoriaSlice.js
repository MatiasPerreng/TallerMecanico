import { createSlice } from "@reduxjs/toolkit";

export const categoriaSlice = createSlice({
  name: "categoria",
  initialState: {
    isLoadingCategoria: false,
    categorias: [],
    activeCategoria: null,
  },
  reducers: {
    onStartLoading: (state) => {
      state.isLoadingCategoria = true;
    },
    onSetActiveCategoria: (state, { payload }) => {
      state.activeCategoria = payload;
    },
    onLoadCategorias: (state, { payload = [] }) => {
      state.isLoadingCategoria = false;
      //state.categorias = payload;
      payload.forEach((categoria) => {
        const exists = state.categorias.some(
          (dbCategoria) => dbCategoria.id === categoria.id
        );

        if (!exists) {
          state.categorias.push(categoria);
        }
      });
    },
    onAddNewCategoria: (state, { payload }) => {
      state.categorias.push(payload);
      state.activeCategoria = null;
    },
    onUpdateCategoria: (state, { payload }) => {
      state.categorias = state.categorias.map((categoria) => {
        if (categoria.id === payload.id) {
          return payload;
        }
        return categoria;
      });
    },
    onDeleteCategoria: (state) => {
      if (state.activeCategoria) {
        state.categorias = state.categorias.filter(
          (categoria) => categoria.id !== state.activeCategoria.id
        );
        state.activeCategoria = null;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onSetActiveCategoria,
  onLoadCategorias,
  onAddNewCategoria,
  onUpdateCategoria,
  onDeleteCategoria,
  onStartLoading,
} = categoriaSlice.actions;
