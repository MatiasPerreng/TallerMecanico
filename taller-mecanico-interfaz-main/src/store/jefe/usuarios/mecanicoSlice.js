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
      state.activeMecanico = payload;
    },


    onAddNewMecanico: (state, { payload }) => {
      state.mecanicos.push(payload);
      state.activeMecanico = null;
    },


    onLoadMecanicos: (state, { payload = [] }) => {
      state.isLoadingMecanico = false;
      
      state.mecanicos = payload;
    },

    
    onUpdateMecanico: (state, { payload }) => {
      state.mecanicos = state.mecanicos.map((mecanico) => {
        if (mecanico.id === payload.id) {
          return payload;
        }
        return mecanico;
      });
    },

   
    onDeleteMecanico: (state) => {
      if (state.activeMecanico) {
        state.mecanicos = state.mecanicos.filter(
          (mecanico) => mecanico.id !== state.activeMecanico.id
        );
        state.activeMecanico = null;
      }
    },
  },
});


export const { 
    onSetActiveMecanico, 
    onLoadMecanicos, 
    onAddNewMecanico, 
    onUpdateMecanico, 
    onDeleteMecanico 
} = mecanicoSlice.actions;