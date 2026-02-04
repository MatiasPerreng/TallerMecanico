import { useDispatch, useSelector } from "react-redux";
import {
  onLoadBuscador,
  onSetActiveBuscador,
  onStartLoadingBuscador,
} from "../../../store/cliente/buscadorSlice";
import tallerMecanicoApi from "../../../api/tallerMecanicoApi";

export const useBuscadorStore = () => {
  const dispatch = useDispatch();
  const { buscador, activeBuscador, isLoadingBuscador } = useSelector(
    (state) => state.buscador
  );

  const setActiveBuscador = (buscador) => {
    dispatch(onSetActiveBuscador(buscador));
  };

  const startLoadingBuscador = async (orden) => {
    try {
      dispatch(onStartLoadingBuscador());
      const { data } = await tallerMecanicoApi.get(`/search/ordenes/${orden}`);
      console.log("data del use", data.data.results);
      dispatch(onLoadBuscador(data.data));
    } catch (error) {
      console.log("Error al cargar", error);
    }
  };

  return {
    //* Propiedades
    buscador,
    activeBuscador,
    isLoadingBuscador,
    hasBuscadorSelector: !!buscador,

    //* Metodos
    setActiveBuscador,
    startLoadingBuscador,
  };
};
