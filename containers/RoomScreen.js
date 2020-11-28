import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";

// REQUEST NEEDED
import axios from "axios";

// DISPLAY MAP
import MapView from "react-native-maps";

export default function Room({ route }) {
  // STATES
  const [isLoading, setIsLoading] = useState(true);
  const [room, setRoom] = useState();

  // EXTRACT ID FROM PARAMS
  const id = route.params.id;

  // FETCHDATA
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${id}`
        );
        setRoom(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, []);

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <View style={styles.container}>
      {/* IMPLEMENT PACKAGE FOR PICTURES */}
      {/* IMPLEMENT PACKAGE FOR PICTURES */}
      <FlatList
        data={room.photos}
        renderItem={({ item }) => {
          return (
            <Image
              source={{ uri: item.url }}
              style={styles.photos}
              resizeMode="contain"
            />
          );
        }}
        keyExtractor={(item) => item.picture_id}
        horizontal={true}
        style={styles.flatList}
      />
      <Text numberOfLines={3}>{room.description}</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: room.location[1],
          longitude: room.location[0],
          latitudeDelta: 0.08,
          longitudeDelta: 0.08,
        }}
      >
        <MapView.Marker
          coordinate={{
            latitude: room.location[1],
            longitude: room.location[0],
            latitudeDelta: 0.08,
            longitudeDelta: 0.08,
          }}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  photos: {
    height: 250,
    // DEFINIR LES DIMENSIONS A PARTIR DU COMPONENT DIM
    width: 400,
    backgroundColor: "white",
  },
  flatList: {
    height: 200,
    marginTop: 30,
  },
  map: {
    // flex: 1,
    height: 300,
    width: "100%",
    marginTop: 20,
    borderTopColor: "grey",
    borderTopWidth: 8,
    backgroundColor: "yellow",
  },
});
