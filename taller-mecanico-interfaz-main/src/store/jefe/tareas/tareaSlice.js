import { createSlice } from "@reduxjs/toolkit";

export const tareaSlice = createSlice({
  name: "tarea",
  initialState: {
    isLoadingTareas: true,
    tareas: [],
    activeTarea: null,
  },
  reducers: {
    onStartLoading: (state) => {
      state.isLoadingTareas = true;
    },
    onSetActiveTarea: (state, { payload }) => {
      state.activeTarea = payload;
    },
    onLoadTareas: (state, { payload = [] }) => {
      state.isLoadingTareas = false;
      state.tareas = payload; // <-- Cambiado: siempre reemplaza la lista
    },
    onAddNewTarea: (state, { payload }) => {
      state.tareas.push(payload);
      state.activeTarea = null;
    },
    onUpdateTarea: (state, { payload }) => {
      state.tareas = state.tareas.map((tarea) => {
        if (tarea.id === payload.id) {
          return payload;
        }
        return tarea;
      });
    },
    onDeleteTarea: (state) => {
      if (state.activeTarea) {
        state.tareas = state.tareas.filter(
          (tarea) => tarea.id !== state.activeTarea.id
        );
        state.activeTarea = null;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onSetactiveTarea,
  onLoadTareas,
  onAddNewTarea,
  onUpdateTarea,
  onDeleteTarea,
  onStartLoading,
} = tareaSlice.actions;

export default tareaSlice.reducer;
