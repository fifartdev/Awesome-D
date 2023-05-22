import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View>
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"
          style={styles.inputs}
        />
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Password"
          style={styles.inputs}
          secureTextEntry
        />
      </View>
      <View style={styles.btns}>
        <TouchableOpacity
          style={styles.buttonBg}
          onPress={() => console.log("Pressed Login")}
        >
          <Text style={styles.buttonTxt}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonBg}
          onPress={() => console.log("Pressed Register")}
        >
          <Text style={styles.buttonTxt}>Register</Text>
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
  },
  buttonBg: {
    width: 200,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  buttonTxt: {
    color: "#fff",
  },
  btns: {
    marginTop: 20,
  },
});
