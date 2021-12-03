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
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import { Picker } from "@react-native-picker/picker";
const db = firebase.firestore(firebaseApp);

const EditPresupuesto = (props) => {
  const initialState = {
    id: "",
    correo: "",
    comentario: "",
    creado: new Date().toString(),
  };

  const [user, setUser] = useState(initialState);

  const [loading, setLoading] = useState(true);

  const getUserById = async (id) => {
    const dbRef = db.collection("comentarios").doc(id);
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
    const dbRef = db.collection("comentarios").doc(user.id);
    await dbRef.set({
      correo: user.correo,
      comentario: user.comentario,
      creado: user.creado,
    });
    setUser(initialState);
    props.navigation.navigate("ListaComemtarios");
  };

  const deleteUser = async () => {
    const dbRef = db.collection("comentarios").doc(props.route.params.userId);
    await dbRef.delete();
    props.navigation.navigate("ListaComemtarios");
  };

  const openConfirmationAlert = () => {
    Alert.alert("Eliminar comentario", "Estas seguro?", [
      { text: "Yes", onPress: () => deleteUser() },
      { text: "No", onPress: () => console.log(false) },
    ]);
  };

  const [state, setState] = useState({
    correo: "",
    comentario: "",
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
      <Text>Datos</Text>
      <View style={Styles.inputGroup}>
        <Text>{user.correo}</Text>
      </View>
      <View style={Styles.inputGroup}>
      <TextInput
          placeholder="Comentario"
          value={user.comentario}
          onChangeText={(value) => handleChangeText("comentario", value)}
        />
      </View>
      <View style={Styles.espacio}>
        <Button
          color="#2A88EE"
          title="Editar"
          onPress={() => updateUser()}
        />
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
