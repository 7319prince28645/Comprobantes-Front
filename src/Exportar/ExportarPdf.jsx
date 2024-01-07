import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { TiposCP } from "../CasosManual/TiposCP";
// Estilos para el documento PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 20,
  },
  tittle: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    margin: 2,
    padding: 4,
    flexGrow: 1,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#bbb",
    borderBottomStyle: "solid",
    alignItems: "center",
    height: 24,
  },
  tableColumn: {
    flex: 1,
    textAlign: "center",
    fontSize: 9,
  },
});

const estado = (value) => {
  const validarEstado = {
    0: "No existe",
    1: "Aceptado",
    2: "Anulado",
    3: "Autorizado",
    4: "No autorizado",
  };
  return validarEstado[value];
};

const montoTotal = (data) => {
    const total = data.reduce((sum, item) => sum + parseFloat(item.monto), 0);
    return total.toFixed(2);
    };

// Componente del documento
const MyDocument = ({ data, filterGa, datosRuc }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View>
        <Text style={styles.tittle}>Comprobantes de Pago</Text>
        <Text style={styles.tittle}>{datosRuc}</Text>
      </View>
      <View style={styles.tableRow}>
        <Text style={styles.tableColumn}>N°</Text>
        <Text style={styles.tableColumn}>Comprobante</Text>
        <Text style={styles.tableColumn}>Serie</Text>
        <Text style={styles.tableColumn}>Numero Serie</Text>
        <Text style={styles.tableColumn}>Fecha de Emision</Text>
        <Text style={styles.tableColumn}>Monto</Text>
        <Text style={styles.tableColumn}>Estado</Text>
      </View>
      {(filterGa ? filterGa : data).map((item, index) => (
        <View style={styles.tableRow} key={index}>
          <Text style={styles.tableColumn}>{index + 1}</Text>
          <Text style={styles.tableColumn}>{TiposCP(item.codComp)}</Text>
          <Text style={styles.tableColumn}>{item.numeroSerie}</Text>
          <Text style={styles.tableColumn}>{item.numero}</Text>
          <Text style={styles.tableColumn}>{item.fechaEmision}</Text>
          <Text style={styles.tableColumn}>{item.monto}</Text>
          <Text style={styles.tableColumn}>{estado(item.data.estadoCp)}</Text>
        </View>
      ))}
      <View style={styles.tableRow}>
        <Text style={styles.tableColumn}>Total</Text>
        <Text style={styles.tableColumn}>{montoTotal(filterGa ? filterGa : data)}</Text>
      </View>
    </Page>
  </Document>
);

import { PDFDownloadLink } from "@react-pdf/renderer";

export const ExportarPdf = ({ data, filterGa, getRuc, datosRuc }) => (
  <div className="px-2 py-2 bg-blue-500">
    <PDFDownloadLink
      document={<MyDocument data={data} filterGa={filterGa} datosRuc={datosRuc}/>}
      fileName={`${datosRuc}.pdf`}
    >
      {({ blob, url, loading, error }) =>
        loading ? "Cargando documento..." : "Descargar PDF"
      }
    </PDFDownloadLink>
  </div>
);
