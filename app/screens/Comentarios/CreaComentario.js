import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  ScrollView,
  StyleSheet,
} from "react-native";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import Toast from "react-native-simple-toast";
import { Picker } from "@react-native-picker/picker";

const db = firebase.firestore(firebaseApp);

const CreatePresupuesto = (props) => {
  /* aqui declaramos las variables que van almacenar nuestros datos */
  /* usamos el metodo currentUser para acceder a los datos del usuario */
  const user = firebase.auth().currentUser;
  const [state, setState] = useState({
    Nusuario: user.email,
    comentario: "",
    creado: new Date().toString(),
  });

  const handleChangeText = (name, value) => {
    setState({ ...state, [state]: value });
  };
  const [selectedValue, setSelectedValue] = useState("java");
  const AddComentario = () => {
    console.log(state);
    if (!state.comentario) {
      //Enviamos el mensaje al cuerpo del toast para hacerlo visible
      Toast.show("No puedes dejar campos vacios");
    } 
    else {
      db.collection("comentarios")
        .add({
          //enviamos los datos a almacenar, la colección se crea por si sola
          correo: state.Nusuario,
          comentario: state.comentario,
          creado: state.creado,
          //para probar debes tener iniciada la sesión ya que vinculamos con el usuario
        })
        .then(() => {
          //si todo es correcto
          props.navigation.navigate("ListaComemtarios");
        })
        .catch(() => {
          //si no es posible almacenar
          Toast.show("No es posible registrar el comentario");
        });
    }
  };

  return (
    <ScrollView style={Styles.container}>
      <Text style={Styles.titulo}>Formulario</Text>
      <View>
        <Text style={Styles.comentario}>Coloca tu comentario</Text>
      </View>
      <View style={Styles.inputGroup}>
        <TextInput
          multiline
          placeholder="Comentario:"
          style={Styles.comentario}
          onChangeText={(value) => setState({ ...state, comentario: value })}
        />
      </View>
      <View>
        <Button title="Registrar" onPress={() => AddComentario()} />
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
  titulo: {
    fontSize: 25,
    textAlign: "center",
    marginBottom: 20,
  },
  comentario: {
    fontSize: 20,
    marginTop: 15,
    marginBottom: 15,
  },
});

export default CreatePresupuesto;
