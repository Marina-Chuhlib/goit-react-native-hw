import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  FlatList,
} from "react-native";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import app from "../../firebase/config";
import {
  getFirestore,
  doc,
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";

const db = getFirestore(app);

const CommentsScreen = ({ route, navigation }) => {
  const { postId } = route.params;
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  const { userName } = useSelector((state) => state.auth);

  useEffect(() => {
    navigation.setOptions({ tabBarStyle: { display: "none" } });
    getAllPosts();
  }, []);

  const createPost = async () => {
    const docRef = await doc(db, "posts", postId);
  



    await addDoc(collection(docRef, "comments"),
      {
      comment,
      userName,
      postDate: new Date(),
    });

    navigation.navigate("DefaultScreen");
  };

  const getAllPosts = async () => {
    const docRef = await doc(db, "posts", postId);
    const querySnapshot = await getDocs(collection(docRef, "comments"));

    await querySnapshot.forEach((doc) => {
      // console.log(doc.data(), "data");
      // console.log(doc.post.date, "time")
      setAllComments((prevAllComment) => [
        ...prevAllComment,
        { ...doc.data(), id: doc.id },
      ]);
    });
  };



  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={allComments}
          renderItem={({ item }) => (
            <View style={styles.commentContainer}>
              <Text>{item.userName}</Text>
              <Text>{item.comment}</Text>
              {/* <Text>{item.postDate}</Text> */}
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>

      <TextInput
        placeholderTextColor={"#BDBDBD"}
        placeholder="Название..."
        style={styles.input}
        onChangeText={setComment}
      ></TextInput>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={createPost}
      >
        <Text style={styles.buttonText}>Опубликовать</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    // justifyContent: "flex-end",
  },
  commentContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    marginHorizontal: 10,
    padding: 10,
    marginBottom: 10,
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
  input: {
    marginTop: 32,
    borderBottomWidth: 1,
    // marginHorizontal: 20,
    borderBottomColor: "#E8E8E8",
    paddingBottom: 8,
  },
  button: {
    marginHorizontal: 25,
    marginTop: 32,
    marginBottom: 30,
    backgroundColor: "#F6F6F6",
    height: 61,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
