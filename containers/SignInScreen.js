import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// IMPORT AXIOS
const axios = require("axios");

export default function SignInScreen({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // AXIOS REQUEST
  // AXIOS REQUEST
  const handleSubmit = async () => {
    if (email !== "" || password !== "") {
      try {
        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/log_in",
          { email: email, password: password },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("1", response.data);
        // GET TOKEN AN UPDATE IT
        // GET TOKEN AN UPDATE IT
        setToken(response.data.token);
        // GET TOKEN AN UPDATE IT
        // GET TOKEN AN UPDATE IT
      } catch (error) {
        console.log("error : ", error.response.data);
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

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <KeyboardAwareScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.form}>
          {/* AIRBNB LOGO */}
          <View style={{ alignItems: "center" }}>
            <Image source={require("../assets/logo.png")} style={styles.img} />
            <Text style={{ fontSize: 30 }}>Sign In</Text>
          </View>
          <Text>Name: </Text>
          <TextInput
            placeholder="Email"
            onChangeText={(text) => {
              setEmail(text);
            }}
            style={styles.input}
          />
          <Text>Password: </Text>
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => {
              setPassword(text);
            }}
            style={styles.input}
          />
          <TouchableOpacity
            style={styles.button}
            title="Sign in"
            onPress={() => {
              handleSubmit();
              //
              // Move this in handleSubmit:
              // const userToken = "secret-token";
              // setToken(userToken);
            }}
          >
            <Text>Sign in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text>Create an account</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  safeAreaView: {
    backgroundColor: "#fff",
    flex: 1,
  },
  form: {
    alignItems: "center",
    justifyContent: "space-around",
    flex: 1,
    // marginVertical: 50,
  },
  input: {
    height: 40,
    width: 250,
    borderBottomWidth: 2,
    borderBottomColor: "pink",
  },
  img: {
    height: 150,
    width: 150,
  },
  button: {
    borderWidth: 4,
    borderColor: "pink",
    height: 40,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    width: 200,
  },
});
