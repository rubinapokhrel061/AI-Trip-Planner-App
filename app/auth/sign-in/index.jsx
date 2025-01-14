import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "../../../constants/Colors";
import { auth } from "../../../configs/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function SignIn() {
  const navigation = useNavigation();
  const router = useRouter();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  const OnSignIn = () => {
    if (!email && !password) {
      ToastAndroid.show("Please enter all details", ToastAndroid.BOTTOM);
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        if (user) {
          router.replace("/mytrip");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
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
            paddingLeft: 12,
          }}
          color="black"
        />
      </TouchableOpacity>

      {/* Header Image Section */}
      {/* <View style={styles.headerImageContainer}>
        <Image
          source={require("../../../assets/images/login-register.jpg")}
          style={styles.headerImage}
          resizeMode="contain"
        />
      </View> */}
      <View
        style={{
          height: "100%",
          marginTop: -10,
          backgroundColor: "#e4f5f3",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        {/* Title and Subtitle */}
        <View style={styles.textContainer}>
          <Text style={styles.mainTitle}>Let's Sign You In</Text>
          <Text style={styles.subtitle}>Welcome back...</Text>
        </View>

        {/* Input Fields and Buttons */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              keyboardType="email-address"
              onChangeText={(value) => setEmail(value)}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholder="Enter password"
              onChangeText={(value) => setPassword(value)}
            />
          </View>

          {/* Sign In Button */}
          <TouchableOpacity style={styles.signInButton} onPress={OnSignIn}>
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>

          {/* Or */}
          <Text style={styles.orText}>Or</Text>

          {/* Google Sign-In Button */}
          <TouchableOpacity style={styles.googleButton}>
            <View style={styles.googleIconContainer}>
              <Image
                source={require("../../../assets/images/google.png")}
                style={styles.googleIcon}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.googleButtonText}>Sign In with Google</Text>
          </TouchableOpacity>

          {/* Sign Up */}
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => router.replace("/auth/sign-up")}>
              <Text style={styles.signUpLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerImageContainer: {
    width: "100%",
    height: 260,
    backgroundColor: Colors.white,
  },
  headerImage: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    paddingTop: 25,
    paddingHorizontal: 25,
  },
  mainTitle: {
    fontFamily: "outfit-bold",
    fontSize: 30,
  },
  subtitle: {
    marginTop: 5,
    fontFamily: "outfit",
    fontSize: 20,
    color: Colors.gray,
  },
  inputContainer: {
    paddingHorizontal: 25,
    paddingTop: 15,
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
  signInButton: {
    padding: 15,
    backgroundColor: Colors.blue,
    borderRadius: 15,
    marginTop: 30,
  },
  signInButtonText: {
    color: Colors.white,
    fontFamily: "outfit",
    fontSize: 20,
    textAlign: "center",
  },
  orText: {
    textAlign: "center",
    margin: 12,
    fontSize: 15,
    fontFamily: "outfit-bold",
  },
  googleButton: {
    padding: 10,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
    borderColor: Colors.blue,
    borderRadius: 15,
  },
  googleIconContainer: {
    width: 37,
    height: 37,
    backgroundColor: Colors.blue,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    borderRadius: 15,
  },
  googleIcon: {
    width: "100%",
    height: "100%",
  },
  googleButtonText: {
    fontFamily: "outfit",
    fontSize: 20,
    color: Colors.blue,
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },
  signUpText: {
    fontSize: 16,
    color: Colors.grey,
    fontFamily: "outfit",
  },
  signUpLink: {
    color: Colors.blue,
    fontWeight: "bold",
    fontFamily: "outfit",
    marginLeft: 4,
  },
});
