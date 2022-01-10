import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import { firebaseApp } from "../app/utils/firebase";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import { Picker } from "@react-native-picker/picker";
import Toast from "react-native-simple-toast";
import { State } from "react-native-gesture-handler";

const db = firebase.firestore(firebaseApp);

const CreatePresupuesto = (props) => {
  const user = firebase.auth().currentUser;
  /* desclaramos las variables que vamos a utilizar */
  const [state, setState] = useState({
    nombre: user.displayName,
    Nusuario: user.email,
    selectedValue: "",
    setSelectedValue: "",
    selectedValue2: "",
    setSelectedValue2: "",
    selectedValue3: "",
    setSelectedValue3: "",
    selectedValue4: "",
    setSelectedValue4: "",
    selectedValue5: "",
    setSelectedValue5: "",
    selectedValue6: "",
    setSelectedValue6: "",
    selectedValue7: "",
    setSelectedValue7: "",
    modoObscuro: 600,
    barraBusqueda: 400,
    logoEmpresa: 300,
    login: 450,
    banner: 700,
    slider: 400,
    descripcion: 200,
    callAction: 340,
    formulario: 600,
    carrusel: 250,
    cards: 150,
    scrollSpy: 80,
    redesS: 130,
    links: 50,
    mapa: 120,
    politicas: 140,
    mongodb: 400,
    mysql: 350,
    firebase: 400,
    sqlite: 350,
    laravel: 500,
    react: 650,
    symfony: 420,
    python: 700,
    hostinger: 20,
    godady: 30,
    google: 40,
    total: 0,
    creado: new Date().toString(),
  });

  const handleChangeText = (name, value) => {
    setState({ ...state, [state]: value });
  };

  const AddPresupuesto = () => {
    if (!state.setSelectedValue || !state.setSelectedValue2) {
      //Enviamos el mensaje al cuerpo del toast para hacerlo visible
      Toast.show("No puedes dejar campos vacios");
    }
    else {
      console.log(state);
      console.log("Creado con exito");
      db.collection("presupuesto")
        .add({
          //enviamos los datos a almacenar, la colección se crea por si sola
          nombre: state.nombre,
          correo: state.Nusuario,
          navegacion: state.setSelectedValue,
          encabezado: state.setSelectedValue2,
          body: state.setSelectedValue3,
          footer: state.setSelectedValue4,
          basedatos: state.setSelectedValue5,
          framework: state.setSelectedValue6,
          hosting: state.setSelectedValue7,
          total: state.setSelectedValue + state.setSelectedValue2 + state.setSelectedValue3 + state.setSelectedValue4 + state.setSelectedValue5 + state.setSelectedValue6 + state.setSelectedValue7,
          creado: state.creado,
          //para probar debes tener iniciada la sesión ya que vinculamos con el usuario
        })
        .then(() => {
          //si todo es correcto
          props.navigation.navigate("ListPresupuesto");
        })
        .catch(() => {
          //si no es posible almacenar
          Toast.show("No es posible registrar el comentario");
        });
    }
  };

  return (
    <ScrollView style={Styles.container}>
      <Text>holi</Text>
    </ScrollView>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  titulo: {
    fontSize: 25,
    textAlign: "center",
    marginBottom: 20,
  },
  titulos: {
    fontSize: 20,
    marginBottom: 6,
    marginTop: 25,
  },
  registrar: {
    marginBottom: 75,
  },
  lista: {
    marginTop: 10,
    fontSize: 20,
    marginBottom: 20,
  },
  elemnto: {
    fontSize: 16,
  }
});

export default CreatePresupuesto;
