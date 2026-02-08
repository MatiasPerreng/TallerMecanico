import { useDispatch, useSelector } from "react-redux";
import {
  onLoadTareas,
  onSetActiveTareaAsignada,
  onStartLoading,
  onUpdateTarea,
} from "../../../store/mecanico/tareas/tareaAsignadaSlice";
import tallerMecanicoApi from "../../../api/tallerMecanicoApi";
import Swal from "sweetalert2";

export const useTareaAsignadaStore = () => {
  const dispatch = useDispatch();
  
  const { 
    tareasAsignadas = [], 
    activeTareaAsignada, 
    isLoadingTareasAsignadas 
  } = useSelector((state) => state.tareaAsignada);
  
  const { user } = useSelector((state) => state.auth);

  const setActiveTareaAsignada = (tarea) => {
    dispatch(onSetActiveTareaAsignada(tarea));
  };

  const startLoadingTareasAsignadas = async () => {
    dispatch(onStartLoading());
    try {
      const { data } = await tallerMecanicoApi.get('/tareas/');
      const tareas = Array.isArray(data) ? data : (data?.data || []);
      dispatch(onLoadTareas(tareas));
    } catch (error) {
      console.error("Error al cargar tareas:", error);
      dispatch(onLoadTareas([]));
      Swal.fire({
        icon: 'error',
        title: 'Error de conexión',
        text: 'No se pudieron cargar las tareas. Revisa el servidor.',
        timer: 2000,
        showConfirmButton: false
      });
    }
  };

  const startSavingTareaAsignada = async (tareaAsignada) => {
    try {
      if (tareaAsignada.id) {
        const { data } = await tallerMecanicoApi.put(
          `/tareas/${tareaAsignada.id}`,
          tareaAsignada
        );
        dispatch(onUpdateTarea({ ...data, user }));
        Swal.fire({
          icon: "success",
          title: "Guardado",
          text: "Tarea actualizada correctamente",
          timer: 1500,
          showConfirmButton: false
        });
        return true;
      }
    } catch (error) {
      console.error("Error al guardar:", error);
      Swal.fire("Error al guardar", "No se pudo actualizar la tarea en el servidor", "error");
      return false;
    }
  };

  // Se añade esta para completar el ciclo de borrado sin desloguear
  const startDeletingTarea = async (id) => {
    try {
        await tallerMecanicoApi.delete(`/tareas/${id}`);
        startLoadingTareasAsignadas(); // Recargamos la lista
        Swal.fire("Eliminado", "Registro borrado", "success");
    } catch (error) {
        console.error(error);
        Swal.fire("Error", "No se pudo eliminar", "error");
    }
  };

  return {
    tareasAsignadas,
    activeTareaAsignada,
    isLoadingTareasAsignadas,
    hasTareaSelected: !!activeTareaAsignada,
    setActiveTareaAsignada,
    startLoadingTareasAsignadas,
    startSavingTareaAsignada,
    startDeletingTarea,
  };
};