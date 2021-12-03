import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native"
import { firebaseApp } from "../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import ListaTopSucursales from "../components/Sucursales/ListaTopSucursales";
import { useNavigation } from "@react-navigation/core";

const db = firebase.firestore(firebaseApp);
//Obtenemos el ancho de la ventana del dispositivo
const screenWidth = Dimensions.get("window").width;

export default function TopSucursales(propiedades) {
  const navegacion = useNavigation();
  const [sucursales, setSucursales] = useState([]);
  const [totalSuc, setTotalSuc]=useState([]);
  const [puntero, setPuntero]=useState(0);
  const [usuairo, setUsuario]=useState(null);

  //Consultando sucursales
  useEffect(() => {
    /*accedemos a la colección de sucursales, consultamos los registros
  con get y atrapamos la respuesta (se retorna una promesa con la lista sucursales)
  contamos y asignamos el total de sucursales al useState totalSuc*/
    db.collection("sucursales")
      .get()
      .then((res) => {
        setTotalSuc(res.size);
      });
    const arrSucursales = [];
    db.collection("sucursales")
      .orderBy("rating", "desc")
      .limit(5)
      .get()
      .then((res) => {
        setPuntero(res.docs[res.docs.length - 1]);
        res.forEach((doc) => {
          //extraemos cada documento y lo almacenamos en un objeto sucursal
          const sucursal = doc.data();
          //la clave de la sucursal no asigna a menos que lo indiquemos
          sucursal.id = doc.id;
          //almacenamos cada sucursal en un arreglo.
          arrSucursales.push(sucursal);
        });
        //Al terminar de recuperar todos los documentos los almacenamos en el useState sucursales
        setSucursales(arrSucursales);
      });
  }, []);

  return (
    <View>
     <ListaTopSucursales sucursales={sucursales} />
    </View> 
  );
}

const styles = StyleSheet.create({
  sucursales: {
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
    fontSize: 20,
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
  },
  listaInfo: {
    borderBottomColor: "#D8D8D8",
    borderBottomWidth: 1,
  },
});
