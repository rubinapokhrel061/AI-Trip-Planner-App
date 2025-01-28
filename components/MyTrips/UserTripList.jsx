import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import moment from "moment";
import { Colors } from "../../constants/Colors";
import UserTripCard from "./UserTripCard";
import { useRouter } from "expo-router";

export default function UserTripList({ userTrips, refresh }) {
  const router = useRouter();
  const LatestTrip = JSON.parse(userTrips[0].tripData);
  const tripPlan = JSON.parse(userTrips[0].tripPlan);

  return (
    userTrips && (
      <View style={{ marginTop: 20, marginBottom: 50 }}>
        {/* Trip Overview */}
        <View
          style={{
            marginBottom: 20,
            borderBottomWidth: 1,
            borderBottomColor: Colors.lightGray,
            paddingBottom: 20,
          }}
        >
          <Text
            style={{
              fontFamily: "outfit-medium",
              fontSize: 26,
              fontWeight: "bold",
              color: Colors.primary,
              marginBottom: 8,
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
                fontSize: 18,
                color: Colors.gray,
              }}
            >
              {moment(LatestTrip?.startDate).format("DD MMM YYYY")}
            </Text>
            <Text
              style={{
                fontFamily: "outfit",
                fontSize: 18,
                color: Colors.gray,
              }}
            >
              ✈️ {LatestTrip?.travelType?.title}
            </Text>
          </View>

          {/* Button */}
          <TouchableOpacity
            style={{
              backgroundColor: Colors.blue,
              paddingVertical: 16,
              paddingHorizontal: 30,
              marginTop: 25,
              borderRadius: 30,
              justifyContent: "center",
              alignItems: "center",
              shadowColor: "#000",
            }}
            onPress={() =>
              router.push({
                pathname: "/trip-details",
                params: { trip: JSON.stringify(userTrips[0]) },
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

        {/* List of Trips */}
        <Text
          style={{
            fontFamily: "outfit-medium",
            fontSize: 20,
            fontWeight: "bold",
            color: Colors.blue,
          }}
        >
          List of Trips:
        </Text>
        {userTrips.map((trip) => (
          <>
            <UserTripCard
              trip={trip}
              key={trip.id || `${trip.tripData.startDate}-${Math.random()}`}
              refresh={refresh}
            />
          </>
        ))}
      </View>
    )
  );
}
