import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "../../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../../../configs/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function SignUp() {
  const navigation = useNavigation();
  const router = useRouter();
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });
  const OnCreateAccount = () => {
    if (!email && !password && !fullName) {
      Toast.show({
        type: "error",
        text1: "Please enter all details",
      });
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        console.log("signup");
        if (user) {
          router.replace("/mytrip");
          Toast.show({
            type: "success",
            text1: "User signed up successfully",
            text2: "Welcome back!",
          });
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Toast.show({
          type: "error",
          text1: errorMessage,
        });
        console.log(errorCode, errorMessage);
      });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{}}
        onPress={() => router.back()}
        activeOpacity={1}
      >
        <Ionicons
          name="arrow-back"
          size={24}
          style={{
            backgroundColor: Colors.white,
            paddingTop: 12,
            paddingLeft: 14,
          }}
          color="black"
        />
      </TouchableOpacity>

      <View
        style={{
          height: "100%",
          backgroundColor: Colors.white,
        }}
      >
        {/* Title Section */}
        <View style={styles.textContainer}>
          <Text style={styles.mainTitle}>Create Your Account</Text>
        </View>

        {/* Input Fields and Buttons */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              keyboardType="default"
              accessibilityLabel="Phone name input"
              onChangeText={(value) => setFullName(value)}
            />
          </View>

          {/* Email */}
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              keyboardType="email-address"
              accessibilityLabel="Email input"
              onChangeText={(value) => setEmail(value)}
            />
          </View>

          {/* Password */}
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholder="Enter password"
              accessibilityLabel="Password input"
              onChangeText={(value) => setPassword(value)}
            />
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity
            style={styles.signUpButton}
            accessibilityLabel="Sign Up Button"
            onPress={OnCreateAccount}
          >
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>

          {/* Sign In */}
          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => router.replace("/auth/sign-in")}>
              <Text style={styles.signInLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../../assets/images/login-register.jpg")}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  textContainer: {
    paddingTop: 25,
    paddingHorizontal: 25,
  },
  mainTitle: {
    fontFamily: "outfit-bold",
    fontSize: 30,
  },
  inputContainer: {
    paddingHorizontal: 25,
  },
  inputWrapper: {
    marginTop: 15,
  },
  label: {
    fontFamily: "outfit",
    fontSize: 16,
    color: Colors.black,
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.blue,
    fontFamily: "outfit",
    fontSize: 16,
  },
  signUpButton: {
    padding: 15,
    backgroundColor: Colors.blue,
    borderRadius: 15,
    marginTop: 30,
  },
  signUpButtonText: {
    color: Colors.white,
    fontFamily: "outfit",
    fontSize: 20,
    textAlign: "center",
  },

  signInContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },
  signInText: {
    fontSize: 16,
    color: Colors.grey,
    fontFamily: "outfit",
  },
  signInLink: {
    color: Colors.blue,
    fontWeight: "bold",
    fontFamily: "outfit",
    marginLeft: 4,
  },
  imageContainer: {
    width: "100%",
    height: 250,
    backgroundColor: Colors.white,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
