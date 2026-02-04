import { createSlice } from "@reduxjs/toolkit";

export const mecanicoSlice = createSlice({
  name: "mecanico",
  initialState: {
    isLoadingMecanico: true,
    mecanicos: [],
    activeMecanico: null,
  },
  reducers: {
    onSetActiveMecanico: (state, { payload }) => {
      state.activeTarea = payload;
    },
    onLoadMecanicos: (state, { payload = [] }) => {
      state.isLoadingMecanico = false;
      payload.forEach((mecanico) => {
        const exists = state.mecanicos.some(
          (dbMecanico) => dbMecanico.id === mecanico.id
        );

        if (!exists) {
          state.mecanicos.push(mecanico);
        }
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { onSetActiveMecanico, onLoadMecanicos } = mecanicoSlice.actions;
