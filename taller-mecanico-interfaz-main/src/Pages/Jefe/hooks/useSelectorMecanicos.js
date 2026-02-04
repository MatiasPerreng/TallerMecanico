import { useEffect, useMemo, useState } from "react";
import { useMecanicoStore } from "./useMecanicoStore";

export const useSelectorMecanicos = (showModal) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { mecanicos, startLoadingMecanico } = useMecanicoStore();

  useEffect(() => {
    if (showModal && mecanicos.length === 0) {
      startLoadingMecanico();
    }
  }, [showModal]);

  const opcionesAgrupadas = useMemo(() => {
    const grupos = {};

    mecanicos.forEach((mecanico) => {
      const categoriaNombre = "";

      if (!grupos[categoriaNombre]) {
        grupos[categoriaNombre] = {
          label: categoriaNombre,
          options: [],
        };
      }

      if (mecanico.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        grupos[categoriaNombre].options.push({
          value: mecanico.id,
          label: `${mecanico.name} | ${
            mecanico.disponible ? "Disponible" : "No disponible"
          }`,
        });
      }
    });

    return Object.values(grupos);
  }, [mecanicos, searchTerm]);

  // Recibimos setFormData como argumento
  const handleMecanicoChange = (selectedOption, setFormData) => {
    setFormData((prev) => ({
      ...prev,
      mecanico_id: selectedOption ? selectedOption.value : "",
    }));
  };

  return {
    opcionesAgrupadas,
    handleMecanicoChange,
    searchTerm,
    setSearchTerm,
  };
};
