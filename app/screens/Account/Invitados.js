import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

export default function Invitados() {
  const navegacion = useNavigation();

  return (
    <ScrollView centerContent={true} style={styles.body}>
      <Image
        source={require("../../../assets/img/fondo.png")}
        resizeMethod="auto"
        style={styles.imagen}
      />
      <Text style={styles.titulo}>Ingresa a tu perfil</Text>
      <Text style={styles.parrafo}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially
      </Text>
      <View style={styles.button}>
        <Button
          title="Inicias Sesión"
          type="solid"
          onPress={() => navegacion.navigate("login")}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: {
    marginLeft: 30,
    marginRight: 30,
  },
  imagen: {
    //altura
    height: 320,
    //ancho
    width: "100%",
    //margen inferior
    marginBottom: 30,
    //margen superior
    marginTop: 20,
  },
  titulo: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 10,
    textAlign: "center",
  },
  parrafo: {
    textAlign: "justify",
    marginBottom: 20,
  },
  button: {
    marginBottom: 25,
  },
});
