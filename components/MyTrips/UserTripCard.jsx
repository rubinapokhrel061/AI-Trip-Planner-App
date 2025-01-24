import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import moment from "moment";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";

export default function UserTripCard({ trip, key }) {
  const tripData = JSON.parse(trip.tripData);
  const tripPlan = JSON.parse(trip.tripPlan);
  console.log(trip);
  const router = useRouter();
  return (
    <View
      key={key}
      style={{
        marginVertical: 15,
        padding: 10,
        backgroundColor: Colors.white,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: Colors.lightGray,
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
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <View>
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
            Traveling : {tripData?.travelType.title}
          </Text>
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.green,
              paddingVertical: 8,
              paddingHorizontal: 10,
              borderRadius: 25,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() =>
              router.push({
                pathname: "/trip-details",

                params: { trip: JSON.stringify(trip) },
              })
            }
          >
            <Text
              style={{
                color: Colors.white,
                fontFamily: "outfit",
                fontSize: 12,
                fontWeight: "600",
              }}
            >
              View More
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
