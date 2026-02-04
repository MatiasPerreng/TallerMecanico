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
      dispatch(onLoadOrdenes([...data.data]));
    } catch (error) {
      console.log("Error al cargar", error);
    }
  };

  const startSavingOrden = async (orden) => {
    try {
      if (orden.id) {
        await tallerMecanicoApi.put(`/ordenes/${orden.id}`, orden);
        dispatch(onUpdateOrden({ ...orden, user }));
        return;
      } else {
        const { data } = await tallerMecanicoApi.post("/ordenes", orden);
        console.log(data);
        dispatch(onAddNewOrden({ ...data }));
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error al guardar", "Error extra;o", "error");
    }
  };

  const startDeletingOrden = async (orden) => {
    try {
      await tallerMecanicoApi.delete(`/ordenes/${orden.id}`);
      dispatch(onDeleteOrden());
    } catch (error) {
      console.log(error);
      Swal.fire("Error al borrar", error.response.data?.message, "error");
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
