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
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

import Stars from "../Components/Stars";

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
      {/* FlatList COMPONENT ALREADY CONTAIN A SCROLLVIEW */}

      <FlatList
        data={rooms}
        renderItem={({ item }) => {
          // console.log(item);
          return (
            <TouchableOpacity
              style={styles.annonce}
              onPress={() => {
                navigation.navigate("Room", { id: item._id });
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
                  <View>
                    <Stars item={item} />
                  </View>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  annonce: {
    justifyContent: "center",
    // borderWidth: 2,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  photos: {
    width: "100%",
    height: 250,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
