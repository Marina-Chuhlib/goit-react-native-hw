import { useState, useEffect, useCallback } from "react";
import { Alert } from "react-native";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { useSelector } from "react-redux";

import { Ionicons, Feather } from "@expo/vector-icons";

import app from "../../firebase/config";
import {
  getFirestore,
  getDocs,
  collection,
  onSnapshot,
} from "firebase/firestore";

SplashScreen.preventAutoHideAsync();

const db = getFirestore(app);

const DefaultScreenPosts = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const { userName, userEmail } = useSelector((state) => state.auth);

  const [fontsLoaded] = useFonts({
    RobotoRegular: require("../../assets/fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("../../assets/fonts/Roboto-Medium.ttf"),
    RobotoBold: require("../../assets/fonts/Roboto-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    getAllPost();
  }, []);

  const getAllPost = async () => {
    try {
      await onSnapshot(collection(db, "posts"), (snapshots) => {
        setPosts(snapshots.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
      // const querySnapshot = await getDocs(collection(db, "posts"));

      // await querySnapshot.forEach((doc) => {
      //   setPosts((prevPosts) => [...prevPosts, { ...doc.data(), id: doc.id }]);
      // });
    } catch (error) {
      console.log(error.massage);
      Alert.alert("Try again");
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <View style={styles.imgBox}>
          <Image
            style={styles.avatar}
            source={require("../../assets/image/avatar.png")}
          />
        </View>
        <View style={styles.user}>
          <Text style={styles.name}>{userName}</Text>
          <Text style={styles.email}>{userEmail}</Text>
        </View>
      </View>
      {/* {posts.length===0 && <Text style={styles.name}>Создать публикацию</Text>} */}
      <FlatList
        data={posts}
        keyExtractor={(item, index) => {
          index.toString();
          console.log(item.location.longitude);
        }}
        renderItem={({ item }) => (
          <View>
            <Image source={{ uri: item.photo }} style={styles.post} />

            <View>
              <Text style={styles.title}>{item.comment}</Text>
            </View>

            <View style={styles.box}>
              <View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Комментарии", { postId: item.id })
                  }
                >
                  <Feather name="message-circle" size={24} color="#BDBDBD" />
                </TouchableOpacity>
              </View>

              <View style={styles.wrapperLocation}>
                <TouchableOpacity
                  style={styles.location}
                  onPress={() =>
                    navigation.navigate("MapScreen", {
                      location: item.location,
                    })
                  }
                >
              <Ionicons name="location-outline" size={24} color="#BDBDBD" />
               
                  {/* <View style={styles.locationName}>
                    <Text >
                    {item.location.longitude}
                  </Text>
                  </View> */}
              
                </TouchableOpacity>
                           <Text >
                    {item.location.longitude}
                  </Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default DefaultScreenPosts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 15,


  },
  userInfo: {
    flexDirection: "row",
    marginTop: 32,
    height: 60,
    alignItems: "center",
    marginBottom: 32,

    // borderColor: "red",
    // borderWidth: 1,
  },
  imgBox: {
    width: 60,
    height: 60,
    backgroundColor: "#E8E8E8",
    marginRight: 8,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  user: {
    // borderColor: "red",
    // borderWidth: 1,
  },
  name: {
    fontFamily: "RobotoBold",
    fontStyle: "normal",
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },
  email: {
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
    fontSize: 11,
    lineHeight: 13,
    color: "#212121",
  },
  post: {
  height: 240,
    width: '100%',
    borderRadius: 8,
  },
  box: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    marginTop: 8,
    marginBottom: 8,
    fontFamily: "RobotoMedium",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  wrapperLocation: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",

    // borderColor: "red",
    // borderWidth: 1,
  },
  location: {
    alignItems: "center",
    marginBottom: 8,
    fontFamily: "RobotoMedium",
    fontStyle: "normal",
    fontSize: 50,
    lineHeight: 19,
    color: "#212121",
    marginLeft: 30,
  },
  // locationName: {
  //     display: "flex",
  //   flexDirection: "row",
  // },
});
