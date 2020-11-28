import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";

import { AntDesign, MaterialIcons, FontAwesome } from "@expo/vector-icons";

export default function ProfileScreen({ setToken, setId, token, id }) {
  // console.log("route : =>", route);

  // DEFINE STATES
  const [email, setEmail] = useState("");
  const [email2, setEmail2] = useState("");
  const [username, setUsername] = useState("");
  const [username2, setUsername2] = useState("");
  const [description, setDescription] = useState("");
  const [description2, setDescription2] = useState("");
  const [photo, setPhoto] = useState("");
  const [photo2, setPhoto2] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/user/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEmail(response.data.email);
        setEmail2(response.data.email);
        setUsername(response.data.username);
        setUsername2(response.data.username);
        setDescription(response.data.description);
        setDescription2(response.data.description);
        if (response.data.photo) {
          setPhoto(response.data.photo.url);
          setPhoto2(response.data.photo.url);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error.response.data);
        alert("Vos données n'ont pas pu être récupérées...");
      }
    };
    fetchData();
  }, []);

  const getPermissionAndCameraRollAccess = async () => {
    // ASK FOR AUTHORIZATION
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
    // console.log(status);
    //
    if (status === "granted") {
      // = IF PERMISSION GRANTED
      const result = await ImagePicker.launchImageLibraryAsync(); //OPEN THE LIBRARY
      console.log(result); // infos sur la photo sélectionnée (sauf si on annule)
      if (result.cancelled === false) {
        // PUCTURE IS SAVED WITH EXTENSION
        setPhoto2(result.uri);
      } else {
        alert("Pas de photo sélectionnée");
      }
    } else {
      alert("Permission refusée");
    }
  };

  const getPermissionAndCameraAccess = async () => {
    // ASK FOR AUTHORIZATION
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    console.log(status);

    if (status === "granted") {
      const result = await ImagePicker.launchCameraAsync(); //OPEN THE CAMERA
      console.log(result);

      if (!result.cancelled) {
        setPhoto(result.uri);
      } else {
        alert("Pas de photo sélectionnée");
      }
    } else {
      alert("Permission refusée");
    }
  };

  const updateProfile = async () => {
    const formData = new FormData();

    description2 !== description &&
      formData.append("description", description2);
    email2 !== email && formData.append("email", email2);
    username2 !== username && formData.append("username", username2);
    // console.log("formData :", formData);
    if (formData) {
      const token = await AsyncStorage.getItem("userToken");
      console.log(token);
      try {
        const response = await axios.put(
          "https://express-airbnb-api.herokuapp.com/user/update",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("response: " + response.data);
        alert("Vos données ont été mises à jour");
      } catch (error) {
        console.log(error);
        alert("Une erreur est survenue");
      }
    }
    // REQUEST FOR PICTURE
    try {
      if (photo2 !== photo) {
        const formPicture = new FormData();
        formPicture.append("photo", {
          uri: photo2,
          name: `userPhoto`,
          type: `image/${photo2.split(".")[1]}`,
        });
        // console.log("formPicture : ", formPicture);
        const response = await axios.put(
          "https://express-airbnb-api.herokuapp.com/user/upload_picture",
          formPicture,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert("Votre photo a été mise à jour");
      }
    } catch (error) {
      console.log(error.response);
      alert("Votre photo n'a pas été mise à jour");
    }
  };

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <View style={styles.container}>
      <View style={styles.horizontal}>
        <View style={styles.picture}>
          {photo2 ? (
            <Image source={{ uri: photo2 }} style={styles.picture} />
          ) : (
            <FontAwesome name="user" size={140} color="lightgrey" />
          )}
        </View>
        <View style={styles.icons}>
          {/* ACCESS TO PICTURE */}
          <TouchableOpacity onPress={getPermissionAndCameraRollAccess}>
            <AntDesign name="picture" size={24} color="black" />
          </TouchableOpacity>
          {/* ACCESS TO CAMERA */}
          {/* NOT AVAILABLE ON IOS SIMULATOR */}
          <TouchableOpacity onPress={getPermissionAndCameraAccess}>
            <MaterialIcons name="add-a-photo" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.formular}>
        {/* FORM */}
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            setEmail2(text);
          }}
          value={email2}
          placeholder="email"
        ></TextInput>
        <TextInput
          style={styles.input}
          onChangeText={(text) => {
            setUsername2(text);
          }}
          value={username2}
          placeholder="username"
        ></TextInput>
        <TextInput
          style={styles.inputDescription}
          onChangeText={(text) => {
            setDescription2(text);
          }}
          value={description2}
          placeholder="description"
          multiline={true}
          numberOfLines={4}
        ></TextInput>
      </View>
      <View>
        {/* BUTTON */}
        <TouchableOpacity onPress={updateProfile} style={styles.boutton}>
          <Text>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setToken(null);
            setId(null);
          }}
          style={styles.boutton}
        >
          <Text>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: "100%",
  },
  horizontal: {
    flexDirection: "row",
    alignItems: "center",
  },
  picture: {
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "salmon",
    borderRadius: 100,
    // marginRight: 10,
  },

  icons: {
    height: 100,
    width: 50,
    justifyContent: "space-around",
    marginLeft: 10,
  },
  formular: {
    height: "50%",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    height: 30,
    width: "60%",
    borderBottomColor: "salmon",
    borderBottomWidth: 3,
    alignItems: "center",
  },
  inputDescription: {
    borderColor: "salmon",
    borderWidth: 3,
    width: "60%",
    height: 120,
  },
  boutton: {
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    height: 50,
    borderColor: "salmon",
    borderWidth: 2,
    borderRadius: 25,
    marginBottom: 20,
  },
});
