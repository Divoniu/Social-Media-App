// Importam hook-urile utilizate.
import { useState, useEffect } from "react";

// useFetch primeste ca parametru url-ul catre care va face cererea.
export function useFetch(url) {
  // Atentie, initail state-ul este null! Du putem stii daca vom primi un obiect sau un array, asa ca vrem să exprimam faptul ca inca nu am primit raspuns de la server.
  const [data, setData] = useState(null);
  useEffect(() => {
    // Fetch-uim datele si actualizam state-ul.
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      });
    // Avand in vedere ca url este un prop, il punem in array-ul de dependente.
  }, [url]);

  // Returnam datele venite de la server.
  return data;
}
