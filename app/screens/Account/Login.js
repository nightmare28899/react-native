import React, { useRef } from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import FormLogin from "../../components/Account/FormLogin";
import Toast from "react-native-easy-toast";

export default function Login() {
  const toastRef = useRef();
  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.centrado}>
          <Image
            source={require("../../../assets/img/icon.png")}
            resizeMethod="auto"
            style={styles.usuario}
          />
        </View>
        <View style={styles.formulario}>
          <FormLogin toastRef={toastRef} />
          <CrearCuenta />
        </View>
        <Divider style={styles.divider} />
        <Toast ref={toastRef} position="center" opacity={0.9} />
      </View>
    </ScrollView>
  );
}

function CrearCuenta() {
  const navegacion = useNavigation();
  return (
    <Text style={styles.textRegistrar}>
      ¿Aún no tienes una cuenta?{" "}
      <Text
        style={styles.link}
        onPress={() => navegacion.navigate("registrar")}
      >
        Regístrate
      </Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  usuario: {
    width: "45%",
    height: 150,
    marginTop: 20,
  },
  contenedor: {
    marginRight: 40,
    marginLeft: 40,
  },
  textRegistrar: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  link: {
    color: "#0A6ED3",
    fontWeight: "bold",
  },
  divider: {
    backgroundColor: "#0A6ED3",
    margin: 40,
  },
  formulario: {
    marginTop: 0,
    marginLeft: 40,
    marginRight: 40,
  },
  form: {
    margin: 15,
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 5,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  login: {
    textAlign: "center",
    fontSize: 30,
    marginTop: 34,
  },
  centrado: {
    justifyContent: "center",
    alignItems: "center",
  },
  sombra:{
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
});
