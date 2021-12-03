import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'; 
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator()

import ListaComemtarios from "./Comentarios/ListaComentarios";
import DatosComentarios from "./Comentarios/DatosComentarios";
import CreaComentario from "./Comentarios/CreaComentario";

function MyStack() {
  return(
    <Stack.Navigator>
      <Stack.Screen name="ListaComemtarios" component={ListaComemtarios} options={{ title: "Lista de Comentarios" }}/>
      <Stack.Screen name="CreaComentario" component={CreaComentario} options={{ title: "Crea un Comentario" }}/>
      <Stack.Screen name="DatosComentarios" component={DatosComentarios} options={{ title: "Editar Comentario" }}/>
    </Stack.Navigator>
  )
}

export default function Comentarios() {
  return (
    <NavigationContainer independent={true}>
      <MyStack/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
  },
});
