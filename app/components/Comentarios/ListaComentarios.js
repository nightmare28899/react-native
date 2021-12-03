import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { size } from "lodash";
import { useNavigation } from "@react-navigation/native";
import { ListItem, Avatar, Icon } from "react-native-elements";

export default function ListaComentarios(propiedades) {
  //const {sucursales}=propiedades;
  const { comentarios } = propiedades;
  return (
    <View>
      {size(comentarios) > 0 ? (
        <FlatList
          data={comentarios}
          renderItem={(comentarios) => (
            <Comentarios comentarios={comentarios} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <View style={styles.comentarios}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Cargando Comentarios</Text>
        </View>
      )}
    </View>
  );
}

function Comentarios(propiedades) {
  //Recibe la lista de sucursales
  const { comentarios } = propiedades;
  //en cada iteración obtiene los datos de la sucursal
  const { usuario, fechaCreacion, comentario, id } = comentarios.item;
  //definimos el acceso a las rutas de sucursales
  const navegacion = useNavigation();
  //Método que se ejecutará al dar clic a los items de la lista
  const consultarRestaurante = () => {
    navegacion.navigate("ver_comentario", { id, usuario });
  };
  const { review, creado } = comentarios.item;
  const createReview = new Date(creado.seconds * 1000);
  return (
    //Agregamos el clic a cada item al dar clic el item se opaca
    <TouchableOpacity onPress={consultarRestaurante}>
      {/*Esturctura de cada item */}
      <View style={styles.lista}>
        {/*Mostramos los datos adicionales de la sucursal, en el caso de la descripción dado que puede ser
 larga limitamos el texto a mostrar*/}
        <View>
          <Text style={styles.nombre}>{usuario}</Text>
          <Text style={styles.descripcion}>
            {comentario.substring(0, 60)}...
          </Text>
          <Text style={styles.reviewDate}>
            {/*Extraemeo de la fecha los valores por separado */}
            {createReview.getDate()}/{createReview.getMonth() + 1}/
            {createReview.getFullYear()} - {createReview.getHours()}:
            {createReview.getMinutes() < 10 ? "0" : ""}
            {createReview.getMinutes()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  comentarios: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  lista: {
    flexDirection: "row",
    margin: 10,
  },
  viewImagen: {
    marginRight: 15,
  },
  imagen: {
    width: 80,
    height: 80,
  },
  nombre: {
    fontWeight: "bold",
  },
  direccion: {
    paddingTop: 2,
    color: "grey",
  },
  descripcion: {
    paddingTop: 2,
    color: "grey",
    width: 300,
  },
  reviewDate: {
    color: "grey",
    fontSize: 12,
    right: 0,
    bottom: 0,
    marginLeft: 218,
  },
});
