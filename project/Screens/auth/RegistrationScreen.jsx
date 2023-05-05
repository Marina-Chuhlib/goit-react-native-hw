import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";

import { useDispatch } from "react-redux";

import AnimatedLoader from "react-native-animated-loader";

import * as ImagePicker from "expo-image-picker";

import db from "../../firebase/config";
const storage = getStorage(db);

import {
  uploadBytes,
  uploadBytesResumable,
  ref,
  getDownloadURL,
  getStorage,
} from "firebase/storage";

import { authSignUpUser } from "../../redux/auth/authOperations";

const initialState = {
  userName: "",
  email: "",
  password: "",
  imageUri: null,
};

const RegistrationScreen = ({ navigation }) => {
  // console.log(Platform.OS);
  const [photo, setPhoto] = useState(null);
  const [visible, setVisible] = useState(false);

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [isFocusInput, setIsFocusInput] = useState({
    userName: false,
    email: false,
    password: false,
  });
  const [isShowPassword, setIsShowPassword] = useState(true);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   setInterval(() => {
  //     setVisible(!visible);
  //   }, 2000);
  // }, []);

  const handleAddImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result.assets.length > 0) {
      setPhoto(result.assets[0]);
    }
  };

  const clearPhoto = () => {
    setPhoto(null);
  };

  const uploadPhotoToServer = async () => {
    try {
      const response = await fetch(photo.uri);

      const file = await response.blob();

      const uniquePostId = Date.now().toString();
      const storageRef = ref(
        storage,
        `profileAvatar/${uniquePostId}/${file.data.name}`
      );

      // await uploadBytesResumable(storageRef, file);
      uploadBytes(storageRef, file);

      const getStorageRef = await getDownloadURL(storageRef);
      // console.log(getStorageRef, "getStorageRef");

      return getStorageRef;
    } catch (error) {
      console.log(error);
    }
  };

  async function handleSubmit() {
    try {
      setIsShowKeyboard(false);
      Keyboard.dismiss();

      setVisible(true);
      const avatar = photo ? await uploadPhotoToServer() : null;
      // const avatar = await uploadPhotoToServer();

      const user = {
        userName: state.userName,
        email: state.email,
        password: state.password,
        photo: avatar,
      };
      console.log(user);

      dispatch(authSignUpUser(user));

      setState(initialState);
      setPhoto(null);
      setVisible(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={handleSubmit}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/image/photo-BG-2x.jpg")}
          style={styles.image}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            {visible && (
              <AnimatedLoader
                visible={visible}
                overlayColor="rgba(255,255,255,0.75)"
                animationStyle={styles.lottie}
                speed={1}
              >
                <Text>Загрузка...</Text>
              </AnimatedLoader>
            )}

            <View
              style={{
                ...styles.formWrapper,

                ...Platform.select({
                  ios: {
                    marginTop: isShowKeyboard ? 195 : 219,
                  },
                  android: {
                    marginTop: isShowKeyboard ? -100 : 0,
                  },
                }),
              }}
            >
              <View style={styles.imgBox}>
                {photo ? (
                  <View>
                    <Image style={styles.avatar} source={{ uri: photo.uri }} />
                    <TouchableOpacity
                      onPress={clearPhoto}
                      style={styles.iconBtnDel}
                    >
                      <Image
                        style={styles.iconDel}
                        source={require("../../assets/image/del-avatar.icon.png")}
                      />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={styles.iconBtn}>
                    <TouchableOpacity onPress={handleAddImage}>
                      <Image
                        style={styles.icon}
                        source={require("../../assets/image/add.png")}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              <Text style={styles.title}>Регистрация</Text>

              <View
                style={{
                  ...styles.form,
                  paddingBottom: isShowKeyboard ? 32 : 45,
                }}
              >
                <View style={styles.inputuserName}>
                  <TextInput
                    style={{
                      ...styles.input,
                      borderColor: isFocusInput.userName
                        ? "#FF6C00"
                        : "#F6F6F6",
                      backgroundColor: isFocusInput.userName
                        ? "#FFFFFF"
                        : "#F6F6F6",
                    }}
                    textAlign={"left"}
                    placeholderTextColor={"#BDBDBD"}
                    textContentType="userName"
                    value={state.userName}
                    placeholder="Логин"
                    onFocus={() => {
                      setIsShowKeyboard(true),
                        setIsFocusInput({
                          ...isFocusInput,
                          userName: true,
                        });
                    }}
                    onBlur={() => {
                      setIsFocusInput({
                        ...isFocusInput,
                        userName: false,
                      });
                    }}
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        userName: value,
                      }))
                    }
                  />
                </View>
                <View style={styles.inputMail}>
                  <TextInput
                    style={{
                      ...styles.input,
                      borderColor: isFocusInput.email ? "#FF6C00" : "#F6F6F6",
                      backgroundColor: isFocusInput.email
                        ? "#FFFFFF"
                        : "#F6F6F6",
                    }}
                    textAlign={"left"}
                    placeholderTextColor={"#BDBDBD"}
                    keyboardType="email-address"
                    textContentType="email"
                    value={state.email}
                    placeholder="Адрес электронной почты"
                    onFocus={() => {
                      setIsShowKeyboard(true),
                        setIsFocusInput({
                          ...isFocusInput,
                          email: true,
                        });
                    }}
                    onBlur={() => {
                      setIsFocusInput({
                        ...isFocusInput,
                        email: false,
                      });
                    }}
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        email: value,
                      }))
                    }
                  />
                </View>

                <View style={styles.inputPassword}>
                  <TextInput
                    style={{
                      ...styles.input,
                      borderColor: isFocusInput.password
                        ? "#FF6C00"
                        : "#F6F6F6",
                      backgroundColor: isFocusInput.password
                        ? "#FFFFFF"
                        : "#F6F6F6",
                    }}
                    textAlign={"left"}
                    placeholderTextColor={"#BDBDBD"}
                    textContentType="password"
                    value={state.password}
                    secureTextEntry={isShowPassword}
                    placeholder="Пароль"
                    onFocus={() => {
                      setIsShowKeyboard(true),
                        setIsFocusInput({
                          ...isFocusInput,
                          password: true,
                        });
                    }}
                    onBlur={() => {
                      setIsFocusInput({
                        ...isFocusInput,
                        password: false,
                      });
                    }}
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        password: value,
                      }))
                    }
                  />
                  <Text
                    style={styles.showPass}
                    onPress={() => {
                      setIsShowPassword((prevState) => !prevState);
                    }}
                  >
                    {isShowPassword ? "Показать" : "Скрыть"}
                  </Text>
                </View>
                <TouchableOpacity
                  // style={styles.button}
                  style={{
                    ...styles.button,
                    marginTop: isShowKeyboard ? 30 : 43,
                  }}
                  activeOpacity={0.8}
                  onPress={handleSubmit}
                >
                  <Text style={styles.buttonText}>Зарегистрироваться</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={styles.aside}>Уже есть аккаунт? Войти</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};
