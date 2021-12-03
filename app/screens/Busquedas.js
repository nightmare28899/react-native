import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'; 
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator()

import ListPresupuesto from "../../screens/ListPresupuesto";
import EditPresupuesto from "../../screens/EditPresupuesto";
import CreatePresupuesto from "../../screens/CreatePresupuesto";

function MyStack() {
  return(
    <Stack.Navigator>
      <Stack.Screen name="ListPresupuesto" component={ListPresupuesto} options={{ title: "Lista de Presupuestos" }}/>
      <Stack.Screen name="CreatePresupuesto" component={CreatePresupuesto} options={{ title: "Crea un Presupuesto" }}/>
      <Stack.Screen name="EditPresupuesto" component={EditPresupuesto} options={{ title: "Editar Presupuesto" }}/>
    </Stack.Navigator>
  )
}

export default function Busquedas() {
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
