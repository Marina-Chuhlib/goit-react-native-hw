import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Button } from "react-native";

import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";
import PostsScreen from "./Screens/PostsScreens/PostsScreen";
import CreatePostsScreen from "./Screens/PostsScreens/CreatePostsScreen";
import ProfileScreen from "./Screens/PostsScreens/ProfileScreen";

const MainStack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const useRoute = (isAuth) => {
  console.log(isAuth)
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
        <MainStack.Screen
          name="Публикации"
          component={PostsScreen}
          options={{ headerShown: false }}
        />
      </MainStack.Navigator>
    );
  }
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarShowIcon: true,
        tabBarItemStyle: {
          height: 83,

        }
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
                size={40}
                color={focused ? "#FF6C00" : color}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="Публикации"
        component={PostsScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name="add" size={24} color={"#FFFFFF"} />;
          },
          tabBarIconStyle: {
            backgroundColor: "#FF6C00",
            width: 70,
            height: 40,
            borderRadius: 50,

          },
               headerRight: () => (
           <Feather name="log-out" size={24} color="black" />
            ),

        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
             <Feather name="user" size={24} color={focused ? "#FF6C00" : color}/>
            );
          },
        }}
      />
    </Tabs.Navigator>
  );
};

export default useRoute;
