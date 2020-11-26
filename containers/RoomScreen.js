import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import axios from "axios";
import { ActivityIndicator } from "react-native";
import MapView from "react-native-maps";

export default function Room(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [room, setRoom] = useState();
  const id = props.route.params.id;
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

      {/* LIMITER A 3 LIGNES */}
      {/* LIMITER A 3 LIGNES */}
      <Text>{room.description}</Text>
      {/* DISPLAY MAP HERE */}
      {/* DISPLAY MAP HERE */}
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
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  photos: {
    height: 250,
    // DEFINIR LES DIMENSIONS A PARTIR DU COMPONENT DIM
    width: 400,
    backgroundColor: "white",
  },
  flatList: {
    // borderColor: "black",
    // borderWidth: 2,
    // height: 250,
    marginBottom: 20,
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
