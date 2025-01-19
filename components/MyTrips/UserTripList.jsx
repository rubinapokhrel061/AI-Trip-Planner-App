import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import moment from "moment";
import { Colors } from "../../constants/Colors";
import UserTripCard from "./UserTripCard";

export default function UserTripList({ userTrips }) {
  const LatestTrip = JSON.parse(userTrips[0].tripData);
  const tripPlan = JSON.parse(userTrips[0].tripPlan);
  console.log(tripPlan?.travelPlan?.imageUrl);
  return (
    userTrips && (
      <View>
        <View style={{ marginTop: 20 }}>
          <Image
            source={tripPlan?.travelPlan?.imageUrl}
            style={{
              width: "100%",
              height: 240,
              objectFit: "cover",
              borderRadius: 15,
            }}
          />
          <View style={{ marginTop: 10 }}>
            <Text
              style={{
                fontFamily: "outfit-medium",
                fontSize: 24,
              }}
            >
              {tripPlan?.travelPlan?.location}
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 5,
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
                ✈️{LatestTrip?.travelType?.title}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.blue,
                padding: 15,
                marginTop: 20,
                borderRadius: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={""}
            >
              <Text
                style={{
                  color: Colors.white,
                  fontFamily: "outfit",
                  fontSize: 18,
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
      </View>
    )
  );
}
