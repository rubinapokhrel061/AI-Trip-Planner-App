import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Colors } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import StartNewTripCard from "../../components/MyTrips/StartNewTripCard";

export default function MyTrip() {
  const [userTrips, setUserTrips] = useState([]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Trips</Text>
        <Ionicons name="add-circle" size={33} color={Colors.blue} />
      </View>
      {userTrips?.length === 0 ? <StartNewTripCard /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 40,
    backgroundColor: Colors.white,
    height: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  headerText: {
    fontFamily: "outfit-bold",
    fontSize: 30,
    color: Colors.black,
  },
});
