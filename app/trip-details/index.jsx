import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";
import moment from "moment";

export default function TripDetails() {
  const navigation = useNavigation();
  const { trip } = useLocalSearchParams();
  const [tripDetails, setTripDetails] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "Trip Details",
    });

    if (trip) {
      const parsedTrip = JSON.parse(trip);
      setTripDetails(parsedTrip);
    }
  }, [trip, navigation]);

  const formatDate = (date) => moment(date).format("DD MMM yyyy");

  if (!tripDetails) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  const { tripPlan, tripData } = tripDetails;
  console.log(tripPlan.travelPlan);
  return (
    <View style={styles.container}>
      <View style={styles.tripHeader}>
        <Text style={styles.locationText}>kathmandu</Text>

        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>
            {formatDate(tripData?.startDate)} - {formatDate(tripData?.endDate)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  tripHeader: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
    paddingBottom: 20,
  },
  locationText: {
    fontFamily: "outfit-medium",
    fontSize: 26,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 8,
    paddingTop: 30,
  },
  dateContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  dateText: {
    fontFamily: "outfit",
    fontSize: 18,
    color: Colors.gray,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
