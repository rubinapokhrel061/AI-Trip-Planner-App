import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import moment from "moment";
import { Colors } from "../../constants/Colors";
import UserTripCard from "./UserTripCard";
import { useRouter } from "expo-router";

export default function UserTripList({ userTrips }) {
  const router = useRouter();
  const LatestTrip = JSON.parse(userTrips[0].tripData);
  const tripPlan = JSON.parse(userTrips[0].tripPlan);

  return (
    userTrips && (
      <View style={{ paddingHorizontal: 15, marginTop: 20 }}>
        <View style={{ marginBottom: 20 }}>
          <Text
            style={{
              fontFamily: "outfit-medium",
              fontSize: 24,
              fontWeight: "bold",
              color: Colors.primary,
            }}
          >
            {tripPlan?.travelPlan?.location}
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontFamily: "outfit",
                fontSize: 17,
                color: Colors.gray,
              }}
            >
              {moment(LatestTrip?.startDate).format("DD MMM yyyy")}
            </Text>
            <Text
              style={{
                fontFamily: "outfit",
                fontSize: 17,
                color: Colors.gray,
              }}
            >
              ✈️ {LatestTrip?.travelType?.title}
            </Text>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: Colors.blue,
              paddingVertical: 15,
              paddingHorizontal: 25,
              marginTop: 20,
              borderRadius: 25,
              justifyContent: "center",
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
            }}
            onPress={() =>
              router.push({
                pathname: "/trip-details",
                params: { trip: userTrips[0] },
              })
            }
          >
            <Text
              style={{
                color: Colors.white,
                fontFamily: "outfit",
                fontSize: 18,
                fontWeight: "600",
              }}
            >
              See Your Plan
            </Text>
          </TouchableOpacity>
        </View>

        {userTrips.map((trip, index) => (
          <UserTripCard trip={trip} key={index} />
        ))}
      </View>
    )
  );
}
