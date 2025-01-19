import { View, Image, Text } from "react-native";
import React from "react";
import moment from "moment";
import { Colors } from "../../constants/Colors";

export default function UserTripCard({ trip }) {
  const tripData = JSON.parse(trip.tripData);

  const tripPlan = JSON.parse(trip.tripPlan);
  return (
    <View
      style={{
        marginTop: 25,
        display: "flex",
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
      }}
    >
      <Image
        source={tripPlan?.travelPlan?.imageUrl}
        style={{ width: 100, height: 100, borderRadius: 15 }}
      />
      <View>
        <Text
          style={{
            fontFamily: "outfit-medium",
            fontSize: 18,
          }}
        >
          {tripPlan?.travelPlan?.location}
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 14,
            color: Colors.gray,
          }}
        >
          {moment(tripData.startDate).format("DD MMM yyyy")}
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 14,
            color: Colors.gray,
          }}
        >
          Traveling : {tripData?.travelType.title}
        </Text>
      </View>
    </View>
  );
}
