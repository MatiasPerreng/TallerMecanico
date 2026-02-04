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
      state.isLoadingClientes = false; // Detiene el spinner
   
      const newClientes = payload.filter(
        (newCli) => !state.clientes.some((dbCli) => dbCli.id === newCli.id)
      );
      state.clientes = [...state.clientes, ...newClientes];
    },
    onAddNewCliente: (state, { payload }) => {
      state.clientes.push(payload);
      state.activeCliente = null;
      state.isLoadingClientes = false;
    },
    onUpdateCliente: (state, { payload }) => {
      state.isLoadingClientes = false; 
      state.clientes = state.clientes.map((cliente) => {
        if (cliente.id === payload.id) {
          return payload;
        }
        return cliente;
      });
      state.activeCliente = null;
    },
    onDeleteCliente: (state, { payload }) => {

      state.isLoadingClientes = false; 

 
      const idToDelete = payload || (state.activeCliente ? state.activeCliente.id : null);
      
      if (idToDelete) {
        state.clientes = state.clientes.filter(
          (cliente) => cliente.id !== idToDelete
        );
      }
      
      state.activeCliente = null;
    },
  },
});

export const {
  onSetActiveCliente,
  onLoadClientes,
  onAddNewCliente,
  onUpdateCliente,
  onDeleteCliente,
  onStartLoading,
} = clienteSlice.actions;