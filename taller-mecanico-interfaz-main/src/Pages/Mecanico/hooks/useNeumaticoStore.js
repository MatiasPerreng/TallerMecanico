import { useDispatch, useSelector } from "react-redux";
import {
  onLoadNeumaticos,
  onSetActiveNeumaticos,
  onStartLoadingNeumaticos,
  onUpdateNeumaticos,
} from "../../../store/mecanico/estadoNeumaticos/neumaticoSlice";
import tallerMecanicoApi from "../../../api/tallerMecanicoApi";
import Swal from "sweetalert2";

export const useNeumaticoStore = () => {
  const dispatch = useDispatch();
  const { neumaticos, activeNeumatico, isLoadingNeumaticos } = useSelector(
    (state) => state.neumatico
  );
  const { user } = useSelector((state) => state.auth);

  const setActiveNeumaticos = (neumatico) => {
    dispatch(onSetActiveNeumaticos(neumatico));
  };

  const startLoadingNeumaticos = async (neumatico) => {
    try {
      dispatch(onStartLoadingNeumaticos());
      const { data } = await tallerMecanicoApi.get(
        `/estados-neumaticos/${neumatico}`
      );
      dispatch(onLoadNeumaticos([{ ...data.data }]));
    } catch (error) {
      console.log("Error al cargar", error);
    }
  };

  const startSavingNeumaticos = async (neumatico) => {
    try {
      await tallerMecanicoApi.put(
        `estados-neumaticos/${neumatico.id}`,
        neumatico
      );
      dispatch(onUpdateNeumaticos({ ...neumatico, user }));
    } catch (error) {
      console.log(error);
      Swal.fire("Error al guardar", "Error extra;o", "error");
    }
  };

  return {
    //* Propiedades
    neumaticos,
    activeNeumatico,
    isLoadingNeumaticos,
    hasTareaSelected: !!neumaticos,

    //* Metodos
    setActiveNeumaticos,
    startLoadingNeumaticos,
    startSavingNeumaticos,
  };
};
