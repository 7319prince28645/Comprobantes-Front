export const Colores = (value) => {
  const validarColores = {
    0: "bg-red-500 px-4 py-2",
    1: "bg-green-500 px-4 py-2",
    2: "bg-yellow-500 px-4 py-2",
    3: "bg-blue-500 px-4 py-2",
    4: "bg-gray-500 px-4 py-2",
  };
  return validarColores[value];
};
