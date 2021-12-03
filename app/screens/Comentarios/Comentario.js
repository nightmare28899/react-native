import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import { map } from "lodash";
/*Rating nos permite colocar la puntuación de la sucursal con estrellas
LisItem nos permitirá visualizar las propiedades de cada sucursal como una lista*/
import { ListItem, Avatar, Icon } from "react-native-elements";
const db = firebase.firestore(firebaseApp);

export default function Comentario(propiedades) {
  console.log(propiedades);
  //Extraemos los objetos navigation y route
  const { navigation, route } = propiedades;
  //Extraemos el id y nombre contenido en el objeto params de route
  const { id, usuario } = route.params;
  //useState para almacenar datos de la sucursal
  const [comentario, setComentario] = useState(null);
  //Estado para puntuación de la sucursal

  useEffect(() => {
    /*setOption nos permite cambiar las propiedades del stack ver_sucursal, en
    nuestro caso cambiaremos el titulo de la ventana con el nombre de la
    sucursal seleccionada de la lista*/
    navigation.setOptions({ title: usuario });
  }, []);

  useEffect(() => {
    db.collection("comentarios")
      .doc(id)
      .get()
      .then((resp) => {
        const datos = resp.data();
        /*Asignamos el id al conjunto de datos*/
        datos.id = resp.id;

        setComentario(datos);
      });
  }, []);

  function Informacion(propiedades) {
    const { usuario, comentario } = propiedades;
    const listaItems = [
      {
        text: usuario,
        iconName: "account",
        iconType: "material-community",
        action: null,
      },
      //El primer elemento de la lista será nuestra dirección
      {
        text: comentario,
        iconName: "comment",
        iconType: "material-community",
        action: null,
      },
    ];
    return (
      <View style={styles.viewSucursal}>
        <View>
          {listaItems.map((item, index) => (
            <ListItem key={index} containerStyle={styles.listaInfo}>
              <Icon name={item.iconName} type={item.iconType} color="#0A6ED3" />
              <ListItem.Content>
                <ListItem.Title>{item.text}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </View>
      </View>
    );
  }

  return (
    <View>
      {comentario ? (
        <ScrollView>
          <Informacion
            usuario={comentario.usuario}
            comentario={comentario.comentario}
          />
        </ScrollView>
      ) : (
        <View style={styles.comentarios}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Cargando Comentario</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  comentarios: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  body: {
    flex: 1,
    backgroundColor: "white",
  },
  viewSucursal: {
    padding: 15,
  },
  nombre: {
    fontSize: 16,
    fontWeight: "bold",
  },
  descripcion: {
    marginTop: 5,
    color: "grey",
  },
  direccion: {
    marginTop: 5,
    color: "grey",
  },
  direccionTitulo: {
    fontWeight: "bold",
    marginTop: 5,
    color: "grey",
  },
  rating: {
    position: "absolute",
    right: 0,
    marginTop: 40,
    paddingRight: 20,
  },
  listaInfo: {
    borderBottomColor: "#D8D8D8",
    borderBottomWidth: 1,
  },
});
