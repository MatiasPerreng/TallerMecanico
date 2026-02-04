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
  const { tareasAsignadas, activeTareaAsignada, isLoadingTareasAsignadas } =
    useSelector((state) => state.tareaAsignada);
  const { user } = useSelector((state) => state.auth);

  const setActiveTareaAsignada = (orden) => {
    dispatch(onSetActiveTareaAsignada(orden));
  };

  const startLoadingTareasAsignadas = async () => {
    try {
      dispatch(onStartLoading());
      const { data } = await tallerMecanicoApi.get(`/tareas/mecanico`);
      dispatch(onLoadTareas([...data.data]));
      console.log(data);
    } catch (error) {
      console.log("Error al cargar", error);
    }
  };

  const startSavingTareaAsignada = async (tareaAsignada) => {
    try {
      if (tareaAsignada.id) {
        await tallerMecanicoApi.put(
          `/tareas/${tareaAsignada.id}`,
          tareaAsignada
        );
        dispatch(onUpdateTarea({ ...tareaAsignada, user }));
        return;
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error al guardar", "Error extra;o", "error");
    }
  };

  return {
    //* Propiedades
    tareasAsignadas,
    activeTareaAsignada,
    isLoadingTareasAsignadas,
    hasTareaSelected: !!tareasAsignadas,

    //* Metodos
    setActiveTareaAsignada,
    startLoadingTareasAsignadas,
    startSavingTareaAsignada,
  };
};
