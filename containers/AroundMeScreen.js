import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";

// DEFINE DIMENSION DEPENDING ON DEVICE
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default function AroundMeScreen({ navigation, route }) {
  // console.log(route);
  //  STATES
  const [location, setLocation] = useState();
  const [errorMsg, setErrorMsg] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);
  const [markers, setMarkers] = useState();

  // REQUEST TO ASK FOR LOCALISATION AUTHORIZATION
  useEffect(() => {
    const authorizationLoc = async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }
      let location = await Location.getCurrentPositionAsync({});
      const obj = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      // INFO NOT NEEDED TO SET MY POSITION ON THE MAP
      // BUT NEEDED TO CENTER THE MAP AND FOR THE NEXT REQUEST

      setLocation(obj);
      setIsLoading(false);
    };
    authorizationLoc();
  }, []);

  // REQUEST TO ACCESS MARKER COORDINATES **AND ID**
  useEffect(() => {
    if (location) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${location.latitude}&longitude=${location.longitude}`
          );
          let table = [];
          response.data.map((item, i) => {
            return table.push(item);
          });
          setMarkers(table);
          setIsLoading2(false);
        } catch (error) {
          console.log(error.message);
        }
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
        {markers.map((marker, i) => {
          return (
            <MapView.Marker
              coordinate={{
                latitude: marker.location[1],
                longitude: marker.location[0],
              }}
              key={marker._id}
              onPress={() => {
                navigation.navigate("Room", { id: marker._id });
              }}
            />
          );
        })}
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
