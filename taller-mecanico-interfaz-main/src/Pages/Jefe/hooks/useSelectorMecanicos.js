import { useEffect, useMemo, useState } from "react";
import { useMecanicoStore } from "./useMecanicoStore";

export const useSelectorMecanicos = (showModal) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { mecanicos, startLoadingMecanico } = useMecanicoStore();

  useEffect(() => {
    if (showModal && mecanicos.length === 0) {
      startLoadingMecanico();
    }
  }, [showModal, mecanicos.length, startLoadingMecanico]);

  const opcionesAgrupadas = useMemo(() => {
    if (!mecanicos || mecanicos.length === 0) return [];

    const opciones = mecanicos
      .filter((m) =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map((m) => ({
        value: m.id,
        label: `${m.name} | ${
          m.disponible ? "Disponible" : "No disponible"
        }`,
      }));

    return [
      {
        label: "Mecánicos",
        options: opciones,
      },
    ];
  }, [mecanicos, searchTerm]);

  return {
    opcionesAgrupadas,
    searchTerm,
    setSearchTerm,
  };
};
