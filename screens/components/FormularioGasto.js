import React, { useState, useEffect } from "react";
import {
  Text,
  SafeAreaView,
  View,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import globalStyles from "../styles";
import { firebaseApp } from "../../app/utils/firebase";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import { update } from "lodash";

const db = firebase.firestore(firebaseApp);

const FormularioGasto = ({
  setModal,
  handleGasto,
  gasto,
  setGasto,
  eliminarGasto,
  props
}) => {
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [categoria, setCategoria] = useState("");
  const [id, setId] = useState("");
  const [fecha, setFecha] = useState("");

  const getUserById = async (id) => {
    const dbRef = db.collection("presupuesto").doc(id);
    const doc = await dbRef.get();
    const user = doc.data();
    setUser({
      ...user,
      id: doc.id,
    });
    setLoading(false);
  };

  const handleChangeText = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    if (gasto?.nombre) {
      setNombre(gasto.nombre);
      setCantidad(gasto.cantidad);
      setCategoria(gasto.categoria);
      setId(gasto.id);
      setFecha(gasto.fecha);
    }
  }, [gasto]);

  const [usuario, setUsuario] = useState(null);
  /* desclaramos las variables que vamos a utilizar */
  const [state, setState] = useState({
    creado: new Date().toString(),
  });
  const [isLoading, setIsLoading] = useState(false);
  const initialState = {
    id: "",
    nombreP: "",
    cantidad: "",
    categoría: "",
  };

  const [user, setUser] = useState(initialState);

  //Función que se ejecuta al enviar el comentario
  const addgasto = () => {
    //valida que se llenen todos los campos
    if (!nombre) {
      toastRef.current.show("No has dado ninguna putuacion");
    } else {
      //si todos los datos son correctos
      setIsLoading(true);
      //recuperamos los datos del usuario logueado
      const user = firebase.auth().currentUser;
      /*creamos la estructura de los datos a almacenar sobre el comentario
    usuario, sucursal a la que pertenece el comentario, titulo, descripción,
    puntos y fecha de creación*/
      const datos = {
        idUser: user.uid,
        nombreP: nombre,
        cantidad: cantidad,
        categoria: categoria,
        createAt: state.creado,
      };

      //registramos los datos en la colección review
      db.collection("gasto")
        .add(datos)
        .then(() => {
          /*si se almacena el comentario, ejecutamos la actualización
 del raiting de la sucursal*/
          updateUser();
        })
        .catch(() => {
          toastRef.current.show("Error al enviar la review");
          setIsLoading(false);
        });
    }
  };
  //Función para actualizar puntos de la sucursal
  /* metodo actualizar */
  const updateUser = async () => {
    console.log(user);
    const dbRef = db.collection("presupuesto").doc(user.id);
    await dbRef.update({
      nombreP: nombre,
      cantidad: cantidad,
      categoria: categoria,
    });
    update(initialState);
  };

  return (
    <SafeAreaView style={styles.contenedor}>
      <View style={styles.contenedorBotones}>
        <Pressable
          onLongPress={() => {
            setModal(false);
            setGasto({});
          }}
          style={[styles.btn, styles.btnCancelar]}
        >
          <Text style={styles.btnTexto}>Cancelar</Text>
        </Pressable>

        {!!id && (
          <Pressable
            style={[styles.btn, styles.btnEliminar]}
            onLongPress={() => eliminarGasto(id)}
          >
            <Text style={styles.btnTexto}>Eliminar</Text>
          </Pressable>
        )}
      </View>

      <View style={styles.formulario}>
        <Text style={styles.titulo}>
          {gasto?.nombre ? "Editar Gasto" : "Nuevo Gasto"}
        </Text>

        <View style={styles.campo}>
          <Text style={styles.label}>Nombre Gasto</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre del gasto. ej. Comida"
            onChangeText={setNombre}
            value={nombre}
          />
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Cantidad Gasto</Text>
          <TextInput
            style={styles.input}
            placeholder="Cantidad del gasto. ej. 300"
            keyboardType="numeric"
            onChangeText={setCantidad}
            value={cantidad}
          />
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Categoría Gasto</Text>
          <Picker
            selectedValue={categoria}
            onValueChange={(valor) => {
              setCategoria(valor);
            }}
          >
            <Picker.Item label="-- Seleccione --" value="" />
            <Picker.Item label="Ahorro" value="ahorro" />
            <Picker.Item label="Comida" value="comida" />
            <Picker.Item label="Casa" value="casa" />
            <Picker.Item label="Gastos Varios" value="gastos" />
            <Picker.Item label="Ocio" value="ocio" />
            <Picker.Item label="Salud" value="salud" />
            <Picker.Item label="Suscripciones" value="suscripciones" />
          </Picker>
        </View>

        <Pressable
          style={styles.submitBtn}
          onPress={() =>
            handleGasto({ nombre, cantidad, categoria, id, fecha }, addgasto())
          }
        >
          <Text style={styles.submitBtnTexto}>
            {gasto?.nombre ? "Guardar Cambios Gasto" : "Agregar Gasto"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: "#1E40AF",
    flex: 1,
  },
  contenedorBotones: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btn: {
    padding: 10,
    marginTop: 30,
    marginHorizontal: 10,
    flex: 1,
  },
  btnCancelar: {
    backgroundColor: "#DB2777",
  },
  btnEliminar: {
    backgroundColor: "red",
  },
  btnTexto: {
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "#FFF",
  },
  formulario: {
    ...globalStyles.contenedor,
  },
  titulo: {
    textAlign: "center",
    fontSize: 28,
    marginBottom: 30,
    color: "#64748B",
  },
  campo: {
    marginVertical: 10,
  },
  label: {
    color: "#64748B",
    textTransform: "uppercase",
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#F5F5F5",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  submitBtn: {
    backgroundColor: "#3B82F6",
    padding: 10,
    marginTop: 20,
  },
  submitBtnTexto: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});

export default FormularioGasto;
