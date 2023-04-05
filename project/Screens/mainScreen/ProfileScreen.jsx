import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { EvilIcons } from "@expo/vector-icons";

import app from "../../firebase/config";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";

const db = getFirestore(app);

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
                    <Text>{item.comment}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Комментарии", { postId: item.id })
                    }
                  >
                    <EvilIcons name="comment" size={24} color="black" />
                  </TouchableOpacity>
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

    // borderColor: "red",
    // borderWidth: 1,
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
  user: {
    //  textAlign:"center",
  },
  name: {
    fontSize: 30,
  },
  postsList: {
    marginBottom: 170,
  },
  post: {
    height: 240,
    width: '100%',
    borderRadius: 8,
  },
});
