import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; 
import { Colors } from "../../constants/Colors";
import { auth } from "../../configs/FirebaseConfig";
import { signOut } from "firebase/auth";
import { useRouter } from "expo-router"; 
import Toast from "react-native-toast-message"; 

const Profile = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: false,
      headerTitle: "Profile",
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginLeft: 10,marginRight:20 }}
        >
          <MaterialIcons name="arrow-back" size={30} color={Colors.primary} />
        </TouchableOpacity>
      ),
    });

    const unsubscribe = auth.onAuthStateChanged(setUser);

    return () => unsubscribe();
  }, [navigation]);

  const logout = () => {
    console.log("press");
    signOut(auth)
      .then(() => {
        router.replace("/");
        Toast.show({
          type: "success",
          text1: "Successfully logged out",
          text2: "You are now logged out and redirected!",
        });
      })
      .catch((error) => {
        console.log("Error signing out: ", error);
        Toast.show({
          type: "error",
          text1: "Error signing out",
          text2: "Please try again later.",
        });
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.profilePictureContainer}>
          <MaterialIcons name="account-circle" size={100} color={Colors.blue} />
        </View>
        <View style={styles.profileInfo}>
          {user ? (
            <Text style={styles.email}>{user.email}</Text>
          ) : (
            <Text style={styles.email}>No user logged in</Text>
          )}
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f1f1f1",
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  profilePictureContainer: {
    width: 100,
    height: 100,
    justifyContent: "center",
    marginRight: 20,
  },
  profileInfo: {
    flexDirection: "column",
  },
  email: {
    fontSize: 18,
    marginVertical: 5,
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: Colors.blue,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  logoutText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default Profile;
