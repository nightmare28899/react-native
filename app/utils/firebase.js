import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDE_x53FAI6EtqCNMwpLIPzCjocUf-qIV4",
  authDomain: "integradora-65365.firebaseapp.com",
  projectId: "integradora-65365",
  storageBucket: "integradora-65365.appspot.com",
  messagingSenderId: "668633215759",
  appId: "1:668633215759:web:e31780bc71b9851542847a"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);