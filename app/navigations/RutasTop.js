import React, { useEffect } from "react";
/*Importamos la libreria de StackNavigation, la cual
 permite definir forma para que su aplicación haga
 la transición entre pantallas */
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//Creamos el objeto de control de nuestra pila de pantallas
const Stack = createNativeStackNavigator();
//Importamos las pantallas que deseamos agregar a la ruta
import ListaTop from "../screens/TopSucursales";
import TopSucursal from "../screens/Sucursales/TopSucursal";

export default function RutasTop() {
  //Las primera pantalla que aparece en la pila será la que se muestre
  //por default al importar nuestro archivo

  return (
    <Stack.Navigator>
      {/* stack para que cargue la lista de sucursales */}
      <Stack.Screen
        name="listatop"
        component={ListaTop}
        options={{ title: "Lista Top" }}
      />
      {/* stack para que nos redirija a la parte de las opiniones de cada sucursal desde el stack de top */}
      <Stack.Screen name="ver_top" component={TopSucursal} />
    </Stack.Navigator>
  );
}
