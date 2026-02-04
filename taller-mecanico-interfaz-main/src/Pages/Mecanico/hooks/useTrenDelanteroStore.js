import { useDispatch, useSelector } from "react-redux";
import {
  onLoadTrenDelantero,
  onSetActiveTrenDelantero,
  onStartLoadingTrenDelantero,
  onUpdateTrenDelantero,
} from "../../../store/mecanico/trenDelantero/trenDelanteroSlice";
import tallerMecanicoApi from "../../../api/tallerMecanicoApi";
import Swal from "sweetalert2";

export const useTrenDelanteroStore = () => {
  const dispatch = useDispatch();
  const { trenDelantero, activeTrenDelantero, isLoadingTrenDelantero } =
    useSelector((state) => state.trenDelantero);
  const { user } = useSelector((state) => state.auth);

  const setActiveTrenDelantero = (trenDelantero) => {
    dispatch(onSetActiveTrenDelantero(trenDelantero));
  };

  const startLoadingTrenDelantero = async (tareaAsignada) => {
    try {
      dispatch(onStartLoadingTrenDelantero());
      const { data } = await tallerMecanicoApi.get(
        `/trenes-delanteros/${tareaAsignada}`
      );
      dispatch(onLoadTrenDelantero([{ ...data.data }]));
    } catch (error) {
      console.log("Error al cargar", error);
    }
  };

  const startSavingTrenDelantero = async (trenDelantero) => {
    try {
      await tallerMecanicoApi.put(
        `trenes-delanteros/${trenDelantero.id}`,
        trenDelantero
      );
      console.log({ ...trenDelantero, user });
      dispatch(onUpdateTrenDelantero({ ...trenDelantero, user }));
      console.log({ ...trenDelantero, user });
    } catch (error) {
      console.log(error);
      Swal.fire("Error al guardar", "Error extra;o", "error");
    }
  };

  return {
    //* Propiedades
    trenDelantero,
    activeTrenDelantero,
    isLoadingTrenDelantero,
    hasTareaSelected: !!trenDelantero,

    //* Metodos
    setActiveTrenDelantero,
    startLoadingTrenDelantero,
    startSavingTrenDelantero,
  };
};
