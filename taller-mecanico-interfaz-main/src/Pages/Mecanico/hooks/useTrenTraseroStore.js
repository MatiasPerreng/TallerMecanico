import { useDispatch, useSelector } from "react-redux";
import {
  onLoadTrenTrasero,
  onSetActiveTrenTrasero,
  onStartLoadingTrenTrasero,
  onUpdateTrenTrasero,
} from "../../../store/mecanico/trenTrasero/trenTraseroSlice";
import tallerMecanicoApi from "../../../api/tallerMecanicoApi";
import Swal from "sweetalert2";

export const useTrenTraseroStore = () => {
  const dispatch = useDispatch();
  const { trenTrasero, activeTrenTrasero, isLoadingTrenTrasero } = useSelector(
    (state) => state.trenTrasero
  );
  const { user } = useSelector((state) => state.auth);

  const setActiveTrenTrasero = (trenTrasero) => {
    dispatch(onSetActiveTrenTrasero(trenTrasero));
  };

  const startLoadingTrenTrasero = async (tareaAsignada) => {
    try {
      dispatch(onStartLoadingTrenTrasero());
      const { data } = await tallerMecanicoApi.get(
        `/trenes-traseros/${tareaAsignada}`
      );
      dispatch(onLoadTrenTrasero([{ ...data.data }]));
    } catch (error) {
      console.log("Error al cargar", error);
    }
  };

  const startSavingTrenTrasero = async (trenDelantero) => {
    try {
      await tallerMecanicoApi.put(
        `trenes-traseros/${trenDelantero.id}`,
        trenDelantero
      );
      dispatch(onUpdateTrenTrasero({ ...trenDelantero, user }));
    } catch (error) {
      console.log(error);
      Swal.fire("Error al guardar", "Error extra;o", "error");
    }
  };

  return {
    //* Propiedades
    trenTrasero,
    activeTrenTrasero,
    isLoadingTrenTrasero,
    hasTareaSelected: !!trenTrasero,

    //* Metodos
    setActiveTrenTrasero,
    startLoadingTrenTrasero,
    startSavingTrenTrasero,
  };
};
