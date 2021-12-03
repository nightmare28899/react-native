import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Rating } from "react-native-elements";
import { map } from "lodash";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

function Review(propiedades) {
  const { title, review, rating, createAt } = propiedades.review;
  //Convertimos la fecha Timestamp de firebase a una fecha de JavaScript
  //Con una precision de millisecond.
  const createReview = new Date(createAt.seconds * 1000);
  return (
    <View style={styles.viewReview}>
      <View style={styles.viewInfo}>
        <Text style={styles.reviewTitle}>{title}</Text>
        <Text style={styles.reviewText}>{review}</Text>
        <Rating imageSize={15} startingValue={rating} readonly />
        <Text style={styles.reviewDate}>
          {/*Extraemeo de la fecha los valores por separado */}
          {createReview.getDate()}/{createReview.getMonth() + 1}/
          {createReview.getFullYear()} - {createReview.getHours()}:
          {createReview.getMinutes() < 10 ? "0" : ""}
          {createReview.getMinutes()}
        </Text>
      </View>
    </View>
  );
}

export default function Reviews(propiedades) {
  //recibe la navegación de la ventana anterior
  // para regresar después de registrar la puntuación
  //y el id de la sucursal que se actualizará
  const { navigation, id, route } = propiedades;
  //Solo se permitirá registrar comentarios y valuación si existe sesión
  const [userLogged, setUserLogged] = useState(false);
  //estado que almacenará las puntuaciones registradas
  const [reviews, setReviews] = useState([]);
  //Validamos la existencia de sesión
  firebase.auth().onAuthStateChanged((user) => {
    user ? setUserLogged(true) : setUserLogged(false);
  });
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

  return (
    <View>
      {/* cada review recuperado de la BD y almacenado en el useState
        Se visualizará con la estructura definida en la función Review */}
      {map(reviews, (review, index) => (
        <Review key={index} review={review} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  btnAddReview: {
    backgroundColor: "transparent",
  },
  btnTitleAddReview: {
    color: "#0A6ED3",
  },
  viewReview: {
    flexDirection: "row",
    padding: 10,
    paddingBottom: 20,
    borderBottomColor: "#0A6ED3",
    borderBottomWidth: 1,
  },
  viewInfo: {
    flex: 1,
    alignItems: "flex-start",
  },
  reviewTitle: {
    fontWeight: "bold",
  },
  reviewText: {
    paddingTop: 2,
    color: "grey",
    marginBottom: 5,
  },
  reviewDate: {
    marginTop: 5,
    color: "grey",
    fontSize: 12,
    position: "absolute",
    right: 0,
    bottom: 0,
  },
});
