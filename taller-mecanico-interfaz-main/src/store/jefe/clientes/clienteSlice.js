import { createSlice } from "@reduxjs/toolkit";

export const clienteSlice = createSlice({
  name: "clientes",
  initialState: {
    isLoadingClientes: false,
    clientes: [],
    activeCliente: null,
    actualPage: 1,
    lastPage: 1,
  },
  reducers: {
    onStartLoading: (state) => {
      state.isLoadingClientes = true;
    },
    onSetActiveCliente: (state, { payload }) => {
      state.activeCliente = payload;
    },
    onLoadClientes: (state, { payload = [] }) => {
      state.isLoadingClientes = false;
      //state.clientes = payload;
      payload.forEach((cliente) => {
        const exists = state.clientes.some(
          (dbCliente) => dbCliente.id === cliente.id
        );

        if (!exists) {
          state.clientes.push(cliente);
        }
      });
    },
    onAddNewCliente: (state, { payload }) => {
      state.clientes.push(payload);
      state.activeCliente = null;
    },
    onUpdateCliente: (state, { payload }) => {
      state.clientes = state.clientes.map((cliente) => {
        if (cliente.id === payload.id) {
          return payload;
        }
        return cliente;
      });
    },
    onDeleteCliente: (state) => {
      if (state.activeCliente) {
        state.clientes = state.clientes.filter(
          (cliente) => cliente.id !== state.activeCliente.id
        );
        state.activeCliente = null;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onSetActiveCliente,
  onLoadClientes,
  onAddNewCliente,
  onUpdateCliente,
  onDeleteCliente,
  onStartLoading,
} = clienteSlice.actions;
