import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Entypo, FontAwesome } from "@expo/vector-icons";

// Containers
import HomeScreen from "./containers/HomeScreen";
import ProfileScreen from "./containers/ProfileScreen";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";
import RoomScreen from "./containers/RoomScreen";
import AroundMeScreen from "./containers/AroundMeScreen";

// Components
import Logo from "./Components/logo";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const setToken = async (token, id) => {
    if (token) {
      AsyncStorage.setItem("userToken", token);
      AsyncStorage.setItem("userId", id);
      setUserToken(token);
      setUserId(id);
    } else {
      AsyncStorage.removeItem("userToken");
      AsyncStorage.removeItem("userId");
      setUserToken(null);
      setUserId(null);
    }
  };

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem("userToken");

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setIsLoading(false);
      setUserToken(userToken);
    };

    bootstrapAsync();
  }, []);

  return (
    <NavigationContainer>
      {isLoading ? null : userToken === null ? ( // We haven't finished checking for the token yet
        // No token found, user isn't signed in
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            options={{ header: () => null, animationEnabled: false }}
          >
            {(props) => <SignInScreen {...props} setToken={setToken} />}
            {/* setToken IS NOT PASS THROUGH PARAMS KEY (IN ROUTE) BUT IN A THIRD OBJ IN PROPS , ALSO EXPLAIN WHY WE DESCRUTURE IT */}
          </Stack.Screen>
          <Stack.Screen name="SignUp">
            {() => <SignUpScreen setToken={setToken} />}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        // User is signed in
        <Stack.Navigator>
          <Stack.Screen
            name="Tab"
            options={{ header: () => null, animationEnabled: false }}
          >
            {(props) => (
              <Tab.Navigator
                tabBarOptions={{
                  activeTintColor: "tomato",
                  inactiveTintColor: "gray",
                }}
              >
                {/* TAB HOME*/}
                {/* TAB HOME*/}

                <Tab.Screen
                  name="Home"
                  options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name={"ios-home"} size={size} color={color} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Home"
                        options={{
                          // Logo
                          headerTitle: (props) => <Logo {...props} />,
                          // Logo
                          headerStyle: { backgroundColor: "white" },
                          headerTitleStyle: { color: "white" },
                        }}
                      >
                        {() => <HomeScreen />}
                      </Stack.Screen>
                      <Stack.Screen name="Room">
                        {(props) => <RoomScreen {...props} />}
                      </Stack.Screen>

                      <Stack.Screen
                        name="Profile"
                        options={{
                          title: "User Profile",
                        }}
                      >
                        {() => <ProfileScreen />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                {/* TAB AROUND ME */}
                {/* TAB AROUND ME */}
                <Tab.Screen
                  name="AroundMe"
                  options={{
                    tabBarLabel: "Around me",
                    tabBarIcon: ({ color, size }) => (
                      <Entypo name="location" size={24} color="black" />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="AroundMe"
                        options={{
                          title: "AroundMe",
                          tabBarLabel: "Around me",
                        }}
                      >
                        {() => <AroundMeScreen {...props} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>

                {/* TAB Profile */}
                {/* TAB Profile */}
                <Tab.Screen
                  name="Profile"
                  options={{
                    tabBarLabel: "My profile",
                    tabBarIcon: ({ color, size }) => (
                      <FontAwesome name="user" size={24} color="black" />
                    ),
                  }}
                >
                  {(props) => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Profile"
                        options={{ title: "Profile", tabBarLabel: "Profile" }}
                      >
                        {() => (
                          <ProfileScreen
                            setToken={setToken}
                            setId={setId}
                            token={userToken}
                            id={userId}
                            {...props}
                          />
                        )}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
