import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import CarouselImagenes from "../../components/CarouselImagenes";
import { map } from "lodash";
/*Rating nos permite colocar la puntuación de la sucursal con estrellas
LisItem nos permitirá visualizar las propiedades de cada sucursal como una lista*/
import { Rating, ListItem, Icon } from "react-native-elements";
import Reviews from "../../components/Sucursales/TopReviews";
import { useNavigation } from "@react-navigation/native";

const db = firebase.firestore(firebaseApp);
//Obtenemos el ancho de la ventana del dispositivo
const screenWidth = Dimensions.get("window").width;

function Review(propiedades) {
  const { rating, createAt } = propiedades.review;
  //Convertimos la fecha Timestamp de firebase a una fecha de JavaScript
  //Con una precision de millisecond.
  return (
    <View style={styles.rating}>
      <Rating imageSize={20} startingValue={rating} readonly />
    </View>
  );
}

export default function Sucursal(propiedades) {
  console.log(propiedades);
  //Extraemos los objetos navigation y route
  const { navigation, route } = propiedades;
  //Extraemos el id y nombre contenido en el objeto params de route
  const { id, nombre } = route.params;
  //useState para almacenar datos de la sucursal
  const [sucursal, setSucursal] = useState(null);
  //Estado para puntuación de la sucursal
  const [rating, setRating] = useState(0);
  //estado que almacenará las puntuaciones registradas
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    /*setOption nos permite cambiar las propiedades del stack ver_sucursal, en
    nuestro caso cambiaremos el titulo de la ventana con el nombre de la
    sucursal seleccionada de la lista*/
    navigation.setOptions({ title: nombre });
  }, []);

  useEffect(() => {
    /*Consultamos la sucursal con id recibido como parámetro desde la lista de sucursales*/
    db.collection("sucursales")
      .doc(id)
      .get()
      .then((resp) => {
        /*Extraemos los datos del documento recuperado en la consulta*/
        const datos = resp.data();
        /*Asignamos el id al conjunto de datos*/
        datos.id = resp.id;
        /*Asignamos los datos de la sucursal recuperado a nuestro useState*/
        setSucursal(datos);
      });
  }, []);

  useEffect(() => {
    //consultamos la colección de reviews de la sucursal y almacenamos
    // los documentos en el useState de reviews
    db.collection("reviews")
      .where("idSucursal", "==", id)
      .get()
      .then((response) => {
        const resultReview = [];
        response.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id;
          resultReview.push(data);
        });
        setReviews(resultReview);
      });
  }, []);

  function Informacion(propiedades) {
    const { nombre, direccion, descripcion } = propiedades;
    const listaItems = [
      //El primer elemento de la lista será nuestra dirección
      {
        text: direccion,
        iconName: "google-maps",
        iconType: "material-community",
        action: null,
      },
      //podemos agregar multiples valores como no tenemos mas datos en la bd
      //colocaremos datos fijos para ejemplificar
      {
        text: "443 1893456",
        iconName: "phone",
        iconType: "material-community",
        action: null,
      },
      {
        text: "mail@gmail.com",
        iconName: "at",
        iconType: "material-community",
        action: null,
      },
    ];
    console.log(propiedades);
    return (
      <View style={styles.viewSucursal}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.nombre}>{nombre}</Text>
          <Rating
            style={styles.rating}
            imageSize={20}
            readonly
            startingValue={parseFloat(rating)}
          /> 
          {map(reviews, (review, index) => (
            <Review key={index} review={review} />
          ))}
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.descripcion}>{descripcion}</Text>
        </View>
        <View>
          {listaItems.map((item, index) => (
            <ListItem key={index} containerStyle={styles.listaInfo}>
              <Icon name={item.iconName} type={item.iconType} color="#0A6ED3" />
              <ListItem.Content>
                <ListItem.Title>{item.text}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </View>
      </View>
    );
  }

  //Recibe la lista de sucursales
  const { sucursales } = propiedades;
  //definimos el acceso a las rutas de sucursales
  const navegacion = useNavigation();
  //Método que se ejecutará al dar clic a los items de la lista
  const consultarRestaurante = () => {
    navegacion.navigate("add-review-sucursal", { id, nombre });
  };

  return (
    <View>
      {sucursal ? (
        <ScrollView>
          {/*Incrustamos la vista de acceso a la votación
 enviamos la navegación actual para poder regresar
 el id de la sucursal a la que pertenecen los comentarios*/}
            <Reviews
              navigation={navigation}
              id={sucursal.id}
            />
        </ScrollView>
      ) : (
        <View style={styles.sucursales}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Cargando Sucursal</Text>
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
  body: {
    flex: 1,
    backgroundColor: "white",
  },
  viewSucursal: {
    padding: 15,
  },
  nombre: {
    fontSize: 20,
    fontWeight: "bold",
  },
  descripcion: {
    marginTop: 5,
    color: "grey",
  },
  direccion: {
    marginTop: 5,
    color: "grey",
  },
  direccionTitulo: {
    fontWeight: "bold",
    marginTop: 5,
    color: "grey",
  },
  rating: {
    position: "absolute",
    right: 0,
  },
  listaInfo: {
    borderBottomColor: "#D8D8D8",
    borderBottomWidth: 1,
  },
});
