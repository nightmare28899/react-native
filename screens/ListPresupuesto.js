import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { firebaseApp } from "../app/utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import { ListItem, Avatar, Icon } from "react-native-elements";
const db = firebase.firestore(firebaseApp);

const Presupuesto = (props) => {
  const [users, setUsers] = useState([]);
  const [usuario, setUsuario] = useState(null);
  useEffect(() => {
    db.collection("presupuesto").onSnapshot((querySnapShot) => {
      const users = [];
      querySnapShot.docs.forEach((doc) => {
        const { nombre, correo, mensaje, navbar, encabezado, total, creado } = doc.data();
        users.push({
          id: doc.id,
          nombre,
          correo,
          mensaje,
          navbar,
          encabezado,
          total,
          creado,
        });
      });
      setUsers(users);
    });
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      //si existe una sesión activa asignamos los datos de sesión al useState usuario
      setUsuario(userInfo);
    });
  }, []);

  return (
    <ScrollView style={styles.vista}>
      {/*Colocaremos un botón de agregar nueva sucursal*/}
      {usuario && (
        <Button
          title="Crea un presupuesto"
          onPress={() => props.navigation.navigate("CreatePresupuesto")}
        />
      )}
      {users.map((user) => {
        return (
          <ListItem
            key={user.id}
            bottomDivider
            onPress={() => {
              props.navigation.navigate("EditPresupuesto", {
                userId: user.id,
              });
            }}
          >
            <ListItem.Chevron />
            <Avatar
              source={{
                uri: "https://www.computerhope.com/jargon/d/doc.png",
              }}
              rounded
            />
            <ListItem.Content>
              <ListItem.Title>{user.nombre}</ListItem.Title>
              <ListItem.Subtitle>{user.correo}</ListItem.Subtitle>
              <ListItem.Subtitle>{user.mensaje}</ListItem.Subtitle>
              <ListItem.Subtitle><Text>Costo de Navbar: </Text> {user.navbar}</ListItem.Subtitle>
              <ListItem.Subtitle><Text>Costo de encabezado: </Text> {user.encabezado}</ListItem.Subtitle>
              <ListItem.Subtitle><Text>Costo Total: </Text> {user.total}</ListItem.Subtitle>
              <ListItem.Subtitle>{user.creado.substring(0, 24)}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
  );
};

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
  vista: {
    flex: 1,
    backgroundColor: "#FFFF",
  },
  btn: {
    position: "absolute",
    bottom: 10,
    right: 10,
    //Para IOS mostrará una sombra para el botón
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
  },
});

export default Presupuesto;
