export const Estado = (value) => {
  const validarEstado = {
    0: "No Existe",
    1: "Aceptado",
    2: "Anulado",
    3: "Autorizado",
    4: "No autorizado",
  };
  return validarEstado[value];
};
