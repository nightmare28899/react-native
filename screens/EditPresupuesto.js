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
    navegacion: "",
    encabezado: "",
    body: "",
    footer: "",
    basedatos: "",
    framework: "",
    hosting: "",
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
    gocloud: 40,
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
    const dbRef = db.collection("presupuesto").doc(user.id);
    await dbRef.set({
      nombre: user.nombre,
      correo: user.correo,
      navegacion: user.setSelectedValue,
      encabezado: user.setSelectedValue2,
      body: user.setSelectedValue3,
      footer: user.setSelectedValue4,
      basedatos: user.setSelectedValue5,
      framework: user.setSelectedValue6,
      hosting: user.setSelectedValue7,
      total:
        user.setSelectedValue +
        user.setSelectedValue2 +
        user.setSelectedValue3 +
        user.setSelectedValue4 +
        user.setSelectedValue5 +
        user.setSelectedValue6 +
        user.setSelectedValue7,
      creado: user.creado,
    });
    setUser(initialState);
    props.navigation.navigate("ListPresupuesto");
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
    navegacion: "",
    encabezado: "",
    body: "",
    footer: "",
    basedatos: "",
    framework: "",
    hosting: "",
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
    gocloud: 40,
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
      <Text style={Styles.titulo}>Formulario</Text>
      <View>
        <Text style={Styles.titulos}>{user.nombre}</Text>
      </View>
      <View>
        <Text style={Styles.titulos}>{user.correo}</Text>
      </View>
      <View style={Styles.inputGroup, {marginTop: 25}}>
        <Text style={Styles.titulos}>Elementos de la barra de navegacion</Text>
        <Picker
          selectedValue={user.navegacion}
          style={{ height: 50, width: 300 }}
          onValueChange={(value, itemIndex) =>
            setUser({ ...user, setSelectedValue: value })
          }
        >
          <Picker.Item label="Elije algun elemento" value="" />
          <Picker.Item label="Modo obscuro" value={state.modoObscuro} />
          <Picker.Item label="Barra busqueda" value={state.barraBusqueda} />
          <Picker.Item label="Logo de empresa" value={state.logoEmpresa} />
          <Picker.Item label="Login" value={state.login} />
        </Picker>
      </View>
      <View style={Styles.inputGroup}>
        <Text style={Styles.titulos}>Elementos del encabezado</Text>
        <Picker
          selectedValue={user.encabezado}
          style={{ height: 50, width: 300 }}
          onValueChange={(value, itemIndex) =>
            setUser({ ...user, setSelectedValue2: value })
          }
        >
          <Picker.Item label="Elije algun elemento" value="" />
          <Picker.Item label="Banner" value={state.banner} />
          <Picker.Item label="Slider" value={state.slider} />
          <Picker.Item label="Descripcion" value={state.descripcion} />
          <Picker.Item label="Call action" value={state.callAction} />
        </Picker>
      </View>
      <View style={Styles.inputGroup}>
        <Text style={Styles.titulos}>Elementos del body</Text>
        <Picker
          selectedValue={user.body}
          style={{ height: 50, width: 300 }}
          onValueChange={(value, itemIndex) =>
            setUser({ ...user, setSelectedValue3: value })
          }
        >
          <Picker.Item label="Elije algun elemento" value="" />
          <Picker.Item label="Formulario" value={state.formulario} />
          <Picker.Item label="Carrusel de imagenes" value={state.carrusel} />
          <Picker.Item label="Cards" value={state.cards} />
          <Picker.Item label="ScrollSpy" value={state.scrollSpy} />
        </Picker>
      </View>
      <View style={Styles.inputGroup}>
        <Text style={Styles.titulos}>Elementos del footer</Text>
        <Picker
          selectedValue={user.footer}
          style={{ height: 50, width: 300 }}
          onValueChange={(value, itemIndex) =>
            setUser({ ...user, setSelectedValue4: value })
          }
        >
          <Picker.Item label="Elije algun elemento" value="" />
          <Picker.Item label="Redes Sociales" value={state.redesS} />
          <Picker.Item label="Enlaces" value={state.links} />
          <Picker.Item label="Mapa" value={state.mapa} />
          <Picker.Item
            label="Politicas de privacidad"
            value={state.politicas}
          />
        </Picker>
      </View>
      <View style={Styles.inputGroup}>
        <Text style={Styles.titulos}>Tipo Base de datos</Text>
        <Picker
          selectedValue={user.basedatos}
          style={{ height: 50, width: 300 }}
          onValueChange={(value, itemIndex) =>
            setUser({ ...user, setSelectedValue5: value })
          }
        >
          <Picker.Item label="Elije algun elemento" value="" />
          <Picker.Item label="MongoDB" value={state.mongodb} />
          <Picker.Item label="MySQL" value={state.mysql} />
          <Picker.Item label="FireBase" value={state.firebase} />
          <Picker.Item label="SQLite" value={state.sqlite} />
        </Picker>
      </View>
      <View style={Styles.inputGroup}>
        <Text style={Styles.titulos}>Framework de diseño</Text>
        <Picker
          selectedValue={user.framework}
          style={{ height: 50, width: 300 }}
          onValueChange={(value, itemIndex) =>
            setUser({ ...user, setSelectedValue6: value })
          }
        >
          <Picker.Item label="Elije algun elemento" value="" />
          <Picker.Item label="Laravel" value={state.laravel} />
          <Picker.Item label="React" value={state.react} />
          <Picker.Item label="Symfony" value={state.symfony} />
          <Picker.Item label="Python" value={state.python} />
        </Picker>
      </View>
      <View style={Styles.inputGroup}>
        <Text style={Styles.titulos}>Hosting de la BD</Text>
        <Picker
          selectedValue={user.hosting}
          style={{ height: 50, width: 300 }}
          onValueChange={(value, itemIndex) =>
            setUser({ ...user, setSelectedValue7: value })
          }
        >
          <Picker.Item label="Elije algun elemento" value="" />
          <Picker.Item label="Hostinger" value={state.hostinger} />
          <Picker.Item label="GoDaddy" value={state.godady} />
          <Picker.Item label="Google Cloud" value={state.gocloud} />
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
      <View>
        <Text></Text>
        <Text></Text>
        <Text></Text>
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
  titulo: {
    fontSize: 25,
    textAlign: "center",
    marginBottom: 20,
  },
  titulos: {
    fontSize: 20,
    marginBottom: 6,
  },
});

export default EditPresupuesto;
