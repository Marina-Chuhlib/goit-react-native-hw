import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";

import { useState } from "react";
import { useSelector } from "react-redux";

import app from "../../firebase/config";
import { getFirestore } from "firebase/firestore";
import { doc, collection, addDoc } from "firebase/firestore";

const db = getFirestore(app);

const CommentsScreen = ({ route }) => {
  const { postId } = route.params;
  const [comment, setComment] = useState("");

  const { userName } = useSelector((state) => state.auth);

  const createPost = async () => {
    const docRef = await doc(db, "posts", postId);
    await addDoc(collection(docRef, "comments"), {
      comment,
      userName,
    });
  };

  return (
    <View style={styles.container}>
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
    justifyContent: "flex-end",
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
