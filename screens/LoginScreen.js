import {
  Alert,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { auth } from "../firebase";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const navigation = useNavigation();
  const [errorEmail, setErrorEmail] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        //
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log(user.email);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        if (errorCode === "auth/invalid-email") {
          Alert.alert("Invalid Email");
        } else {
          Alert.alert("Password is Weak");
        }
      });
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === "auth/invalid-email") {
          Alert.alert("Please input Email");
        } else if (errorCode === "auth/wrong-password") {
          Alert.alert("Wrong Password");
        } else if (errorCode === "auth/user-not-found") {
          Alert.alert("User does not exist");
        } else if (errorCode === "auth/missing-password") {
          Alert.alert("Missing Password");
        } else {
          Alert.alert(errorCode);
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
        source={require("../assets/140973-wall-e-loading-animation.json")}
      />
      <View style={{ width: "100%", alignItems: "center" }}>
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"
          style={styles.inputs}
          autoCapitalize="none"
        />
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Password"
          style={styles.inputs}
          secureTextEntry
        />
        {/* {errorEmail.length > 0 && (
          <Text style={{ fontSize: 12, color: "red" }}>{errorEmail}</Text>
        )} */}
      </View>
      <View style={styles.btns}>
        <TouchableOpacity style={styles.buttonBg} onPress={handleLogin}>
          <Text style={styles.buttonTxt}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonBgRegister}
          onPress={handleSignUp}
        >
          <Text style={styles.buttonTxtReg}>Register</Text>
        </TouchableOpacity>
        <Button
          title="Forgot Password?"
          onPress={() => navigation.navigate("Forgot")}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  inputs: {
    backgroundColor: "#fff",
    marginVertical: 5,
    padding: 10,
    width: "80%",
    borderRadius: 10,
  },
  buttonBgRegister: {
    width: 200,
    backgroundColor: "#fff",
    borderColor: "blue",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
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
  buttonTxtReg: {
    color: "blue",
  },
  btns: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
});
