import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const Header = () => {
  return (
    <SafeAreaView>
      <Text style={styles.texto}>Planificador de Presupuesto</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  texto: {
    textAlign: "center",
    fontSize: 30,
    color: "#FFF",
    textTransform: "uppercase",
    fontWeight: "bold",
    paddingTop: 20,
  },
});

export default Header;
