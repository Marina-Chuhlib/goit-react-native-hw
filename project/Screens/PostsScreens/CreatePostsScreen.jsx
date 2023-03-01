import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const CreatePostsScreen = () => {
    return (
      
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Text style={styles.headerText}>Создать публикацию</Text>
      </View>
      <View style={styles.fotoBox}>
        <View style={styles.icon}>
          <FontAwesome name="camera" size={20} color="#BDBDBD" />
        </View>
      </View>
      <Text style={styles.text}>Загрузите фото</Text>
      <View>
        <TextInput
          placeholderTextColor={"#BDBDBD"}
          placeholder="Название..."
          style={styles.input}
        ></TextInput>
        <TextInput
          placeholderTextColor={"#BDBDBD"}
          placeholder="Местность..."
          style={styles.input}
        ></TextInput>
      </View>
      <View style={styles.tabBarWrapper}></View>
      <TouchableOpacity style={styles.button} activeOpacity={0.8}>
        <Text style={styles.buttonText}>Опубликовать</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreatePostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
  fotoBox: {
    backgroundColor: "#F6F6F6",
    width: 343,
    height: 240,
    marginHorizontal: 21,
    marginTop: 32,
    alignItems: "center",
    justifyContent: "center",
  },
    icon: {
        width:60,
        height: 60,
        backgroundColor: "#ffff",
           alignItems: "center",
        justifyContent: "center",
    borderRadius: 50,
  },
  text: {
    marginLeft: 20,
    color: "#BDBDBD",
  },
  input: {
    marginTop: 32,
    borderBottomWidth: 1,
    marginHorizontal: 20,
    borderBottomColor: "#E8E8E8",
    paddingBottom: 8,
  },
  button: {
    marginHorizontal: 16,
    marginTop: 32,
    backgroundColor: "#F6F6F6",
    height: 61,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#BDBDBD",
  },
  //   tabBarWrapper: {
  //     marginTop: 570,
  //     alignItems: "center",
  //     height: 88,
  //     borderBottomWidth: 1,
  //     borderBottomColor: "#BDBDBD",
  //   },
});