export default RegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  lottie: { width: 100, height: 100 },
  formWrapper: {
    paddingTop: 92,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#FFFFFF",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    justifyContent: "center",
  },
  imgBox: {
    position: "absolute",
    left: "35%",
    top: "-15%",
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  avatar: {
    borderRadius: 16,
    width: "100%",
    height: "100%",
  },
  iconBtn: {
    position: "absolute",
    left: "90%",
    top: "65%",
  },
  icon: {
    width: 25,
    height: 25,
  },
  iconBtnDel: { position: "absolute", left: "85%", top: "65%" },
  iconDel: {
    width: 35,
    height: 35,
  },
  title: {
    fontFamily: "RobotoMedium",
    fontStyle: "normal",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.16,
    color: "#212121",
    textAlign: "center",
  },
  input: {
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    paddingLeft: 16,
    borderWidth: 1,
    height: 50,
    borderRadius: 8,
  },
  inputuserName: {
    marginTop: 32,
  },
  inputMail: {
    marginTop: 16,
  },
  inputPassword: {
    marginTop: 16,
  },
  showPass: {
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
    lineHeight: 19,
    fontSize: 16,
    position: "absolute",
    top: 16,
    left: 260,
    color: "#1B4371",
  },
  button: {
    // marginTop: 43,
    backgroundColor: "#FF6C00",
    height: 61,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
    lineHeight: 19,
    color: "#FFFFFF",
  },
  aside: {
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
    lineHeight: 19,
    marginTop: 16,
    textAlign: "center",
    color: "#1B4371",
  },
});
