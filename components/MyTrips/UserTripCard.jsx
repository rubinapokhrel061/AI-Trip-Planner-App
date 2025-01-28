import { View, Text, TouchableOpacity, ToastAndroid } from "react-native";
import React from "react";
import moment from "moment";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";

import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
export default function UserTripCard({ trip, refresh }) {
  const tripData = JSON.parse(trip.tripData);
  const tripPlan = JSON.parse(trip.tripPlan);

  const router = useRouter();

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "UserTrips", id));
      ToastAndroid.show("Trip deleted successfully", ToastAndroid.BOTTOM);
      refresh();
    } catch (error) {
      ToastAndroid.show("Error in deleting Trip..", ToastAndroid.BOTTOM);
      console.log(error);
    }
  };

  return (
    <View
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
      </View>
      <View
        style={{
          paddingTop: 10,
          display: "flex",
          gap: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
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
        <TouchableOpacity
          style={{
            backgroundColor: Colors.blue,
            paddingVertical: 8,
            paddingHorizontal: 10,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => ""}
        >
          <Text
            style={{
              color: Colors.white,
              fontFamily: "outfit",
              fontSize: 12,
              fontWeight: "600",
            }}
          >
            Edit trip
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.red,
            paddingVertical: 8,
            paddingHorizontal: 10,
            borderRadius: 25,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => handleDelete(trip.id)}
        >
          <Text
            style={{
              color: Colors.white,
              fontFamily: "outfit",
              fontSize: 12,
              fontWeight: "600",
            }}
          >
            Delete Trip
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
