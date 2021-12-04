import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import Toast from "react-native-easy-toast";
import firebase from "firebase/app";
//Importamos el componente de información del usuario
import InfoUsuario from "../../components/Account/InfoUsuarios";
//Importamos el componente de de OpcionesCuenta
import OpcionesCuenta from "../../components/Account/OpcionesCuenta";

export default function UserLogged() {
  const [userInfo, setUserInfo] = useState(null);
  const [realoadUserInfo, setRealoadUserInfo] = useState(false);
  const [cargando, setCargando] = useState(false);
  const toastRef = useRef();
  useEffect(() => {
    (async () => {
      //recuperamos los datos del usuario
      const user = await firebase.auth().currentUser;
      //actualizamos el estado de user con los datos recuperados
      setUserInfo(user);
    })();
    setRealoadUserInfo(false);
  }, [realoadUserInfo]);
  return (
    <View style={styles.container}>
      {/*Si existe sesión */}
      {userInfo && (
        /*Mostramos el componente de información del usuario
    enviamos al componente los datos del usuario, toast y
    estado de carga*/
        <InfoUsuario
          userInfo={userInfo}
          toastRef={toastRef}
          setCargando={setCargando}
        />
      )}
      <OpcionesCuenta
        userInfo={userInfo}
        toastRef={toastRef}
        setRealoadUserInfo={setRealoadUserInfo}
      />
      <View style={styles.espacio}>
        {/* boton para cerrar la sesion de firebase */}
        <Button
          title="Cerrar sesión"
          onPress={() => firebase.auth().signOut()}
        />
      </View>
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </View>
  );
}

const styles = StyleSheet.create({
  viewUserInfo: {
    minHeight: "100%",
    backgroundColor: "#f2f2f2",
  },
  container: {
    flex: 1,
    padding: 35,
  },
  espacio: {
    marginTop: 20,
  },
});
