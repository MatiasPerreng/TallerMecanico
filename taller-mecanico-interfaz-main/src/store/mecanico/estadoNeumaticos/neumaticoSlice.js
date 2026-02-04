import { createSlice } from "@reduxjs/toolkit";

export const neumaticoSlice = createSlice({
  name: "neumatico",
  initialState: {
    isLoadingNeumaticos: true,
    neumaticos: [],
    activeNeumatico: null,
  },
  reducers: {
    onStartLoadingNeumaticos: (state) => {
      state.isLoadingNeumaticos = true;
    },
    onSetActiveNeumaticos: (state, { payload }) => {
      state.activeNeumatico = payload;
    },
    onLoadNeumaticos: (state, { payload = [] }) => {
      state.neumaticos = payload;
      state.isLoadingNeumaticos = false;
    },
    onUpdateNeumaticos: (state, { payload }) => {
      state.neumaticos = state.neumaticos.map((neumatico) => {
        if (neumatico.id === payload.id) {
          return payload;
        }
        return neumatico;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onStartLoadingNeumaticos,
  onSetActiveNeumaticos,
  onLoadNeumaticos,
  onUpdateNeumaticos,
} = neumaticoSlice.actions;
