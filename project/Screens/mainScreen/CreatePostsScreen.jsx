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
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import db from "../../firebase/config";
import app from "../../firebase/config";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

const storage = getStorage(db);

const cloudDB = getFirestore(app);

const CreatePostsScreen = ({ navigation }) => {
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState("");
  const [comment, setComment] = useState("");
  const [location, setLocation] = useState(null);

  const { userId, userName } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();

     navigation.setOptions({ tabBarStyle: { display: 'none' }})
  }, []);

  const takePhoto = async () => {
    const photo = await cameraRef.takePictureAsync();
    setPhoto(photo.uri);
    let location = await Location.getCurrentPositionAsync({});
    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    setLocation(coords);
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);

    const file = await response.blob();

    const uniquePostId = Date.now().toString();
    const storageRef = ref(storage, `postImage/${uniquePostId}`);

    const data = await uploadBytes(storageRef, file);

    const getStorageRef = await getDownloadURL(storageRef);
    // console.log(getStorageRef);

    return getStorageRef;
  };

  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();

   await addDoc(collection(cloudDB, "posts"), {
      photo,
      comment,
      location,
      userId,
      userName,
    });
  };

  const sendPhoto = () => {
    // uploadPhotoToServer();
    uploadPostToServer();
    // navigation.navigate("DefaultScreen", { photo });
    navigation.navigate("DefaultScreen");
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
          onChangeText={setComment}
        ></TextInput>

        <TextInput
          placeholderTextColor={"#BDBDBD"}
          placeholder="Местность..."
          style={styles.input}
        ></TextInput>
        <TouchableOpacity onPress={() => navigation.navigate("MapScreen")}>
          <Text>Map</Text>
          <Ionicons name="location-outline" size={24} color="#BDBDBD" />
        </TouchableOpacity>
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

          <TouchableOpacity
          style={styles.buttonActive}
          activeOpacity={0.8}
          onPress={sendPhoto}
        >
          <Text style={styles.buttonTextActive}>DELETE</Text>
        </TouchableOpacity>
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
});
