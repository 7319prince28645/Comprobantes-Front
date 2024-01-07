function Nav() {
  return (
    <thead className="border">
      <tr className="">
        <th
          scope="col"
          className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          N°
        </th>
        <th
          scope="col"
          className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Codigo Comprobante
        </th>
        <th
          scope="col"
          className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          N° Serie
        </th>
        <th
          scope="col"
          className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Numero
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Fecha de Emision
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Monto
        </th>
        <th
          scope="col"
          className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          Estado
        </th>
      </tr>
    </thead>
  );
}

export default Nav;
