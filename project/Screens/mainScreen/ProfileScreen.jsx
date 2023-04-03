import {
  StyleSheet,
  View,
  FlatList,
  Image
} from "react-native";

import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import app from "../../firebase/config";
import {
  getFirestore,
  collection,
  where,
  getDocs,
} from "firebase/firestore";

const db = getFirestore(app);

const ProfileScreen = () => {
  const [userPosts, setUserPosts] = useState([]);
  const { userId } = useSelector((state) => state.auth);

  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserPosts = async () => {
    const citiesRef = await collection(db, "posts");

    const querySnapshot = await getDocs(
      citiesRef,
      where("userId", "==", "userId")
    );

    await querySnapshot.forEach((doc) => {

      setUserPosts((prevUserPosts) => [...prevUserPosts, { ...doc.data() }]);
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={userPosts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
      <Image source={{ uri: item.photo }} style={styles.post} />
          </View>
        )}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
paddingHorizontal:16,
  },
  headerWrapper: {
    justifyContent: "flex-end",
    alignItems: "center",
    height: 88,
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
  },
  headerText: {
    marginBottom: 11,
    fontSize: 17,
  },
  tabBarWrapper: {
    marginTop: 570,
    alignItems: "center",
    height: 88,
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
  },
    post: {
    marginTop: 32,
    height: 240,
    width: 370,
    borderRadius: 8,
  },
});
