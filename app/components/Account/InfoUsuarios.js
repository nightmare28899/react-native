import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Avatar } from "react-native-elements";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import firebase from "firebase/app";
import "firebase/storage";

export default function InfoUsuario(propiedades) {
  /*Recibimos los datos del usuario registrado que accedió al módulo
    la foto e nombre serán vacíos ya que no se encuentra actualmente,
    recibimos el toast para mostrara mensajes y un estado que nos Permitirá
    indicar su un proceso aun esta cargando o termino.
    */
  const {
    userInfo: { uid, photoURL, displayName, email },
    toastRef,
    setCargando,
  } = propiedades;
  const cambiarAvatar = async () => {
    //Se solicita acceso a la galeria
    const resultPermiso = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    const solicitudPermiso = resultPermiso.permissions.mediaLibrary.status;
    //Si la respuesta de usuario al otorgar permiso es denegada
    if (solicitudPermiso === "denied") {
      toastRef.current.show("Es necesario aceptar los permisos de la galería");
    } else {
      //Si se otorga el permiso
      //Lanzamos la visualización de la galería de imágenes del dispositivo
      const result = await ImagePicker.launchImageLibraryAsync({
        //Permitirá editar la imagen
        allowsEditing: true,
        //resolución estandar SD marcará el tamaño de la imagen
        aspect: [4, 3],
      });
      //Si se cierra la galería sin elegir imagen
      if (result.cancelled) {
        toastRef.current.show("Has cerrado la selección de imágenes");
      } else {
        //si se selecciona imagen se inicia el registro en firebase
        subirImagen(result.uri)
          .then(() => {
            //Si el almacenamiento es correcto se actualiza el avatar en la ventana
            updatePhotoUrl();
          })
          .catch(() => {
            //si ocurre algún error al cargar la imagen
            toastRef.current.show("Error al actualizar el avatar.");
          });
      }
    }
  };
  const subirImagen = async (uri) => {
    /*Dado que el proceso de carga de imagen puede tardar
        emplearemos un estado que identifique cuanto se esta en espera
        o el proceso culminó*/
    setCargando(true);
    toastRef.current.show("Realizando cambios ...");
    /*La imagen cargada la procesamos como una petición fetch
        de carga de archivos a servidor (nuestro storage de firebase)*/
    const response = await fetch(uri);
    //Indicamos que el tipo de archivo enviado es blob
    const blob = await response.blob();
    /*almacenamos la imagen en el storage avatar de firebase,
        vinculandolo con la clave del usuario*/
    const ref = firebase.storage().ref().child(`avatar/${uid}`);
    /*Al procesar el envío iniciamos una promesa que
        Atrapará el objeto enviado y lo retornará para que sea
        actualizado en la ventana actual */
    return ref.put(blob);
  };

  const updatePhotoUrl = () => {
    //Realizamos una consulta del avatar actual del usuario
    firebase
      .storage()
      .ref(`avatar/${uid}`)
      .getDownloadURL()
      .then(async (response) => {
        /*Si se encuentra se actualiza la ruta en photoURL que
    es el encargado de definir la imagen a mostrar en pantalla*/
        const update = {
          photoURL: response,
        };
        //esperamos la actualización completa del perfil de usuario
        await firebase.auth().currentUser.updateProfile(update);
        /*Si todo es correcto el proceso de actualización de avatar terminar
    y el estado de espera de carga termina*/
        setCargando(false);
      })
      .catch(() => {
        toastRef.current.show("Error al actualizar el avatar.");
      });
  };

  return (
    <View style={styles.viewUserInfo}>
      <Avatar
        rounded
        size="large"
        //Si se presiona la imagen del avatar se activa el proceso de cambiar avatar
        onPress={cambiarAvatar}
        containerStyle={styles.userInfoAvatar}
        /*Definimos la imagen si hay avatar en la bd se muestra el avatar del usuario
        y si no hay imagen se muestra el avatar-default*/
        source={
          photoURL
            ? { uri: photoURL }
            : require("../../../assets/img/avatar-default.jpeg")
        }
      >
        {/*Agrega un icono de lápiz al lado del avatar */}
        <Avatar.Accessory size={24} />
      </Avatar>
      <View>
        <Text style={styles.displayName}>
          {/*Si hay un nombre de usuario en firebase se muestra,
 de lo contrario se muestra el texto Anónimo */}
          {displayName ? displayName : "Anónimo"}
        </Text>
        {/*Si hay un email de usuario en firebase se muestra,
 de lo contrario se muestra un texto */}
        <Text>{email ? email : "Login Social"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewUserInfo: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    paddingTop: 30,
    paddingBottom: 30,
  },
  userInfoAvatar: {
    marginRight: 20,
  },
  displayName: {
    fontWeight: "bold",
    paddingBottom: 5,
  },
});
