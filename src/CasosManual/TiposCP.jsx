export const TiposCP = (comprobante) => {
  const Comprobantes = {
    '01': "Factura",
    '03': "Boleta",
    '04': "Liquidacion de Compra",
    '07': "Nota de Credito",
    '08': "Nota de Debito",
    'R1': 'Recibo por Honorarios',
    'R7': 'Nota de Credito de Recibos'
   
  };
  return Comprobantes[comprobante];
}
