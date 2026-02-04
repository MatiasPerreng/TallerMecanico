import { useEffect, useMemo, useState } from "react";
import { useVehiculoStore } from "./useVehiculoStore";

export const useSelectorVehiculos = (showModal) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { vehiculos, startLoadingVehiculos } = useVehiculoStore();

  useEffect(() => {
    if (showModal && vehiculos.length === 0) {
      startLoadingVehiculos();
    }
  }, [showModal]);

  const opcionesAgrupadas = useMemo(() => {
    const grupos = {};

    vehiculos.forEach((vehiculo) => {
      const categoriaNombre = "";

      if (!grupos[categoriaNombre]) {
        grupos[categoriaNombre] = {
          label: categoriaNombre,
          options: [],
        };
      }

      if (
        vehiculo.matricula.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehiculo.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehiculo.marca.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        grupos[categoriaNombre].options.push({
          value: vehiculo.id,
          label: `${vehiculo.modelo} ${vehiculo.marca} - ${
            vehiculo.matricula
          } | ${vehiculo.disponible ? "Disponible" : "No disponible"}`,
        });
      }
    });

    return Object.values(grupos);
  }, [vehiculos, searchTerm]);

  // Recibimos setFormData como argumento
  const handleVehiculoChange = (selectedOption, setFormData) => {
    setFormData((prev) => ({
      ...prev,
      vehiculo_id: selectedOption ? selectedOption.value : "",
    }));
  };

  return {
    opcionesAgrupadas,
    handleVehiculoChange,
    searchTerm,
    setSearchTerm,
  };
};
