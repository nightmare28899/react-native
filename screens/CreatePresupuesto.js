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
      <Text style={Styles.titulo}>Formulario</Text>
      {/* solo es la lista de datos que tenemos en el picker con sus costos */}
      <Text style={Styles.lista}>Lista de costos en MX.</Text>

      <Text style={Styles.elemnto}>Elementos de la barra de navegacion:</Text>
      <Text style={Styles.elemnto}>Modo Obscuro: 600</Text>
      <Text style={Styles.elemnto}>Barra busqueda: 400</Text>
      <Text style={Styles.elemnto}>Logo empresa: 300</Text>
      <Text style={Styles.elemnto}>Login: 450</Text>
      <Text style={Styles.elemnto}></Text>
      <Text style={Styles.elemnto}>Elementos del encabeza:</Text>
      <Text style={Styles.elemnto}>Banner: 700</Text>
      <Text style={Styles.elemnto}>Slider: 400</Text>
      <Text style={Styles.elemnto}>Descripcion: 200</Text>
      <Text style={Styles.elemnto}>Call action: 340</Text>
      <Text style={Styles.elemnto}></Text>
      <Text style={Styles.elemnto}>Elementos del body:</Text>
      <Text style={Styles.elemnto}>Formulario: 600</Text>
      <Text style={Styles.elemnto}>Carrusel de imagenes: 250</Text>
      <Text style={Styles.elemnto}>Cards: 150</Text>
      <Text style={Styles.elemnto}>ScrollSpy: 80</Text>
      <Text style={Styles.elemnto}></Text>
      <Text style={Styles.elemnto}>Elementos del footer:</Text>
      <Text style={Styles.elemnto}>Redes sociales: 130</Text>
      <Text style={Styles.elemnto}>Enlaces: 50</Text>
      <Text style={Styles.elemnto}>Mapa: 120</Text>
      <Text style={Styles.elemnto}>Politicas de privacidad: 140</Text>
      <Text style={Styles.elemnto}></Text>
      <Text style={Styles.elemnto}>Tipos de base de datos:</Text>
      <Text style={Styles.elemnto}>MongoDB: 400</Text>
      <Text style={Styles.elemnto}>MySQL: 350</Text>
      <Text style={Styles.elemnto}>FireBase: 400</Text>
      <Text style={Styles.elemnto}>SQLite: 350</Text>
      <Text style={Styles.elemnto}></Text>
      <Text style={Styles.elemnto}>Tipo de Framework:</Text>
      <Text style={Styles.elemnto}>Laravel: 500</Text>
      <Text style={Styles.elemnto}>React: 650</Text>
      <Text style={Styles.elemnto}>Symfony: 500</Text>
      <Text style={Styles.elemnto}>Python: 700</Text>
      <Text style={Styles.elemnto}></Text>
      <Text style={Styles.elemnto}>Hosting de base de datos (por mes):</Text>
      <Text style={Styles.elemnto}>Hostinger: 20</Text>
      <Text style={Styles.elemnto}>GoDaddy: 30</Text>
      <Text style={Styles.elemnto}>Goodle Cloud: 40</Text>


      <View style={Styles.inputGroup}>
        <Text style={Styles.titulos}>Elementos de la barra de navegacion</Text>
        <Picker
          /* obtenemos la variable que tiene almacenado el dato que creamos */
          selectedValue={state.selectedValue}
          style={{ height: 50, width: 300 }}
          onValueChange={(value, itemIndex) =>
            /* ahora asignamos el nuevo dato por medio de la variable */
            setState({ ...state, setSelectedValue: value })
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
          selectedValue2={state.selectedValue2}
          style={{ height: 50, width: 300 }}
          onValueChange={(value, itemIndex) =>
            setState({ ...state, setSelectedValue2: value })
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
          selectedValue3={state.selectedValue3}
          style={{ height: 50, width: 300 }}
          onValueChange={(value, itemIndex) =>
            setState({ ...state, setSelectedValue3: value })
          }
        >
          <Picker.Item label="Elije algun elemento" value="" />
          <Picker.Item label="Formulario" value={state.formulario} />
          <Picker.Item label="Carrusel de imagenes" value={state.carrusel} />
          <Picker.Item label="Cards" value={state.cards} />
          <Picker.Item label="Scroll spy" value={state.scrollSpy} />
        </Picker>
      </View>
      <View style={Styles.inputGroup}>
        <Text style={Styles.titulos}>Elementos del footer</Text>
        <Picker
          selectedValue4={state.selectedValue4}
          style={{ height: 50, width: 300 }}
          onValueChange={(value, itemIndex) =>
            setState({ ...state, setSelectedValue4: value })
          }
        >
          <Picker.Item label="Elije algun elemento" value="" />
          <Picker.Item label="Redes Sociales" value={state.redesS} />
          <Picker.Item label="Enlaces" value={state.links} />
          <Picker.Item label="Mapa" value={state.mapa} />
          <Picker.Item label="Politicas de privacidad" value={state.politicas} />
        </Picker>
      </View>
      <View style={Styles.inputGroup}>
        <Text style={Styles.titulos}>Tipo Base de datos</Text>
        <Picker
          selectedValue5={state.selectedValue5}
          style={{ height: 50, width: 300 }}
          onValueChange={(value, itemIndex) =>
            setState({ ...state, setSelectedValue5: value })
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
          selectedValue6={state.selectedValue6}
          style={{ height: 50, width: 300 }}
          onValueChange={(value, itemIndex) =>
            setState({ ...state, setSelectedValue6: value })
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
          selectedValue7={state.selectedValue7}
          style={{ height: 50, width: 300 }}
          onValueChange={(value, itemIndex) =>
            setState({ ...state, setSelectedValue7: value })
          }
        >
          <Picker.Item label="Elije algun elemento" value="" />
          <Picker.Item label="Hostinger" value={state.hostinger} />
          <Picker.Item label="GoDaddy" value={state.godady} />
          <Picker.Item label="Google Cloud" value={state.google} />
        </Picker>
      </View>
      <View style={Styles.registrar}>
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
