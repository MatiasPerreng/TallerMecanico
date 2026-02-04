import { createSlice } from "@reduxjs/toolkit";

export const usuarioSlice = createSlice({
  name: "usuario",
  initialState: {
    isLoadingUsuarios: false,
    usuarios: [],
    activeUsuario: null,
  },
  reducers: {
    onStartLoading: (state) => {
      state.isLoadingUsuarios = true;
    },
    onSetActiveUsuario: (state, { payload }) => {
      state.activeUsuario = payload;
    },
    onLoadUsuarios: (state, { payload = [] }) => {
      state.isLoadingUsuarios = false;
      //state.clientes = payload;
      payload.forEach((usuario) => {
        const exists = state.usuarios.some(
          (dbUsuario) => dbUsuario.id === usuario.id
        );

        if (!exists) {
          state.usuarios.push(usuario);
        }
      });
    },
    onAddNewUsuario: (state, { payload }) => {
      state.usuarios.push(payload);
      state.activeUsuario = null;
    },
    onUpdateUsuario: (state, { payload }) => {
      state.usuarios = state.usuarios.map((usuario) => {
        if (usuario.id === payload.id) {
          return payload;
        }
        return usuario;
      });
    },
    onDeleteUsuario: (state) => {
      if (state.activeUsuario) {
        state.usuarios = state.usuarios.filter(
          (usuario) => usuario.id !== state.activeUsuario.id
        );
        state.activeUsuario = null;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onSetActiveUsuario,
  onLoadUsuarios,
  onAddNewUsuario,
  onUpdateUsuario,
  onDeleteUsuario,
  onStartLoading,
} = usuarioSlice.actions;
