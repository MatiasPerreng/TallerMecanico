import { useDispatch, useSelector } from "react-redux";
import {
  onLoadFrenos,
  onSetActiveFrenos,
  onStartLoadingFrenos,
  onUpdateFrenos,
} from "../../../store/mecanico/frenos/frenoSlice";
import tallerMecanicoApi from "../../../api/tallerMecanicoApi";
import Swal from "sweetalert2";

export const useFrenoStore = () => {
  const dispatch = useDispatch();
  const { frenos, activeFreno, isLoadingFrenos } = useSelector(
    (state) => state.freno
  );
  const { user } = useSelector((state) => state.auth);

  const setActiveFrenos = (freno) => {
    dispatch(onSetActiveFrenos(freno));
  };

  const startLoadingFrenos = async (freno) => {
    try {
      dispatch(onStartLoadingFrenos());
      const { data } = await tallerMecanicoApi.get(`/frenos/${freno}`);
      dispatch(onLoadFrenos([{ ...data.data }]));
    } catch (error) {
      console.log("Error al cargar", error);
    }
  };

  const startSavingFrenos = async (freno) => {
    try {
      await tallerMecanicoApi.put(`frenos/${freno.id}`, freno);
      dispatch(onUpdateFrenos({ ...freno, user }));
    } catch (error) {
      console.log(error);
      Swal.fire("Error al guardar", "Error extra;o", "error");
    }
  };

  return {
    //* Propiedades
    frenos,
    activeFreno,
    isLoadingFrenos,
    hasTareaSelected: !!frenos,

    //* Metodos
    setActiveFrenos,
    startLoadingFrenos,
    startSavingFrenos,
  };
};
