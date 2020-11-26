import React, { useState } from "react";
import {
  Button,
  Text,
  TextInput,
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// IMPORT AXIOS
const axios = require("axios");

export default function SignUpScreen({ setToken }) {
  //
  // STATE FOR FORM INPUTS
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  // AXIOS REQUEST
  const handleSubmit = async () => {
    if (
      email !== "" ||
      username !== "" ||
      description !== "" ||
      password !== "" ||
      password2 === password
    ) {
      // REQUEST
      console.log("envoi de la requete");
      try {
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/sign_up",
          {
            email: email,
            username: username,
            description: description,
            password: password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        // PROBABLY UPDATE TOKEN HERE, DEPNEDING ON THE RESPONSE.DATA
        // PROBABLY UPDATE TOKEN HERE, DEPNEDING ON THE RESPONSE.DATA
        setToken(response.data.token);
        // PROBABLY UPDATE TOKEN HERE, DEPNEDING ON THE RESPONSE.DATA
        // PROBABLY UPDATE TOKEN HERE, DEPNEDING ON THE RESPONSE.DATA
      } catch (error) {
        console.log("msg :", error.response);
      }
    } else {
      Alert.alert(
        "Empty input(s)",
        "Please fill in the form",
        [
          // {
          //   text: "Cancel",
          //   onPress: () => console.log("Cancel Pressed"),
          //   style: "cancel",
          // },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <SafeAreaView style={styles.page}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flex: 1, backgroundColor: "white" }}
      >
        {/* LOGO */}
        <View>
          <Image source={require("../assets/logo.png")} style={styles.image} />
          <Text>Sign up</Text>
        </View>
        {/* FORM */}
        <View style={styles.form}>
          <TextInput
            placeholder="Email"
            onChangeText={(text) => {
              setEmail(text);
            }}
            style={styles.input}
          />
          <TextInput
            placeholder="Username"
            onChangeText={(text) => {
              setUsername(text);
            }}
            style={styles.input}
          />
          <TextInput
            multiline={true}
            numberOfLines={4}
            placeholder="Describe yourself in a few words..."
            onChangeText={(text) => {
              setDescription(text);
            }}
            style={styles.textArea}
            // MODIFY TO ADD LINES AND BORDER
          />
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => {
              setPassword(text);
            }}
          />

          <TextInput
            placeholder="Confirm password"
            // secureTextEntry={true}
            onChangeText={(text) => {
              setPassword2(text);
            }}
          />
          <TouchableOpacity
            onPress={async () => {
              handleSubmit();
              // const userToken = "secret-token";
              // setToken(userToken);
            }}
            style={styles.button}
          >
            <Text>Sign up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 50,
    width: 50,
  },
  page: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  form: {
    height: 400,
    // backgroundColor: "red",
    justifyContent: "space-between",
  },
  input: {
    borderBottomColor: "pink",
    borderBottomWidth: 1,
  },
  textArea: {
    borderWidth: 2,
    borderColor: "pink",
    height: 100,
  },
  button: {
    borderWidth: 4,
    borderColor: "pink",
    height: 40,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
