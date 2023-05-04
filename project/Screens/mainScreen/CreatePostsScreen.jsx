import { Camera } from "expo-camera";
import * as Location from "expo-location";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";

import { FontAwesome, Ionicons, Feather } from "@expo/vector-icons";

import db from "../../firebase/config";
import app from "../../firebase/config";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const storage = getStorage(db);

const cloudDB = getFirestore(app);

const CreatePostsScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState("");
  const [comment, setComment] = useState("");
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState("");

  const { userId, userName } = useSelector((state) => state.auth);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();

    navigation.setOptions({ tabBarStyle: { display: "none" } });
  }, []);

  const takePhoto = async () => {
    try {
      const photo = await cameraRef.takePictureAsync();
      setPhoto(photo.uri);
      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      setLocation(coords);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);

    const file = await response.blob();

    const uniquePostId = Date.now().toString();
    const storageRef = ref(storage, `postImage/${uniquePostId}`);

    const data = await uploadBytes(storageRef, file);

    const getStorageRef = await getDownloadURL(storageRef);
    // console.log(getStorageRef, "getStorageRef");

    return getStorageRef;
  };

  const uploadPostToServer = async () => {
    try {
      const photo = await uploadPhotoToServer();
      await addDoc(collection(cloudDB, "posts"), {
        photo,
        comment,
        location,
        locationName,
        userId,
        userName,
      });
    } catch (error) {
      console.log(error.massage);
    }
  };

  const removeFields = () => {
    setComment("");
    setPhoto("");
    setLocationName("");
  };

  const sendPhoto = () => {
    if (!photo) {
      Alert.alert("Загрузите фото");
      return;
    }
    uploadPostToServer();
    removeFields();
    navigation.navigate("Home");
  };

  const deletePhoto = () => {
    removeFields();
  };

  return (
    <>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View
            style={{
              ...styles.postWrapper,

              marginBottom: isShowKeyboard ? 100 : 0,
            }}
          >
            <ScrollView>
              <Camera style={styles.camera} ref={setCameraRef}>
                {photo && (
                  <View style={styles.previewPhotoContainer}>
                    <Image
                      source={{ uri: photo }}
                      style={{ height: 100, width: 100 }}
                    />
                  </View>
                )}
                <TouchableOpacity style={styles.icon} onPress={takePhoto}>
                  <FontAwesome name="camera" size={20} color="#BDBDBD" />
                </TouchableOpacity>
              </Camera>
              {photo ? (
                <Text style={styles.text}>Редактировать фото</Text>
              ) : (
                <Text style={styles.text}>Загрузите фото</Text>
              )}
              <View>
                <TextInput
                  placeholderTextColor={"#BDBDBD"}
                  placeholder="Название..."
                  style={styles.input}
                  value={comment}
                  onChangeText={(value) => setComment(value)}
                  onBlur={keyboardHide}
                  onFocus={() => setIsShowKeyboard(true)}
                ></TextInput>

                <TextInput
                  placeholderTextColor={"#BDBDBD"}
                  placeholder="Местность..."
                  style={styles.inputLocation}
                  value={locationName}
                  onChangeText={(value) => setLocationName(value)}
                  onBlur={keyboardHide}
                  onFocus={() => setIsShowKeyboard(true)}
                ></TextInput>
                <TouchableOpacity
                  style={styles.locationBtn}
                  onPress={() =>
                    navigation.navigate("MapScreen", {
                      location: location.coords,
                    })
                  }
                >
                  <Ionicons name="location-outline" size={24} color="#BDBDBD" />
                </TouchableOpacity>
              </View>
              <View style={styles.tabBarWrapper}></View>
              {photo ? (
                <TouchableOpacity
                  // style={styles.buttonActive}
                  style={{
                    ...styles.buttonActive,
                    marginTop: isShowKeyboard ? 30 : 120,
                  }}
                  activeOpacity={0.8}
                  onPress={sendPhoto}
                >
                  <Text style={styles.buttonTextActive}>Опубликовать</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  // style={styles.button}
                  style={{
                    ...styles.button,
                    marginTop: isShowKeyboard ? 30 : 120,
                  }}
                  activeOpacity={0.8}
                  onPress={sendPhoto}
                >
                  <Text style={styles.buttonText}>Опубликовать</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                // style={styles.deleteBtn}
                style={{
                  ...styles.deleteBtn,
                  marginTop: isShowKeyboard ? 20 : 50,
                  marginBottom: isShowKeyboard ? 30 : 0,
                }}
                activeOpacity={0.8}
                onPress={deletePhoto}
              >
                <Feather name="trash-2" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </View>
    </>
  );
};

export default CreatePostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
  },
  goBackBtn: {
    position: "absolute",
    left: 15,
    top: -15,
    zIndex: 9,
  },
  camera: {
    height: 240,
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
    marginTop: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 60,
    height: 60,
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
    marginTop: 8,
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    marginBottom: 32,
  },
  input: {
    borderBottomWidth: 1,
    fontSize: 16,
    borderBottomColor: "#E8E8E8",
    paddingTop: 15,
    paddingBottom: 16,
    fontFamily: "RobotoMedium",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  inputLocation: {
    marginTop: 16,
    borderBottomWidth: 1,
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    borderBottomColor: "#E8E8E8",
    paddingTop: 15,
    paddingBottom: 16,
    paddingLeft: 26,
  },
  locationBtn: {
    position: "absolute",
    top: "65%",
    width: 25,
    height: 25,
  },
  button: {
    // marginTop: 120,
    backgroundColor: "#F6F6F6",
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#FFFFFF",
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
  deleteBtn: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
    width: 70,
    height: 40,
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
  },
});
