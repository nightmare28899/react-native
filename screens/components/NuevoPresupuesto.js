import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TextInput, Pressable } from "react-native";
import globalStyles from "../styles";
import { firebaseApp } from "../../app/utils/firebase";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import Toast from "react-native-simple-toast";

const db = firebase.firestore(firebaseApp);

const NuevoPresupuesto = ({
  presupuesto,
  setPresupuesto,
  handleNuevoPresupuesto,
}) => {
  const [usuario, setUsuario] = useState(null);
  const user = firebase.auth().currentUser;
  /* desclaramos las variables que vamos a utilizar */
  const [state, setState] = useState({
    nombre: user.displayName,
    Nusuario: user.email,
    creado: new Date().toString(),
  });

  const handleChangeText = (name, value) => {
    setState({ ...state, [state]: value });
  };

  const AddPresupuesto = () => {
    if (presupuesto <= 0) {
      //Enviamos el mensaje al cuerpo del toast para hacerlo visible
      Toast.show("No puedes dejar campos vacios");
    } else {
      console.log(state);
      console.log("Creado con exito");
      db.collection("presupuesto")
        .add({
          //enviamos los datos a almacenar, la colección se crea por si sola
          nombre: state.nombre,
          correo: state.Nusuario,
          presupuesto: presupuesto,
          nombreP: "",
          cantidad: "",
          categoria: "",
          creado: state.creado,
          creadoPor: firebase.auth().currentUser.uid,
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

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      //si existe una sesión activa asignamos los datos de sesión al useState usuario
      setUsuario(userInfo);
    });
  }, []);

  return (
    <View style={styles.contenedor}>
      <Text style={styles.label}>Definir Presupuesto</Text>

      <TextInput
        keyboardType="numeric"
        placeholder="Agrega tu presupuesto Ej. 300"
        style={styles.input}
        value={presupuesto.toString()}
        onChangeText={setPresupuesto}
      />

      <Pressable
        style={styles.boton}
        onPress={() => handleNuevoPresupuesto(presupuesto, AddPresupuesto())}
      >
        <Text style={styles.botonTexto}>Agregar Presupuesto</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyles.contenedor,
  },
  label: {
    textAlign: "center",
    fontSize: 24,
    color: "#3B82F6",
  },
  input: {
    backgroundColor: "#F5F5F5",
    padding: 10,
    borderRadius: 10,
    textAlign: "center",
    marginTop: 30,
  },
  boton: {
    marginTop: 30,
    backgroundColor: "#1048A4",
    padding: 10,
    borderRadius: 10,
  },
  botonTexto: {
    color: "#FFF",
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default NuevoPresupuesto;
