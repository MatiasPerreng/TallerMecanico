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
      state.isLoadingVehiculos = false;
      //state.vehiculos = payload;
      payload.forEach((vehiculo) => {
        const exists = state.vehiculos.some(
          (dbVehiculo) => dbVehiculo.id === vehiculo.id
        );

        if (!exists) {
          state.vehiculos.push(vehiculo);
        }
      });
    },
    onAddNewVehiculo: (state, { payload }) => {
      state.vehiculos.push(payload);
      state.activeVehiculo = null;
    },
    onUpdateVehiculo: (state, { payload }) => {
      state.vehiculos = state.vehiculos.map((vehiculo) => {
        if (vehiculo.id === payload.id) {
          return payload;
        }
        return vehiculo;
      });
    },
    onDeleteVehiculo: (state) => {
      if (state.activeVehiculo) {
        state.vehiculos = state.vehiculos.filter(
          (vehiculo) => vehiculo.id !== state.activeVehiculo.id
        );
        state.activeVehiculo = null;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onSetActiveVehiculo,
  onLoadVehiculos,
  onAddNewVehiculo,
  onUpdateVehiculo,
  onDeleteVehiculo,
  onStartLoading,
} = vehiculoSlice.actions;
