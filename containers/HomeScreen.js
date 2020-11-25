import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { ActivityIndicator } from "react-native";

export default function HomeScreen() {
  const navigation = useNavigation();

  const [rooms, setRooms] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://express-airbnb-api.herokuapp.com/rooms"
      );
      setRooms(response.data);
      // console.log(response.data[0]);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <SafeAreaView>
      {/* <ScrollView> */}
      <View>{/* LOGO */}</View>

      <FlatList
        data={rooms}
        renderItem={({ item }) => {
          // console.log(item);
          return (
            <TouchableOpacity
              style={styles.annonce}
              onPress={() => {
                navigation.navigate("Room");
              }}
            >
              <Image
                source={{ uri: item.photos[0].url }}
                style={styles.photos}
                resizeMode="contain"
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text>{item.title}</Text>
                  <Text>{item.ratingValue} Star(s)</Text>
                  {/* AJOUTER CONDITION POUR AFFICHER DES ICONES EN FONCTION DE LA NOTE */}
                </View>
                <View>
                  <Image
                    source={{ uri: item.user.account.photo.url }}
                    style={styles.avatar}
                    resizeMode="contain"
                  />
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item._id}
      />

      <Button
        title="Go to Profile"
        onPress={() => {
          navigation.navigate("Profile", { userId: 123 });
        }}
      />
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  annonce: {
    justifyContent: "center",
    borderColor: "green",
    borderWidth: 2,
  },
  photos: {
    // width: 250,
    height: 250,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
