// import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,

} from "react-native";

const RegistrationScreen = () => {
  console.log(Platform.OS);
  // const [isKeyboard]
  return (
    <ImageBackground
      source={require("../assets/Photo-BG-1.jpg")}
      style={styles.image}
    >
      <KeyboardAvoidingView behavior={Platform.OS === "ios" && "padding"}>
        <View style={styles.form}>
          <View style={styles.imgBox}></View>
          <Text style={styles.title}>Регистрация</Text>

          <View style={styles.inputUserName}>
            <TextInput
              style={styles.input}
              textAlign={"left"}
              placeholderTextColor={"#BDBDBD"}
              textContentType="username"
              placeholder="Логин"
            />
          </View>
          <View style={styles.inputMail}>
            <TextInput
              style={styles.input}
              textAlign={"left"}
              placeholderTextColor={"#BDBDBD"}
              textContentType="emailAddress"
              placeholder="Адрес электронной почты"
            />
          </View>

          <View style={styles.inputPassword}>
            <TextInput
              style={styles.input}
              textAlign={"left"}
              placeholderTextColor={"#BDBDBD"}
              textContentType="password"
              secureTextEntry={true}
              placeholder="Пароль"
            />
            <TouchableOpacity>
              <Text style={styles.showPass}>Показать</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} activeOpacity={0.8}>
            <Text style={styles.buttonText}>Зарегистрироваться</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.aside}>Уже есть аккаунт? Войти</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};
export default RegistrationScreen;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  form: {
    paddingTop: 92,
     paddingBottom: 45,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#FFFFFF",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    justifyContent: "center",
    //    ...Platform.select({
    //   ios: {
    //     paddingBottom: 45,
    //   },
    //   android: {
    //    marginBottom:45,
    //   },
    // }),
  },
  // imgBox: {
  //   marginHorizontal: 127,
  //   backgroundColor: "#F6F6F6",
  //   borderRadius: 16,
  //   width: 120,
  //   height: 120,
  // },
  title: {
    fontSize: 30,
    color: "#212121",
    textAlign: "center",
  },
  input: {
    paddingLeft: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    height: 50,
    borderRadius: 8,
  },
  inputUserName: {
    marginTop: 32,
  },
  inputMail: {
    marginTop: 16,
  },
  inputPassword: {
    marginTop: 16,
  },
  showPass: {
    textAlign: "right",
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
    color: "#FFFFFF",
  },
  aside: {
    marginTop: 16,
    textAlign: "center",
    color: "#1B4371",
  },
});
