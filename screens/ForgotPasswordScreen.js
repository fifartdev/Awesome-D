import {
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { sendPasswordResetEmail, getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { auth } from "../firebase";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const auth = getAuth();
  const navigation = useNavigation();
  const handleForgot = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert("Reset Email sent to " + email);
        navigation.replace("Login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        if (errorCode === "auth/invalid-email") {
          Alert.alert("Please input correct Email");
        } else if (errorCode === "auth/user-not-found") {
          Alert.alert("User does not exist");
        } else {
          Alert.alert("Missing Email");
        }
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <LottieView
        autoPlay
        style={{
          width: 200,
          height: 200,
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require("../assets/130189-email.json")}
      />
      <View style={{ width: "100%", alignItems: "center" }}>
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"
          style={styles.inputs}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.btns}>
        <TouchableOpacity style={styles.buttonBg} onPress={handleForgot}>
          <Text style={styles.buttonTxt}>Reset</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputs: {
    backgroundColor: "#fff",
    marginVertical: 5,
    padding: 10,
    width: 200,
    borderRadius: 10,
    width: "80%",
  },
  buttonBg: {
    width: 200,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    width: "80%",
  },
  buttonTxt: {
    color: "#fff",
  },
  btns: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
});
