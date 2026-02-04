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
    const grupos = { "": { label: "", options: [] } };

    vehiculos.forEach((vehiculo) => {
      const matricula = vehiculo.matricula || "";
      const modelo = vehiculo.modelo || "";
      const marca = vehiculo.marca || "";

      if (
        matricula.toLowerCase().includes(searchTerm.toLowerCase()) ||
        modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        marca.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        grupos[""].options.push({
          value: vehiculo.id,
          label: `${modelo} ${marca} - ${matricula} | ${
            vehiculo.disponible ? "Disponible" : "No disponible"
          }`,
        });
      }
    });

    return Object.values(grupos);
  }, [vehiculos, searchTerm]);

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