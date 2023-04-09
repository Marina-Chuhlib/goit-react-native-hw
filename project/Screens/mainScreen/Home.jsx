import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import PostsScreen from "./PostsScreen";
import MapScreen from "../nestedScreens/MapScreen";
import CommentsScreen from "../nestedScreens/CommentsScreen";

const NestedScreen = createStackNavigator();

const Home = () => {
  console.log("hello")
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{ headerShown: false }}
      />
      <NestedScreen.Screen name="MapScreen" component={MapScreen} />
      <NestedScreen.Screen
        name="Комментарии"
        component={CommentsScreen}
        options={{ tabBarVisible: false ,headerShown: false}}
      />
    </NestedScreen.Navigator>
  );
};
export default Home;
