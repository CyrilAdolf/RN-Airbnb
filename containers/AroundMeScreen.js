import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  FlatList,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";

// DEFINE DIMENSION DEPENDING ON DEVICE
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function AroundMeScreen() {
  const [location, setLocation] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);
  const [markers, setMarkers] = useState();
  //   console.log("location : ", location);

  // REQUEST POUR OBTENIR LA GEOLOC DE L'UTILISATEUR
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }
      //   DEFINE "ELSE" WAY
      let location = await Location.getCurrentPositionAsync({});
      const obj = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      //   NOT NEEDED TO SET MY POSITION ON THE MAP
      // NEEDED TO CENTER THE MAP AND FOR THE NEXT REQUEST
      setLocation(obj);
      setIsLoading(false);
    })();
  }, []);

  // REQUEST TO ACCESS MARKER COORDINATES
  useEffect(() => {
    if (location) {
      const fetchData = async () => {
        let query = `?latitude=${location.latitude}&longitude=${location.longitude}`;

        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/around${query}`
        );
        let table = [];
        response.data.map((item, i) => {
          return table.push(item.location);
        });
        setMarkers(table);
        setIsLoading2(false);
      };
      fetchData();
    }
  }, [location]);
  return isLoading ? (
    <ActivityIndicator />
  ) : isLoading2 ? (
    <ActivityIndicator />
  ) : (
    <View style={styles.container}>
      <Text>This is the AroundMeScreen component</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        showsUserLocation={true}
      >
        {/* MARKERS STAND HERE */}
        {/* MARKERS STAND HERE */}
        {markers.map((marker, i) => {
          return (
            <MapView.Marker
              coordinate={{
                latitude: marker[1],
                longitude: marker[0],
              }}
              key={marker[0]}
              onPress={() => {
                console.log("OK");
                navigation.navigate("Room");
              }}
            />
          );
          //   console.log(marker);
        })}
        {/* MARKERS STAND HERE */}
        {/* MARKERS STAND HERE */}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    // SCREEN DIMENSION DEFINE BEFORE THE FUNCTION
    height: height,
    width: width,
  },
});
