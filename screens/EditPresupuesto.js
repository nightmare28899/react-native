import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { firebaseApp } from "../app/utils/firebase";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import { Picker } from "@react-native-picker/picker";
import Toast from "react-native-simple-toast";
const db = firebase.firestore(firebaseApp);

const EditPresupuesto = (props) => {
  const initialState = {
    id: "",
    nombre: "",
    correo: "",
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
  };

  const [user, setUser] = useState(initialState);

  const [loading, setLoading] = useState(true);

  const getUserById = async (id) => {
    const dbRef = db.collection("presupuesto").doc(id);
    const doc = await dbRef.get();
    const user = doc.data();
    setUser({
      ...user,
      id: doc.id,
    });
    setLoading(false);
  };

  useEffect(() => {
    getUserById(props.route.params.userId);
  }, []);

  const handleChangeText = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  const updateUser = async () => {
    if (!user.mensaje) {
      //Enviamos el mensaje al cuerpo del toast para hacerlo visible
      Toast.show("No puedes dejar campos vacios");
    } //Si todo es correcto probaremos la carga de imágenes a Storage
    else {
      const dbRef = db.collection("presupuesto").doc(user.id);
      await dbRef.set({
        nombre: user.nombre,
        correo: user.correo,
        mensaje: user.mensaje,
        navbar: user.setSelectedValue,
        creado: user.creado,
      });
      setUser(initialState);
      props.navigation.navigate("ListPresupuesto");
    }
  };

  const deleteUser = async () => {
    const dbRef = db.collection("presupuesto").doc(props.route.params.userId);
    await dbRef.delete();
    props.navigation.navigate("ListPresupuesto");
  };

  const openConfirmationAlert = () => {
    Alert.alert("Eliminar presupuesto", "Estas seguro?", [
      { text: "Yes", onPress: () => deleteUser() },
      { text: "No", onPress: () => console.log(false) },
    ]);
  };

  const [state, setState] = useState({
    nombre: "",
    correo: "",
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

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#9e9e9e" />
      </View>
    );
  }

  return (
    <ScrollView style={Styles.container}>
      <Text>Formulario</Text>
      <View style={Styles.inputGroup}>
        <Text>{user.nombre}</Text>
      </View>
      <View style={Styles.inputGroup}>
        <Text>{user.correo}</Text>
      </View>
      <View style={Styles.inputGroup}>
        <TextInput
          placeholder="Mensaje"
          value={user.mensaje}
          onChangeText={(value) => handleChangeText("mensaje", value)}
        />
      </View>
      <View style={Styles.inputGroup}>
        <Text>Elementos de la barra de navegacion</Text>
        <Picker
          selectedValue={user.selectedValue}
          style={{ height: 50, width: 200 }}
          onValueChange={(value, itemIndex) =>
            setUser({ ...user, setSelectedValue: value })
          }
        >
          <Picker.Item label="Escoge..." value="" />
          <Picker.Item label="Barra navegacion" value={user.barraNavegacion} />
          <Picker.Item label="Barra busqueda" value={user.barraBusqueda} />
          <Picker.Item label="Logo" value="logo" />
          <Picker.Item label="Sesion" value="sesion" />
        </Picker>
      </View>
      <View style={Styles.inputGroup}>
        <Text>Elementos de la barra del encabezado</Text>
        <Picker
          selectedValue2={user.selectedValue2}
          style={{ height: 50, width: 200 }}
          onValueChange={(value, itemIndex) =>
            setUser({ ...user, setSelectedValue2: value })
          }
        >
          <Picker.Item label="Escoge..." value="" />
          <Picker.Item label="Banner" value={user.banner} />
          <Picker.Item label="Slider" value={user.slider} />
          <Picker.Item label="Logo" value="logo" />
          <Picker.Item label="Sesion" value="sesion" />
        </Picker>
      </View>
      <View style={Styles.espacio}>
        <Button color="#2A88EE" title="Editar" onPress={() => updateUser()} />
      </View>
      <View>
        <Button
          color="#FF0422"
          title="Eliminar"
          onPress={() => openConfirmationAlert()}
        />
      </View>
    </ScrollView>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  espacio: {
    marginBottom: 10,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
});

export default EditPresupuesto;
