import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  FlatList,
  Image,
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
  onSnapshot,
} from "firebase/firestore";

import { AntDesign } from "@expo/vector-icons";

const db = getFirestore(app);

const CommentsScreen = ({ route }) => {
  const { postId, photo } = route.params;
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);


  const { userName } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllPosts();
    console.log(allComments.length);
  }, []);

  const createPost = async () => {
    if (!comment.trim()) {
      Alert.alert("The comment can not be empty ");
      return;
    }
    const docRef = await doc(db, "posts", postId);

    await addDoc(collection(docRef, "comments"), {
      comment,
      userName,
      postDate: new Date(),
    });
    setComment("");
  };

  const getAllPosts = async () => {
    try {
      const docRef = await doc(db, "posts", postId);

      onSnapshot(collection(docRef, "comments"), (data) =>
        setAllComments(
          data.docs.map((doc) => ({
            ...doc.data(),
          }))
        )
      );
    

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.postWrapper}>
        <Image source={{ uri: photo }} style={styles.post} />

        <SafeAreaView style={styles.wrapper}>
          <FlatList
            data={allComments}
            renderItem={({ item }) => (
              <View style={styles.commentContainer}>
                <Text style={styles.userName}>{item.userName}</Text>
                <Text>{item.comment}</Text>
                {/* <Text>{item.postDate}</Text> */}
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
      </View>

      <TextInput
        placeholderTextColor={"#BDBDBD"}
        placeholder="Комментировать..."
        style={styles.input}
        value={comment}
        onChangeText={(value) => setComment(value)}
      ></TextInput>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={createPost}
      >
        <AntDesign name="arrowup" size={20} color="#FFFFFF" />
        {/* <Text style={styles.buttonText}>Опубликовать</Text> */}
      </TouchableOpacity>
      {/* <Text>{ allComments.length}</Text> */}
    </View>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  wrapper: {
    // borderColor: "red",
    // borderWidth: 1,
    height: 280,
  },
  commentContainer: {
    padding: 16,
    marginBottom: 24,
    borderRadius: 6,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderColor: "rgba(0, 0, 0, 0.03)",
    borderWidth: 1,
  },
  post: {
    height: 240,
    width: "100%",
    borderRadius: 8,
    marginBottom: 32,
  },
  input: {
    marginBottom: 16,
    padding: 16,
    height: 50,
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 18,
    color: "#212121",
    backgroundColor: "#F6F6F6",
    boxSizing: "border-box",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  userName: {
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
    fontSize: 13,
    lineHeight: 18,
    color: "#BDBDBD",
  },
  button: {
    position: "absolute",
    left: "84%",
    top: "85.5%",
    marginHorizontal: 25,
    marginTop: 32,
    marginBottom: 30,
    backgroundColor: "#FF6C00",
    height: 35,
    width: 35,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
