import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Image, Rating } from "react-native-elements";
import { size } from "lodash";
import { useNavigation } from "@react-navigation/native";

export default function ListaTopSucursales(propiedades) {
  function Sucursales(propiedades) {
    //Recibe la lista de sucursales
    const { sucursales } = propiedades;
    //en cada iteración obtiene los datos de la sucursal
    const { imagenes, nombre, rating, id } = sucursales.item;
    //definimos el acceso a las rutas de sucursales
    const navegacion = useNavigation();
    //Método que se ejecutará al dar clic a los items de la lista
    const consultarRestaurante = () => {
      navegacion.navigate("ver_top", { id, nombre });
    };
    return (
      //Agregamos el clic a cada item al dar clic el item se opaca
      <ScrollView vertical>
        <TouchableOpacity onPress={consultarRestaurante}>
          {/*Esturctura de cada item */}
          <View style={styles.lista}>
            <View style={styles.viewImagen}>
              {/*cover escala la imagen de forma uniforme para evitar distorsión 
                PlaceholderContent mostrará un spiner si tarda la carga de imagen 
                source define que se mostrará la imagen 0 del arreglo de imágenes guardadas, si sucediera que 
                no hay imagen se muestra la imagen no-encontrada cargada en el proyecto*/}
              <Image
                resizeMode="cover"
                PlaceholderContent={<ActivityIndicator color="#0000ff" />}
                source={
                  imagenes[0]
                    ? { uri: imagenes[0] }
                    : require("../../../assets/img/no-encontrada.png")
                }
                style={styles.imagen}
              />
            </View>
            {/*Mostramos los datos adicionales de la sucursal, en el caso de la descripción dado que puede ser 
            larga limitamos el texto a mostrar*/}
            <View>
              <Text style={styles.nombre}>{nombre}</Text>
              {/* cargamos las estrellas de cada sucursal */}
              <Rating
                style={styles.rating}
                imageSize={20}
                readonly
                startingValue={parseFloat(rating)}
              />
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  const { sucursales } = propiedades;
  return (
    <View>
      {size(sucursales) > 0 ? (
        <FlatList
          //arreglo de datos que se listarán
          data={sucursales}
          //Estructura de cada item que se visualizará en nuestro caso es un estructura creada en la función Sucursales.
          renderItem={(sucursales) => <Sucursales sucursales={sucursales} />}
          //Asigna un index a cada item de la lista
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <View style={styles.sucursales}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Cargando Sucursales</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sucursales: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  lista: {
    flexDirection: "row",
    margin: 10,
  },
  viewImagen: {
    marginRight: 15,
  },
  imagen: {
    width: 80,
    height: 80,
  },
  nombre: {
    fontWeight: "bold",
  },
  direccion: {
    paddingTop: 2,
    color: "grey",
  },
  descripcion: {
    paddingTop: 2,
    color: "grey",
    width: 300,
  },
  rating: {
    position: "absolute",
    marginLeft: 10,
    marginTop: 30,
  },
});
