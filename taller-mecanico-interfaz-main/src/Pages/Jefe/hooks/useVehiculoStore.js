import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewVehiculo,
  onDeleteVehiculo,
  onLoadVehiculos,
  onSetActiveVehiculo,
  onStartLoading,
  onUpdateVehiculo,
} from "../../../store/jefe/vehiculos/vehiculoSlice";
import tallerMecanicoApi from "../../../api/tallerMecanicoApi";
import Swal from "sweetalert2";

export const useVehiculoStore = () => {
  const dispatch = useDispatch();
  const { vehiculos, activeVehiculo, isLoadingVehiculos } = useSelector(
    (state) => state.vehiculo
  );
  const { user } = useSelector((state) => state.auth);

  const setActiveVehiculo = (vehiculo) => {
    dispatch(onSetActiveVehiculo(vehiculo));
  };

  const startLoadingVehiculos = async () => {
    try {
      dispatch(onStartLoading());
      const { data } = await tallerMecanicoApi.get(`/vehiculos`);
      dispatch(onLoadVehiculos([...data.data]));
    } catch (error) {
      console.log("Error al cargar", error);
    }
  };

  const startSavingVehiculo = async (vehiculo) => {
    try {
      //* PUT
      if (vehiculo.id) {
        await tallerMecanicoApi.put(`/vehiculos/${vehiculo.id}`, vehiculo);
        dispatch(onUpdateVehiculo({ ...vehiculo, user }));
        return;
      } else {
        //* POST
        const { data } = await tallerMecanicoApi.post("/vehiculos", vehiculo);
        console.log({ data });
        dispatch(onAddNewVehiculo({ ...data }));
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error al guardar", error.response.data?.message, "error");
    }
  };

  const startDeletingVehiculo = async (vehiculo) => {
    try {
      await tallerMecanicoApi.delete(`/vehiculos/${vehiculo.id}`);
      dispatch(onDeleteVehiculo());
    } catch (error) {
      console.log(error);
      Swal.fire("Error al borrar", error.response.data?.message, "error");
    }
  };

  return {
    //* Propiedades
    activeVehiculo,
    vehiculos,
    isLoadingVehiculos,
    hasVehiculoSelected: !!activeVehiculo,

    //* Metodos
    setActiveVehiculo,
    startLoadingVehiculos,
    startSavingVehiculo,
    startDeletingVehiculo,
  };
};
