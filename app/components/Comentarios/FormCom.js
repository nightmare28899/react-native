import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  Dimensions,
  Text,
  TextInput,
} from "react-native";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";
import { map, size, filter } from "lodash";
import uuid from "random-uuid-v4";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

const db = firebase.firestore(firebaseApp);

//Extraemos el ancho de la ventana para ajustar la imagen al tamaño del dispositivo
const WidthScreen = Dimensions.get("window").width;
console.disableYellowBox = true;

export default function FormCom(toast) {
  const navegacion = useNavigation();
  //Generamos una variable de estado para cada campo
  const [comentario, setComentario] = useState("");
  const { toastRef } = toast;
  const user = firebase.auth().currentUser;
  const [Nusuario] = useState(user.email);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedValue2, setSelectedValue2] = useState("");
  /*Función que nos mostrará el valor de las variables de estado
 que contendrán la información de los campos del formulario*/
  const agregar = () => {
    console.log(comentario);
    //Verificamos que no se envíen datos vacíos
    if (!comentario) {
      //Enviamos el mensaje al cuerpo del toast para hacerlo visible
      toastRef.current.show("No puedes dejar campos vacios");
    } //Si todo es correcto probaremos la carga de imágenes a Storage
    else {
      //una vez cargadas las imágenes en el storage se procede a almacenar la sucursal
      db.collection("comentarios")
        .add({
          //enviamos los datos a almacenar, la colección se crea por si sola
          usuario: Nusuario,
          comentario: comentario,
          selectedValue: selectedValue,
          selectedValue2: selectedValue2,
          //referenciamos las imagenes de la sucursal retornadas del storage
          creado: new Date(),
          //para probar debes tener iniciada la sesión ya que vinculamos con el usuario
          creadoPor: firebase.auth().currentUser.uid,
        })
        .then(() => {
          //si todo es correcto
          navegacion.navigate("comentario");
        })
        .catch(() => {
          //si no es posible almacenar
          toastRef.current.show("No es posible registrar el comentario");
        });
    }
  };

  return (
    <ScrollView style={styles.scroll}>
      {/*Implementamos la función que nos mostrará la imagen de encabezado
 la cual será la primera imagen de la sucursal a registrar, para ello
 enviamos como parámetro la imagen de la posición 0 del arreglo*/}

      {/*El formulario de sucursales contendra una estructura amplia
 para separarlo de la estructura general lo separaremos de la estructura
 a través de una función Formulario*/}
      <View style={styles.container}>
        <Formulario
          /*Enviamos las funciones set que nos permitiran asignar el
 valor del formulario a las variables de estado*/
          setComentario={setComentario}
        />

        <Button
          title="Registrar"
          buttonStyle={styles.btn}
          /*Al dar clic activamos el método agregar */
          onPress={agregar}
        />
      </View>
    </ScrollView>
  );
}

/*Función que contiene la estructura del formulario
recibe en el apartado de propiedades las funciones set de las variables de estado*/
function Formulario(propiedades) {
  const { setComentario } = propiedades;
  const user = firebase.auth().currentUser;
  return (
    <View style={styles.container}>
      <Text>Coloca tu comentario:</Text>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Comentario"
          //Definimos multiples lineas para convertir en un text area
          multiline={true}
          inputContainerStyle={styles.textArea}
          //Modificamos el valor de la variable de estado acorde a lo que el usuario escribe
          onChange={(e) => setComentario(e.nativeEvent.text)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    height: "100%",
  },
  form: {
    width: "100%",
  },
  vista: {
    marginTop: 35,
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    width: "100%",
    padding: 0,
    margin: 0,
  },

  btn: {
    backgroundColor: "#0A6ED3",
    marginHorizontal: 10,
  },
  vistaImagenes: {
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
  },
  icono: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    height: 70,
    width: 70,
    backgroundColor: "#e3e3e3",
  },
  avatar: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  user: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
  },
  nombre: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    padding: 15,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
});
