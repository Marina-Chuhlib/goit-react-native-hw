import { useCallback } from "react";

import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { Feather, Ionicons } from "@expo/vector-icons";

import app from "../../firebase/config";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";

const db = getFirestore(app);

SplashScreen.preventAutoHideAsync();

const ProfileScreen = ({ navigation }) => {
  const [userPosts, setUserPosts] = useState([]);
  const { userId, userName, userEmail } = useSelector((state) => state.auth);


  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserPosts = async () => {
    await onSnapshot(collection(db, "posts"), (snapshots) => {
      setUserPosts(
        snapshots.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
    // const citiesRef = await collection(db, "posts");

    // const querySnapshot = await getDocs(
    //   citiesRef,
    //   where("userId", "==", "userId")
    // );

    // await querySnapshot.forEach((doc) => {

    //   setUserPosts((prevUserPosts) => [...prevUserPosts, { ...doc.data() }]);
    // });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/image/photo-BG-2x.jpg")}
        style={styles.image}
      >
        <View style={styles.wrapper}>
          <View style={styles.userInfo}>
            <View style={styles.imgBox}>
              <Image
                style={styles.avatar}
                source={require("../../assets/image/avatar.png")}
              />
            </View>
            <View style={styles.user}>
              <Text style={styles.name}>{userName}</Text>
              {/* <Text style={styles.email}>{userEmail}</Text> */}
            </View>
          </View>
          <View style={styles.postsList}>
            <FlatList
              data={userPosts}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View>
                  <Image source={{ uri: item.photo }} style={styles.post} />
                  <View>
                    <Text style={styles.title}>{item.comment}</Text>
                  </View>
                  <View style={styles.box}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("Комментарии", { postId: item.id })
                      }
                    >
                      <Feather
                        name="message-circle"
                        size={24}
                        color="#BDBDBD"
                      />
                    </TouchableOpacity>

                    <View style={styles.wrapperLocation}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("MapScreen", {
                            location: item.location,
                          })
                        }
                      >
                        <Ionicons
                          name="location-outline"
                          size={24}
                          color="#BDBDBD"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("MapScreen", {
                            location: item.location,
                          })
                        }
                      >
                        <Text style={styles.locationName}>
                          {item.locationName}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  wrapper: {
    marginTop: 250,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,

    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,

    //  borderColor: "red",
    //   borderWidth: 1,
  },

  userInfo: {
    flexDirection: "row",
    marginTop: 32,
    height: 100,
    alignItems: "center",
    justifyContent: "center",

    // borderColor: "red",
    // borderWidth: 2,
  },
  imgBox: {
    position: "absolute",
    left: "35%",
    top: "-100%",
    width: 120,
    height: 120,
    backgroundColor: "#E8E8E8",
    marginRight: 8,
    borderRadius: 16,
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  name: {
    fontFamily: "RobotoMedium",
    fontStyle: "normal",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
  },
  postsList: {
    marginBottom:120,
  },
  post: {
    height: 240,
    width: "100%",
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
  },
  location: {
    fontFamily: "RobotoMedium",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  locationName: {
   marginLeft:4,
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    textDecorationLine: "underline"
  }
});
