import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";

import RutasSucursales from "./RutasSucursales";
import RutasComentarios from "../screens/Comentarios";
import Favoritos from "../screens/Favoritos";
import TopSucursales from "./RutasTop";
import Busquedas from "../screens/Busquedas";
import RutasCuentas from "./RutasCuenta";

const Tab = createBottomTabNavigator();

export default function Navegacion() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        //Define en que página deseas iniciar
        initialRouteName="Home" //cuenta es el nombre definido en el Tab.Screen
        tabBarStyle={{
          //Color del texto e icono cuando no está activo.
          tabBarInactiveTintColor: "#52585E",
          //Color del texto e icono cuando está activo.
          tabBarActiveTintColor: "#00a680",
        }}
        //para cada ruta cargada en el proyecto entonces =>
        screenOptions={({ route }) => ({
          /*Se asigna el color de la ruta al icono y se ejecuta la función
 opciones que recibe la ruta del menú y color*/
          tabBarIcon: ({ color }) => opciones(route, color),
        })}
      >
        <Tab.Screen name="Home" component={Favoritos}  />
        {/* <Tab.Screen
          name="sucursales"
          component={RutasSucursales}
          options={{ headerShown: false }}
        /> */}
        <Tab.Screen
          name="Comments"
          component={RutasComentarios}
          options={{ headerShown: false }}
        />
         <Tab.Screen
          name="Budgets"
          component={Busquedas}
          options={{ headerShown: false }}
        />
        {/* <Tab.Screen
          name="top"
          component={TopSucursales}
          options={{ headerShown: false }}
        /> */}
        <Tab.Screen
          name="User"
          component={RutasCuentas}
          /*{ headerShown: false } es empleado para indicar
          que no se visualice el encabezado por default de la página
          en su lugar se mostrará el definido en el Stack, si no lo colocan
          Se mostrarían dos encabezados*/
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function opciones(ruta, color) {
  let iconName;
  //De acuerdo al nombre de cada ruta se signa un icono
  switch (ruta.name) {
    case "sucursales":
      //para buscar iconos https://materialdesignicons.com/
      iconName = "favorite";
      break;
    case "Comments":
      iconName = "comment";
      break;
    case "Home":
      iconName = "home";
      break;
    case "top":
      iconName = "star";
      break;
    case "Budgets":
      iconName = "book";
      break;
    case "User":
      iconName = "person";
      break;
    default:
      break;
  }
  return (
    <Icon type="material-comunity" name={iconName} size={22} color={color} />
  );
}
