import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  Linking,
  TouchableOpacity,
} from "react-native";

function Favoritos() {
  return (
    <>
      <ScrollView>
        <ScrollView>
          <View style={{ flexDirection: "row" }}>
            <Image
              style={styles.banner}
              source={require("../../assets/img/aplicaciones_1_0.jpg")}
            />
          </View>

          <View style={styles.contenedor}>
            <Text style={styles.titulo}>Algunos de nuestros proyectos.</Text>
            <ScrollView horizontal>
              <View>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(
                      "https://confident-shockley-89972e.netlify.app/"
                    )
                  }
                >
                  <Image
                    style={styles.ciudad}
                    source={require("../../assets/img/app1.jpg")}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <Image
                  style={styles.ciudad}
                  source={require("../../assets/img/fit.jpg")}
                />
              </View>
              <View>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(
                      "https://ecstatic-poincare-9270e4.netlify.app/"
                    )
                  }
                >
                  <Image
                    style={styles.ciudad}
                    source={require("../../assets/img/app3.jpg")}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <Image
                  style={styles.ciudad}
                  source={require("../../assets/img/finance.png")}
                />
              </View>
              <View>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(
                      "https://hopeful-archimedes-9328ea.netlify.app/"
                    )
                  }
                >
                  <Image
                    style={styles.ciudad}
                    source={require("../../assets/img/app4.jpg")}
                  />
                </TouchableOpacity>
              </View>
            </ScrollView>

            <Text style={styles.titulo}>Los Mejores Alojamientos</Text>
            <View>
              <View>
                <Image
                  style={styles.mejores}
                  source={require("../../assets/img/host1.jpg")}
                />
              </View>
              <View>
                <Image
                  style={styles.mejores}
                  source={require("../../assets/img/hosting.jpg")}
                />
              </View>
              <View>
                <Image
                  style={styles.mejores}
                  source={require("../../assets/img/hostmex.jpg")}
                />
              </View>
            </View>

            <Text style={styles.titulo}>Poniendo la tecnología al alcance de todos</Text>

            <View style={styles.listado}>
              <View style={styles.listadoItem}>
                <Image
                  style={styles.mejores}
                  source={require("../../assets/img/fig1.jpg")}
                />
              </View>
              <View style={styles.listadoItem}>
                <Image
                  style={styles.mejores}
                  source={require("../../assets/img/fig2.jpg")}
                />
              </View>
              <View style={styles.listadoItem}>
                <Image
                  style={styles.mejores}
                  source={require("../../assets/img/fig3.jpg")}
                />
              </View>
              <View style={styles.listadoItem}>
                <Image
                  style={styles.mejores}
                  source={require("../../assets/img/fig4.png")}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  banner: {
    height: 250,
    flex: 1,
  },
  titulo: {
    fontWeight: "bold",
    fontSize: 24,
    marginVertical: 20,
  },
  contenedor: {
    marginHorizontal: 10,
  },
  ciudad: {
    width: 250,
    height: 350,
    marginRight: 10,
  },
  mejores: {
    width: "100%",
    height: 200,
    marginVertical: 5,
  },
  listado: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  listadoItem: {
    flexBasis: "49%",
  },
});

export default Favoritos;
