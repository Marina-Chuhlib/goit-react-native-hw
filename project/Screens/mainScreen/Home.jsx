import React from "react";

import { TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import { useNavigation } from "@react-navigation/native";

import PostsScreen from "./PostsScreen";
import MapScreen from "../nestedScreens/MapScreen";
import CommentsScreen from "../nestedScreens/CommentsScreen";

import { Feather } from "@expo/vector-icons";

const NestedScreen = createStackNavigator();

import { HomeTabs } from "../../router";

import { useRoute } from "@react-navigation/native";

const Home = ({ navigation }) => {
  //     const route = useRoute();
  // const screen = route.params?.prevScreen || 'UnknownScreen';

  function MyBackButton() {
    const navigation = useNavigation();
    return (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#212121" />
      </TouchableOpacity>
    );
  }

  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="Home"
        component={HomeTabs}
        options={{
          headerShown: false,
        }}
      />
      <NestedScreen.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          headerBackTitleVisible: false,
          headerTintColor: "#212121",
        }}
      />
      <NestedScreen.Screen
        name="Комментарии"
        component={CommentsScreen}
        options={{
          headerBackTitleVisible: false,
          headerTintColor: "#212121",
        }}

        // options={{
        //   headerLeft: () => (
        //     <TouchableOpacity
        //     >
        //       <Feather
        //         name="arrow-left"
        //         size={24}
        //         color=
        //         style={{ marginLeft: 16 }}
        //       />
        //     </TouchableOpacity>
        //   ),
        // }}
      />
    </NestedScreen.Navigator>
  );
};
export default Home;
