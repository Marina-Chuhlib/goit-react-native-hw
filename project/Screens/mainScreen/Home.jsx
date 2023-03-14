import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import DefaultScreenPosts from "../nestedScreens/DefaultScreenPosts";
import MapScreen from '../nestedScreens/MapScreen';

const NestedScreen = createStackNavigator();

const Home = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultScreen"
        component={DefaultScreenPosts}
        options={{ headerShown: false }}
      />
      <NestedScreen.Screen
        name="MapScreen"
        component={MapScreen}
      />
    </NestedScreen.Navigator>
  );
};
export default Home;
