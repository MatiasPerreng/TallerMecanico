import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewTarea,
  onDeleteTarea,
  onLoadTareas,
  onSetactiveTarea,
  onStartLoading,
  onUpdateTarea,
} from "../../../store/jefe/tareas/tareaSlice";
import tallerMecanicoApi from "../../../api/tallerMecanicoApi";
import Swal from "sweetalert2";

export const useTareaStore = () => {
  const dispatch = useDispatch();
  const { tareas, activeTarea, isLoadingTareas } = useSelector(
    (state) => state.tarea
  );
  const { user } = useSelector((state) => state.auth);

  const setActiveOrden = (orden) => {
    dispatch(onSetactiveTarea(orden));
  };

  const startLoadingTareas = async () => {
    try {
      dispatch(onStartLoading());
      const { data } = await tallerMecanicoApi.get(`/tareas`);
      
      // FastAPI devuelve el array directo. Validamos para no romper el spread.
      const tareasData = Array.isArray(data) ? data : data.data || [];
      dispatch(onLoadTareas(tareasData));

    } catch (error) {
      console.log("Error al cargar tareas", error);
      // Apagamos el spinner enviando una lista vacía
      dispatch(onLoadTareas([])); 
    }
  };

  const startSavingTarea = async (tarea) => {
    try {
      if (tarea.id) {
        await tallerMecanicoApi.put(`/tareas/${tarea.id}`, tarea);
        dispatch(onUpdateTarea({ ...tarea, user }));
        Swal.fire("Éxito", "Tarea actualizada", "success");
      } else {
        const { data } = await tallerMecanicoApi.post("/tareas", tarea);
        dispatch(onAddNewTarea({ ...data }));
        Swal.fire("Éxito", "Tarea creada", "success");
      }
    } catch (error) {
      const msg = error.response?.data?.detail || "Error al guardar la tarea";
      Swal.fire("Error al guardar", msg, "error");
    }
  };

  const startDeletingTarea = async (tarea) => {
    try {
      await tallerMecanicoApi.delete(`/tareas/${tarea.id}`);
      dispatch(onDeleteTarea());
      Swal.fire("Eliminado", "Tarea eliminada", "success");
    } catch (error) {
      const msg = error.response?.data?.detail || "Error al borrar";
      Swal.fire("Error al borrar", msg, "error");
    }
  };

  return {
    activeTarea,
    tareas,
    isLoadingTareas,
    hasClienteSelected: !!activeTarea,
    setActiveOrden,
    startLoadingTareas,
    startSavingTarea,
    startDeletingTarea,
  };
};