import { useEffect, useMemo, useState } from "react";
import { useCategoriaStore } from "./useCategoriaStore";

export const useSelectorCategorias = (showModal) => {
  const [searchTerm, setSearchTerm] = useState("");

  const { categorias, startLoadingCategoria } = useCategoriaStore();

  useEffect(() => {
    startLoadingCategoria();
  }, [showModal]);

  const opcionesAgrupadas = useMemo(() => {
    const grupos = {};

    categorias.forEach((cliente) => {
      const categoriaNombre = "";

      if (!grupos[categoriaNombre]) {
        grupos[categoriaNombre] = {
          label: categoriaNombre,
          options: [],
        };
      }

      if (cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase())) {
        grupos[categoriaNombre].options.push({
          value: cliente.id,
          label: `${cliente.nombre}`,
        });
      }
    });

    return Object.values(grupos);
  }, [categorias, searchTerm]);

  return {
    opcionesAgrupadas,
    searchTerm,
    setSearchTerm,
  };
};
