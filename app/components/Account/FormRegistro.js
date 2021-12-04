import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { validarEmail } from "../../utils/validaciones";
import { size, isEmpty } from "lodash";
//importamos la dependencia a firebase
import firebase from "firebase/app";
import { useNavigation } from "@react-navigation/native";

export default function FormRegistro(toast) {
  //declaramos el objeto que manipulará el toast
  const navigation = useNavigation();
  const { toastRef } = toast;
  const [mostrar, setMostrar] = useState(false);
  const [mostrar2, setMostrar2] = useState(false);
  /*El estado datos almacenará los datos del formulario
  por default se inicializa con los campos creados
  en la función valoresDefault */
  const [datos, setDatos] = useState(valoresDefault);

  /*Método que se ejecutará al dar clic en el botón
  nos permitirá por el momento verificar en consola
  los datos recuperados del formulario*/
  const onSubmit = () => {
    //Verificamos que no se envíen datos vacíos
    if (
      isEmpty(datos.email) ||
      isEmpty(datos.password) ||
      isEmpty(datos.repeatedPassword)
    ) {
      //Enviamos el mensaje al cuerpo del toast para hacerlo visible
      toastRef.current.show("No puedes dejar campos vacios");
      console.log("No puedes dejar campos vacios");
    } //Validados la estructura del email
    else if (!validarEmail(datos.email)) {
      //Enviamos el mensaje al cuerpo del toast para hacerlo visible
      toastRef.current.show("Estructura del email incorrecta");
      console.log("Estructura del email incorrecta");
    } //Validamos que la contraseña tenga al menos 6 carácteres
    else if (size(datos.password) < 6) {
      //Enviamos el mensaje al cuerpo del toast para hacerlo visible
      toastRef.current.show("La contraseña debe tener al menos 6 caracteres");
      console.log("La contraseña debe tener al menos 6 caracteres");
    } //Validamos que las contraseñas sean iguales
    else if (datos.password !== datos.repeatedPassword) {
      //Enviamos el mensaje al cuerpo del toast para hacerlo visible
      toastRef.current.show("Las contraseñas deben ser iguales");
      console.log("Las contraseñas deben ser iguales");
    } //Si todo es correcto visualizaremos los datos
    else {
      /*Ejecutamos la autenticación por email, la función requiere dos valores
      email y contraseña. La función createUserWithEmailAndPassword retorna una
      promesa por lo que si el resultado es resolve el objeto almacenado lo atrapamos
      como respuesta y lo visualizamos en consola. Si el resultado de una promesa es
      un reject mostramos el error en el catch
      */
      firebase
        .auth()
        .createUserWithEmailAndPassword(datos.email, datos.password)
        .then((respuesta) => {
          navigation.navigate("cuentas");
        })
        .catch(() => {
          toastRef.current.show(
            "El correo electrónico ya está en uso, intente con un correo diferente"
          );
        });
    }
  };
  /*Método que se activará al escribir en los campos
 del formulario:
 e -> Contiene los datos del evento
 type -> El nombre del campo que se actualizará en el estado */
  const onChange = (e, type) => {
    /*
  ...datos -> Indica que se actualizarán los campos
  que contiene el estado "datos" que como se crearton en
  la función valoresDefault son email, password y repeatPassword
  [type] -> Pemite recuperar el nombre del campo que se modificará.
  e.nativeEvent.text -> Recupera el texto input
  */
    setDatos({ ...datos, [type]: e.nativeEvent.text });
  };
  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Correo Electrónico"
        containerStyle={styles.inputForm}
        /*Es el que manda la información del input*/
        onChange={(e) => onChange(e, "email")}
        rightIcon={
          <Icon
            type="material-community-icon"
            name="alternate-email"
            iconStyle={styles.icono}
          />
        }
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.inputForm}
        password={true}
        /*Si mostrar es false se oculta el texto
        de lo contrario se muestra*/
        secureTextEntry={mostrar ? false : true}
        /*Es el que manda la información del input*/
        onChange={(e) => onChange(e, "password")}
        rightIcon={
          <Icon
            type="material-community-icon"
            /*Si mostrar es false se muestra el icono
            de ocultar contraseña de lo contrario se muestra
            el icono de ver contraseña*/
            name={mostrar ? "visibility" : "visibility-off"}
            iconStyle={styles.icono}
            onPress={() => setMostrar(!mostrar)}
          />
        }
      />
      <Input
        placeholder="Repetir Contraseña"
        containerStyle={styles.inputForm}
        password={true}
        /*Si mostrar es false se oculta el texto
        de lo contrario se muestra*/
        secureTextEntry={mostrar2 ? false : true}
        /*Es el que manda la información del input*/
        onChange={(e) => onChange(e, "repeatedPassword")}
        rightIcon={
          <Icon
            type="material-community-icon"
            /*Si mostrar es false se muestra el icono
            de ocultar contraseña de lo contrario se muestra
            el icono de ver contraseña*/
            name={mostrar2 ? "visibility" : "visibility-off"}
            iconStyle={styles.icono}
            onPress={() => setMostrar2(!mostrar2)}
          />
        }
      />
      <Button
        title="Registrar"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        /*Al hacer clic activamos el método onSubmit del botón */
        onPress={onSubmit}
      />
    </View>
  );
}

function valoresDefault() {
  return {
    email: "",
    password: "",
    repeatedPassword: "",
  };
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  inputForm: {
    width: "100%",
    marginTop: 20,
  },
  btnContainer: {
    marginTop: 20,
    width: "100%",
  },
  btn: {
    backgroundColor: "#0A6ED3",
  },
  icono: {
    color: "#c1c1c1",
  },
});
