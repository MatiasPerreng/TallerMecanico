import { createSlice } from "@reduxjs/toolkit";

export const tareaAsignadaSlice = createSlice({
  name: "tareaAsignada",
  initialState: {
    isLoadingTareasAsignadas: true,
    tareasAsignadas: [],
    activeTareaAsignada: null,
  },
  reducers: {
    onStartLoading: (state) => {
      state.isLoadingTareasAsignadas = true;
    },
    onSetActiveTareaAsignada: (state, { payload }) => {
      state.activeTareaAsignada = payload;
    },
    onLoadTareas: (state, { payload = [] }) => {
      state.isLoadingTareasAsignadas = false;
      //state.Tareas = payload;
      payload.forEach((tareaAsignada) => {
        const exists = state.tareasAsignadas.some(
          (dbTareaAsignada) => dbTareaAsignada.id === tareaAsignada.id
        );

        if (!exists) {
          state.tareasAsignadas.push(tareaAsignada);
        }
      });
    },
    onAddNewTarea: (state, { payload }) => {
      state.tareasAsignadas.push(payload);
      state.activeTareaAsignada = null;
    },
    onUpdateTarea: (state, { payload }) => {
      state.tareasAsignadas = state.tareasAsignadas.map((tareaAsignada) => {
        if (tareaAsignada.id === payload.id) {
          return payload;
        }
        return tareaAsignada;
      });
    },
    onDeleteTarea: (state) => {
      if (state.activeTareaAsignada) {
        state.tareasAsignadas = state.tareasAsignadas.filter(
          (tareaAsignada) => tareaAsignada.id !== state.activeTareaAsignada.id
        );
        state.activeTareaAsignada = null;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onSetActiveTareaAsignada,
  onLoadTareas,
  onAddNewTarea,
  onUpdateTarea,
  onDeleteTarea,
  onStartLoading,
} = tareaAsignadaSlice.actions;
