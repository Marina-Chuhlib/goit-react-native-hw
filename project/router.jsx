import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { TouchableOpacity } from "react-native";

import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";
import PostsScreen from "./Screens/PostsScreens/PostsScreen";
import CreatePostsScreen from "./Screens/PostsScreens/CreatePostsScreen";
import ProfileScreen from "./Screens/PostsScreens/ProfileScreen";
import Home from "./Screens/PostsScreens/Home";

const MainStack = createStackNavigator();
const Tabs = createBottomTabNavigator();


const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <MainStack.Navigator initialRouteName="Login">
        <MainStack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ headerShown: "Registration" }}
        />
        <MainStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      </MainStack.Navigator>
    );
  }
  return (
    <Tabs.Navigator
      initialRouteName="Публикации"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarShowIcon: true,
        tabBarItemStyle: {
          borderTopColor: "#E5E5E5",
          borderTopWidth: 1,
        },
      }}
    >
      <Tabs.Screen
        name="Создать публикацию"
        component={CreatePostsScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Feather
                name="grid"
                size={24}
                color={focused ? "#FF6C00" : color}
              />
            );
          },
          tabBarIconStyle: {
            marginTop: 9,
          },
        }}
      />

      <Tabs.Screen
        name="Публикации"
        component={Home}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name="add" size={24} color={"#FFFFFF"} />;
          },
          tabBarIconStyle: {
            backgroundColor: "#FF6C00",
            width: 70,
            height: 40,
            borderRadius: 50,
            marginTop: 9,
          },

          headerRight: () => (
            <TouchableOpacity
              // onPress={() => navigation.navigate("Login")}
            >
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),

          headerStyle: {
            borderBottomColor: "#E5E5E5",
            borderBottomWidth: 1,
          },
          headerRightContainerStyle: {
            paddingRight: 15,
          },
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Feather
                name="user"
                size={24}
                color={focused ? "#FF6C00" : color}
              />
            );
          },
          tabBarIconStyle: {},
        }}
      />
    </Tabs.Navigator>
  );
};

export default useRoute;

