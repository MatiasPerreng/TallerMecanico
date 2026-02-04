import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewOrden,
  onDeleteOrden,
  onLoadOrdenes,
  onSetActiveOrdenes,
  onStartLoading,
  onUpdateOrden,
} from "../../../store/jefe/ordenes/ordenSlice";
import tallerMecanicoApi from "../../../api/tallerMecanicoApi";
import Swal from "sweetalert2";

export const useOrdenStore = () => {
  const dispatch = useDispatch();
  const { ordenes, activeOrdenes, isLoadingOrdenes } = useSelector(
    (state) => state.orden
  );
  const { user } = useSelector((state) => state.auth);

  const setActiveOrden = (orden) => {
    dispatch(onSetActiveOrdenes(orden));
  };

  const startLoadingOrdenes = async () => {
    try {
      dispatch(onStartLoading());
      
      const { data } = await tallerMecanicoApi.get(`/ordenes`);
      
      const ordenesData = Array.isArray(data) ? data : (data.data || []);
      
      dispatch(onLoadOrdenes(ordenesData));
      
    } catch (error) {
      console.error("Error al cargar órdenes", error);
      dispatch(onLoadOrdenes([]));
    }
  };

  const startSavingOrden = async (orden) => {
    try {
      if (orden.id) {
        // Actualizar Orden
        await tallerMecanicoApi.put(`/ordenes/${orden.id}`, orden);
        dispatch(onUpdateOrden({ ...orden, user }));
        Swal.fire("Actualizado", "La orden se actualizó correctamente", "success");
      } else {
        // Crear Orden
        const { data } = await tallerMecanicoApi.post("/ordenes", orden);
        dispatch(onAddNewOrden({ ...data }));
        Swal.fire("Guardado", "La orden se creó correctamente", "success");
      }
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.detail || "Error al procesar la orden";
      Swal.fire("Error al guardar", msg, "error");
    }
  };

  const startDeletingOrden = async (orden) => {
    try {
      await tallerMecanicoApi.delete(`/ordenes/${orden.id}`);
      dispatch(onDeleteOrden());
      Swal.fire("Eliminado", "La orden ha sido borrada", "success");
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.detail || "No se pudo eliminar la orden";
      Swal.fire("Error al borrar", msg, "error");
    }
  };

  return {
    //* Propiedades
    activeOrdenes,
    ordenes,
    isLoadingOrdenes,
    hasClienteSelected: !!activeOrdenes,

    //* Metodos
    setActiveOrden,
    startLoadingOrdenes,
    startSavingOrden,
    startDeletingOrden,
  };
};