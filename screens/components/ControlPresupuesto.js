import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Pressable, Alert, } from "react-native";
import globalStyles from "../styles";
import { formatearCantidad } from "../helpers";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { firebaseApp } from "../../app/utils/firebase";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

const ControlPresupuesto = ({ presupuesto, gastos, resetearApp, props }) => {
  const [disponible, setDisponible] = useState(0);
  const [gastado, setGastado] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => Number(gasto.cantidad) + total,
      0
    );

    const totalDisponible = presupuesto - totalGastado;

    const nuevoPorcentaje =
      ((presupuesto - totalDisponible) / presupuesto) * 100;

    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje);
    }, 1000);
    setGastado(totalGastado);
    setDisponible(totalDisponible);
  }, [gastos]);

  return (
    <View style={styles.contenedor}>
      <View style={styles.centrarGrafica}>
        {/* <AnimatedCircularProgress
          value={porcentaje}
          duration={1000}
          radius={150}
          valueSuffix={"%"}
          title="Gastado"
          inActiveStrokeColor="#F5F5F5"
          inActiveStrokeWidth={20}
          activeStrokeColor="#3b82f6"
          activeStrokeWidth={20}
          titleStyle={{ fontWeight: "bold", fontSize: 20 }}
          titleColor="#64748B"
        /> */}
        <AnimatedCircularProgress
          valueSuffix={"%"}
          duration={1000}
          size={220}
          width={15}
          fill={porcentaje}
          tintColor="#00e0ff"
          backgroundColor="#3d5875"
          rotation={360}
        >
          {(fill) => (
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
                color: "#64748B",
                textAlign: "center",
              }}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: 60, color: "#00e0ff" }}
              >
                {Math.trunc(porcentaje)}%
              </Text>{" "}
              {"\n"} Gastado
            </Text>
          )}
        </AnimatedCircularProgress>
      </View>

      <View style={styles.contenedorTexto}>
        <Pressable onLongPress={resetearApp} style={styles.boton}>
          <Text style={styles.textoBoton}>Reiniciar App</Text>
        </Pressable>

        <Text style={styles.valor}>
          <Text style={styles.label}>Presupuesto: {""} </Text>
          {formatearCantidad(presupuesto)}
        </Text>

        <Text style={styles.valor}>
          <Text style={styles.label}>Disponible: {""}</Text>
          {formatearCantidad(Math.trunc(disponible))}
        </Text>

        <Text style={styles.valor}>
          <Text style={styles.label}>Gastado: {""}</Text>
          {formatearCantidad(gastado)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyles.contenedor,
  },
  centrarGrafica: {
    alignItems: "center",
  },
  boton: {
    backgroundColor: "#DB2777",
    padding: 10,
    marginBottom: 40,
    borderRadius: 5,
  },
  textoBoton: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  contenedorTexto: {
    marginTop: 50,
  },
  valor: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
  },
  label: {
    fontWeight: "700",
    color: "#3B82F6",
  },
});

export default ControlPresupuesto;
