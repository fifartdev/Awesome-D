import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { auth } from "../firebase";

const HomeScreen = () => {
  const navigation = useNavigation();
  const auth = getAuth();
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <Text>Welcome to Home</Text>
      <Text style={{ fontWeight: "700", marginTop: 10 }}>
        {auth.currentUser.email}
      </Text>
      <TouchableOpacity style={styles.buttonBg} onPress={handleSignOut}>
        <Text style={styles.buttonTxt}>Logout</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
});

export default HomeScreen;
