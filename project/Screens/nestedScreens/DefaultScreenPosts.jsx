import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { useSelector } from "react-redux";

import { Ionicons } from "@expo/vector-icons";

import app from "../../firebase/config";
import { getDocs, collection } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const db = getFirestore(app);

const DefaultScreenPosts = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  const { userName } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllPost();
  }, []);

  const getAllPost = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));

    await querySnapshot.forEach((doc) => {
      // console.log(doc.data(), "data");

      setPosts((prevPosts) => [...prevPosts, { ...doc.data(), id: doc.id }]);
      console.log(posts, "POSTS");
    });
  };

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
          <Text style={styles.email}>{}</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <Image source={{ uri: item.photo }} style={styles.post} />

            <View>
              <Text>{item.comment}</Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("MapScreen", { location: item.location })
                }
              >
                <Ionicons name="location-outline" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={() =>
                  navigation.navigate("CommentsScreen", { postId: item.id })
                }>
                <Text>Comment</Text>
              </TouchableOpacity>
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
    //  textAlign:"center",
  },
  post: {
    marginTop: 32,
    height: 240,
    width: 370,
    borderRadius: 8,
  },
});
