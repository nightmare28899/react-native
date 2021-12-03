import React,{useEffect} from 'react';
//Importamos la estructura de navegación creada
import Navegacion from './app/navigations/Navegacion';
import {firebaseApp} from './app/utils/firebase';
import firebase from 'firebase'
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default function App() {
 useEffect(() => {
 firebase.auth().onAuthStateChanged((user)=>{
   console.log(user);
  })
 },[]);
 {/* retornamos como vista la estructura de nagación,
 por default se abrirá la página de Sucursales ya que
 es la definida en nuestro menú*/}
 return <Navegacion/>
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'cyan',
    alignItems: 'center',
    justifyContent: 'center',
  },
 
});
