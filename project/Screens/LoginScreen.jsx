import React, { useState, useCallback, useRef } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const initialState = {
  emailAddress: "",
  password: "",
};

SplashScreen.preventAutoHideAsync();

const LoginScreen = () => {
  console.log(Platform.OS);

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [isFocusInput, setIsFocusInput] = useState({
    emailAddress: false,
    password: false,
  });
  const [isShowPassword, setIsShowPassword] = useState({
    boolean: true,
    text: "Показать",
  });

  const [fontsLoaded] = useFonts({
    RobotoRegular: require("../assets/fonts/Roboto-Regular.ttf"),
    RobotoMedium: require("../assets/fonts/Roboto-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setIsShowPassword({ boolean: true, text: "Показать" });
    setState(initialState);
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <ImageBackground
        source={require("../assets/image/photo-BG-2x.jpg")}
        style={styles.image}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View onLayout={onLayoutRootView}>
            <View
              // style={styles.formWrapper}
              style={{
                ...styles.formWrapper,
                marginTop: isShowKeyboard ? 456.5 : 219,
              }}
            >
              <Text style={styles.title}>Войти</Text>

              <View
                style={{
                  ...styles.form,
                  paddingBottom: isShowKeyboard ? 32 : 111,
                }}
              >
                <View style={styles.inputMail}>
                  <TextInput
                    style={{
                      ...styles.input,
                      borderColor: isFocusInput.emailAddress
                        ? "#FF6C00"
                        : "#F6F6F6",
                    }}
                    textAlign={"left"}
                    placeholderTextColor={"#BDBDBD"}
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    value={state.emailAddress}
                    placeholder="Адрес электронной почты"
                    onFocus={() => {
                      setIsShowKeyboard(true),
                        setIsFocusInput({
                          ...isFocusInput,
                          emailAddress: true,
                        });
                    }}
                    onBlur={() => {
                      setIsFocusInput({
                        ...isFocusInput,
                        emailAddress: false,
                      });
                    }}
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        emailAddress: value,
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
                    }}
                    textAlign={"left"}
                    placeholderTextColor={"#BDBDBD"}
                    textContentType="password"
                    value={state.password}
                    secureTextEntry={isShowPassword.boolean}
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
                    onPress={() =>
                      setIsShowPassword({ boolean: false, text: "" })
                    }
                  >
                    {isShowPassword.text}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.8}
                  onPress={keyboardHide}
                >
                  <Text style={styles.buttonText}>Войти</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.aside}>
                    Нет аккаунта? Зарегистрироваться
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  formWrapper: {
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#FFFFFF",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    justifyContent: "center",
  },
  title: {
    fontFamily: "RobotoMedium",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.16,
    color: "#212121",
    textAlign: "center",
  },
  input: {
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    paddingLeft: 16,
    borderWidth: 1,
    backgroundColor: "#F6F6F6",
    height: 50,
    borderRadius: 8,
  },
  inputMail: {
    marginTop: 32,
  },
  inputPassword: {
    marginTop: 16,
  },
  showPass: {
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: 19,
    fontSize: 16,
    position: "absolute",
    top: 16,
    left: 260,
    color: "#1B4371",
  },
  button: {
    marginTop: 43,
    backgroundColor: "#FF6C00",
    height: 61,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: 19,
    color: "#FFFFFF",
  },
  aside: {
    fontFamily: "RobotoRegular",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: 19,
    marginTop: 16,
    textAlign: "center",
    color: "#1B4371",
  },
});
