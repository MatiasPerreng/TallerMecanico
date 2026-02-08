import { useDispatch, useSelector } from "react-redux";
import {
  onLoadMecanicos,
  onSetActiveMecanico,
} from "../../../store/jefe/usuarios/mecanicoSlice";
import tallerMecanicoApi from "../../../api/tallerMecanicoApi";

export const useMecanicoStore = () => {
  const dispatch = useDispatch();
  const { mecanicos, activeMecanico } = useSelector((state) => state.mecanico);

  const setActiveMecanico = (mecanico) => {
    dispatch(onSetActiveMecanico(mecanico));
  };

  const startLoadingMecanico = async () => {
    try {
      const { data } = await tallerMecanicoApi.get(`/users/mecanicos`);

      const mecanicosData = Array.isArray(data) ? data : (data.data || []);
      
      dispatch(onLoadMecanicos(mecanicosData));
      
    } catch (error) {
      console.error("Error al cargar mecánicos", error);
      dispatch(onLoadMecanicos([]));
    }
  };

  return {
    activeMecanico,
    mecanicos,
    hasMecanicoClient: !!activeMecanico,
    setActiveMecanico,
    startLoadingMecanico,
  };
};