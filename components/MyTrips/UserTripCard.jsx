import { View, Text } from "react-native";
import React from "react";
import moment from "moment";
import { Colors } from "../../constants/Colors";

export default function UserTripCard({ trip }) {
  const tripData = JSON.parse(trip.tripData);
  const tripPlan = JSON.parse(trip.tripPlan);

  return (
    <View
      style={{
        marginVertical: 15,
        padding: 20,
        backgroundColor: Colors.white,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: Colors.lightGray,
        // shadowColor: "#000",
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.1,
        // shadowRadius: 5,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-medium",
          fontSize: 20,
          color: Colors.primary,
          fontWeight: "bold",
        }}
      >
        {tripPlan?.travelPlan?.location}
      </Text>
      <Text
        style={{
          fontFamily: "outfit",
          fontSize: 14,
          color: Colors.gray,
          marginTop: 5,
        }}
      >
        {moment(tripData.startDate).format("DD MMM yyyy")}
      </Text>
      <Text
        style={{
          fontFamily: "outfit",
          fontSize: 14,
          color: Colors.gray,
          marginTop: 3,
        }}
      >
        Traveling: {tripData?.travelType.title}
      </Text>
    </View>
  );
}
