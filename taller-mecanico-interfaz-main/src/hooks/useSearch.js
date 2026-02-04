import { useState, useMemo } from "react";

const getNestedValue = (obj, path) => {
  return path.split(".").reduce((acc, part) => acc?.[part], obj);
};

export const useSearch = (data = [], searchKeys = ["nombre"]) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;

    const lowercasedTerm = searchTerm.toLowerCase().trim();

    return data.filter((item) =>
      searchKeys.some((keyPath) => {
        const value = getNestedValue(item, keyPath) || "";
        return String(value).toLowerCase().includes(lowercasedTerm);
      })
    );
  }, [data, searchTerm, searchKeys]);

  return {
    searchTerm,
    setSearchTerm,
    filteredData,
    handleSearchChange: (e) => setSearchTerm(e.target.value),
  };
};
