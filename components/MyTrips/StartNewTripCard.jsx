import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";

export default function StartNewTripCard() {
  const router = useRouter();
  return (
    <View style={styles.cardContainer}>
      <Ionicons name="location-sharp" size={35} color={Colors.blue} />
      <Text style={styles.cardTitle}>No trips planned yet</Text>
      <Text style={styles.cardDescription}>
        Ready for your next adventure? Plan your next trip now and create
        unforgettable memories!
      </Text>
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => router.push("/create-trip")}
      >
        <Text style={styles.startButtonText}>Start a New Trip</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 25,
    marginTop: 50,
    alignItems: "center",

    gap: 15,
  },
  cardTitle: {
    fontSize: 26,
    fontFamily: "outfit-medium",
    color: Colors.black,
  },
  cardDescription: {
    fontSize: 16,
    fontFamily: "outfit-regular",
    color: Colors.gray,
    textAlign: "center",
    marginTop: 10,
  },
  startButton: {
    paddingVertical: 12,
    paddingHorizontal: 35,
    backgroundColor: Colors.blue,
    borderRadius: 30,
    marginTop: 20,
    alignItems: "center",
  },
  startButtonText: {
    color: Colors.white,
    fontFamily: "outfit-semibold",
    fontSize: 16,
  },
});
