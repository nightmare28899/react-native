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

const db = firebase.firestore(firebaseApp);

const CreatePresupuesto = (props) => {
  const user = firebase.auth().currentUser;

  const [state, setState] = useState({
    nombre: user.displayName,
    Nusuario: user.email,
    mensaje: "",
    selectedValue: "",
    setSelectedValue: "",
    selectedValue2: "",
    setSelectedValue2: "",
    barraNavegacion: 200,
    barraBusqueda: 300,
    banner: 500,
    slider: 300,
    total: 0,
    creado: new Date().toString(),
  });

  const handleChangeText = (name, value) => {
    setState({ ...state, [state]: value });
  };

  const AddPresupuesto = () => {
    console.log(state);
    if (!state.mensaje || !state.setSelectedValue || !state.setSelectedValue2) {
      //Enviamos el mensaje al cuerpo del toast para hacerlo visible
      Toast.show("No puedes dejar campos vacios");
    } //Si todo es correcto probaremos la carga de imágenes a Storage
    else {
      //una vez cargadas las imágenes en el storage se procede a almacenar la sucursal
      db.collection("presupuesto")
        .add({
          //enviamos los datos a almacenar, la colección se crea por si sola
          nombre: state.nombre,
          correo: state.Nusuario,
          mensaje: state.mensaje,
          navbar: state.setSelectedValue,
          encabezado: state.setSelectedValue2,
          total: state.setSelectedValue+state.setSelectedValue2,
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
      <Text>Formulario</Text>
      <View style={Styles.inputGroup}>
        <TextInput
          placeholder="Mensaje"
          onChangeText={(value) => setState({ ...state, mensaje: value })}
        />
      </View>
      <View style={Styles.inputGroup}>
        <Text>Elementos de la barra de navegacion</Text>
        <Picker
          selectedValue={state.selectedValue}
          style={{ height: 50, width: 200 }}
          onValueChange={(value, itemIndex) =>
            setState({ ...state, setSelectedValue: value })
          }
        >
          <Picker.Item label="Escoge..." value="" />
          <Picker.Item label="Barra navegacion" value={state.barraNavegacion} />
          <Picker.Item label="Barra busqueda" value={state.barraBusqueda} />
          <Picker.Item label="Logo" value="logo" />
          <Picker.Item label="Sesion" value="sesion" />
        </Picker>
      </View>
      <View style={Styles.inputGroup}>
        <Text>Elementos de la barra del encabezado</Text>
        <Picker
          selectedValue2={state.selectedValue2}
          style={{ height: 50, width: 200 }}
          onValueChange={(value, itemIndex) =>
            setState({ ...state, setSelectedValue2: value })
          }
        >
          <Picker.Item label="Escoge..." value="" />
          <Picker.Item label="Banner" value={state.banner} />
          <Picker.Item label="Slider" value={state.slider} />
          <Picker.Item label="Logo" value="logo" />
          <Picker.Item label="Sesion" value="sesion" />
        </Picker>
      </View>
      <View>
        <Button title="Registrar" onPress={() => AddPresupuesto()} />
      </View>
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
});

export default CreatePresupuesto;
