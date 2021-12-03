import React,{useRef}  from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
//Componente con la estructura del formualrio de registro
import FormRegistro from "../../components/Account/FormRegistro";
//importamos la dependencia de toast
import Toast from 'react-native-easy-toast'
export default function Registrar() {
  //declaramos nuestro objeto que referenciará el toast
  const toastRef=useRef();
  return (
    <KeyboardAwareScrollView>
      <Image
        source={require("../../../assets/img/user.png")}
        resizeMethod="auto"
        style={styles.imagen}
      />
      <View style={styles.formulario}>
        {/*Agregamos el componente de formulario y
        enviamos el objeto toast al formulario para ser
        completado con los mensajes de las validaciones*/}
        <FormRegistro toastRef={toastRef}/>
      </View>
      {/*Definimos el lugar donde aparecerá el Toast */}
     <Toast ref={toastRef} position="center" opacity={0.9}/>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  imagen: {
    width: "100%",
    height: 150,
    marginTop: 20,
  },
  formulario: {
    marginTop: 40,
    marginLeft: 40,
    marginRight: 40,
  },
});
