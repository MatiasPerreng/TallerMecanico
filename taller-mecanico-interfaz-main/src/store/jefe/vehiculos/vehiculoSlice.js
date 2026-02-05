import { createSlice } from "@reduxjs/toolkit";

export const vehiculoSlice = createSlice({
  name: "vehiculos",
  initialState: {
    isLoadingVehiculos: false,
    vehiculos: [],
    activeVehiculo: null,
  },
  reducers: {
    onStartLoading: (state) => {
      state.isLoadingVehiculos = true;
    },
    onSetActiveVehiculo: (state, { payload }) => {
      state.activeVehiculo = payload;
    },
    onLoadVehiculos: (state, { payload = [] }) => {
      state.isLoadingVehiculos = false; // Mata el spinner

      state.vehiculos = payload; 
    },
    onAddNewVehiculo: (state, { payload }) => {
      state.vehiculos.push(payload);
      state.activeVehiculo = null;
      state.isLoadingVehiculos = false; 
    },
    onUpdateVehiculo: (state, { payload }) => {
      state.isLoadingVehiculos = false;
      state.vehiculos = state.vehiculos.map((vehiculo) => {
        if (vehiculo.id === payload.id) {
          return payload;
        }
        return vehiculo;
      });
      state.activeVehiculo = null;
    },
    onDeleteVehiculo: (state, { payload }) => {
      state.isLoadingVehiculos = false; 

 
      const idToDelete = payload || (state.activeVehiculo ? state.activeVehiculo.id : null);

      if (idToDelete) {
        state.vehiculos = state.vehiculos.filter(
          (vehiculo) => vehiculo.id !== idToDelete
        );
      }
      state.activeVehiculo = null;
    },

    onStopLoadingVehiculos: (state) => {
      state.isLoadingVehiculos = false;
    }
  },
});

export const {
  onSetActiveVehiculo,
  onLoadVehiculos,
  onAddNewVehiculo,
  onUpdateVehiculo,
  onDeleteVehiculo,
  onStartLoading,
  onStopLoadingVehiculos
} = vehiculoSlice.actions;