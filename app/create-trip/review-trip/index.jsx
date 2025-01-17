import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useEffect } from "react";
import { useNavigation, useRouter } from "expo-router";
import { CreateTripContext } from "../../../context/CreateTripContext";
import { Colors } from "../../../constants/Colors";
import moment from "moment";

export default function ReviewTrip() {
  const navigation = useNavigation();
  const { tripData } = useContext(CreateTripContext);
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "",
    });
  }, []);
  const handleContinueToBuild = () => {
    router.push("/create-trip/build-trip");
  };
  return (
    <View
      style={{
        flex: 1,
        padding: 25,
        paddingTop: 55,
        backgroundColor: Colors.white,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 35,
          marginTop: 5,
          color: Colors.blue,
        }}
      >
        Review Your Trip
      </Text>

      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 18, color: Colors.gray }}>
          Please verify your details before generating your trip.
        </Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.icon}>📍</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Destination</Text>
          <Text style={styles.infoValue}>
            {tripData.place},{tripData.country}
          </Text>
        </View>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.icon}>📅</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Travel Date</Text>
          <Text style={styles.infoValue}>
            {moment(tripData?.startDate).format("DD MMM") +
              " To " +
              moment(tripData?.endDate).format("DD MMM")}
          </Text>
        </View>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.icon}>✈️</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Who is Traveling</Text>
          <Text style={styles.infoValue}>{tripData?.travelType?.title}</Text>
        </View>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.icon}>💰</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Budget</Text>
          <Text style={styles.infoValue}>{tripData?.budget?.title}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleContinueToBuild}>
        <Text style={styles.buttonText}>Continue to Build</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  infoSection: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#F7F7F7",
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  icon: {
    fontSize: 30,
  },
  infoBox: {
    paddingVertical: 15,

    marginLeft: 15,
  },
  infoLabel: {
    fontFamily: "outfit-medium",
    color: Colors.gray,
    fontSize: 15,
  },
  infoValue: {
    fontFamily: "outfit-medium",
    color: Colors.primary,
    fontSize: 18,
    marginTop: 2,
  },
  button: {
    backgroundColor: Colors.blue,
    paddingVertical: 15,
    marginTop: 40,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: Colors.white,
    fontFamily: "outfit",
    fontSize: 18,
  },
};
