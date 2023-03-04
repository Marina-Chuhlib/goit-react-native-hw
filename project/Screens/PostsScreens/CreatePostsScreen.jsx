import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";

import { Camera } from "expo-camera";

import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const CreatePostsScreen = ({ navigation }) => {
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState("");

  const takePhoto = async () => {
    const photo = await cameraRef.takePictureAsync();
    setPhoto(photo.uri);
    console.log(photo.uri);
  };

  const sendPhoto = () => {
    navigation.navigate("Публикации",{photo})
    console.log(navigation);
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.fotoBox}> */}
      <Camera style={styles.camera} ref={setCameraRef}>
        {photo && (
          <View style={styles.previewPhotoContainer}>
            <Image
              source={{ uri: photo }}
              style={{ height: 100, width: 100 }}
            />
            {/* <Image
              source={require("../../assets/image/photo.jpg")}
              style={styles.previewPhoto}
            /> */}
          </View>
        )}
        <TouchableOpacity style={styles.icon} onPress={takePhoto}>
          <FontAwesome name="camera" size={20} color="#BDBDBD" />
        </TouchableOpacity>
      </Camera>

      {/* <TouchableOpacity style={styles.icon}>
          <FontAwesome name="camera" size={20} color="#BDBDBD" />
        </TouchableOpacity> */}
      {/* </View> */}
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
        >
          <Ionicons name="location-outline" size={24} color="#BDBDBD" />
        </TextInput>
      </View>
      <View style={styles.tabBarWrapper}></View>
      {photo ? (
        <TouchableOpacity
          style={styles.buttonActive}
          activeOpacity={0.8}
          onPress={sendPhoto}
        >
          <Text style={styles.buttonTextActive}>Опубликовать</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={sendPhoto}
        >
          <Text style={styles.buttonText}>Опубликовать</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CreatePostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    // marginHorizontal:16
    paddingHorizontal: 16,
  },
  camera: {
    // width: 343,
    height: 240,
    // marginHorizontal: 16,
    borderRadius: 8,
    marginTop: 32,
    alignItems: "center",
    justifyContent: "center",
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
    // marginHorizontal: 21,
    marginTop: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 60,
    height: 60,
    // backgroundColor: "#ffff",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    zIndex: 1,
  },
  previewPhotoContainer: {
    position: "absolute",
    marginTop: 32,
    marginHorizontal: 16,
  },
  previewPhoto: {
    height: 240,
    // height:"70%",
    // width: 358,
    width: "100%",
    borderRadius: 8,
  },
  text: {
    // marginLeft: 20,
    color: "#BDBDBD",
  },
  input: {
    marginTop: 32,
    borderBottomWidth: 1,
    // marginHorizontal: 20,
    borderBottomColor: "#E8E8E8",
    paddingBottom: 8,
  },
  button: {
    // marginHorizontal: 16,
    marginTop: 32,
    backgroundColor: "#F6F6F6",
    height: 61,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonActive: {
    marginTop: 32,
    backgroundColor: "#FF6C00",
    height: 61,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#BDBDBD",
  },
  buttonTextActive: {
    color: "#fff",
  },

  //   tabBarWrapper: {
  //     marginTop: 570,
  //     alignItems: "center",
  //     height: 88,
  //     borderBottomWidth: 1,
  //     borderBottomColor: "#BDBDBD",
  //   },
});
