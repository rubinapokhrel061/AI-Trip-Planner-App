import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, FlatList } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import { Colors } from "../../constants/Colors";

export default function TripDetails() {
  const navigation = useNavigation();
  const { trip } = useLocalSearchParams();
  const [tripDetails, setTripDetails] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "Trip Details",
      headerStyle: {
        backgroundColor: Colors.white,
      },
    });

    if (trip) {
      const parsedTrip = JSON.parse(trip);
      setTripDetails(parsedTrip);
    }
  }, [trip, navigation]);

  const formatDate = (date) => moment(date).format("DD MMM yyyy");

  if (!tripDetails) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        No Data found
      </View>
    );
  }

  const { tripData, tripPlan } = tripDetails;

  const {
    place,
    travelType,
    budget,
    startDate,
    endDate,
    totalNoOfDays,
    country,
  } = JSON.parse(tripData);

  const {
    location,
    duration,
    travelers,
    bestTimeToVisit,
    flights,
    hotels,
    itinerary,
    notes,
  } = JSON.parse(tripPlan).travelPlan;

  const renderHotelItem = ({ item }) => {
    const renderStars = (rating) => {
      let stars = [];
      const flooredRating = Math.round(rating);
      for (let i = 0; i < 5; i++) {
        stars.push(
          i < flooredRating ? (
            <Ionicons key={i} name="star" size={20} color={Colors.yellow} />
          ) : (
            <Ionicons
              key={i}
              name="star-outline"
              size={20}
              color={Colors.yellow}
            />
          )
        );
      }
      return stars;
    };

    return (
      <View
        style={{
          backgroundColor: "#f1f1f1",
          borderRadius: 10,
          padding: 15,
          margin: 4,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 3,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#3498db" }}>
          {item.hotelName}
        </Text>
        <Text style={{ fontSize: 14, color: "#7f8c8d" }}>
          {item.hotelAddress}
        </Text>
        <Text style={{ fontSize: 16, color: "#2ecc71", marginVertical: 5 }}>
          {item.price} per night
        </Text>
        <View style={{ flexDirection: "row", marginTop: 5 }}>
          {renderStars(item.rating)}
          <Text style={{ fontSize: 14, color: "#7f8c8d", marginLeft: 5 }}>
            ({item.rating}/5)
          </Text>
        </View>
      </View>
    );
  };

  const renderFlightItem = ({ item }) => (
    <View
      style={{
        backgroundColor: Colors.cardBG,
        borderRadius: 10,
        padding: 15,
        margin: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: "bold", color: "#3498db" }}>
        {item.airline}
      </Text>
      <Text style={{ fontSize: 14, color: "#7f8c8d" }}>
        Departure: {item.departureAirport}
      </Text>
      <Text style={{ fontSize: 14, color: "#7f8c8d" }}>
        Arrival: {item.arrivalAirport}
      </Text>
      <Text style={{ fontSize: 16, color: "#2ecc71", marginVertical: 5 }}>
        Price: {item.flightPrice}
      </Text>
    </View>
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff", padding: 20 }}>
      <View
        style={{
          marginVertical: 30,
          padding: 20,
          marginTop: 50,
          backgroundColor: Colors.cardBG,
          borderRadius: 15,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 3,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-medium",
            fontSize: 26,
            fontWeight: "bold",
            color: Colors.primary,
            marginBottom: 12,
            textTransform: "capitalize",
          }}
        >
          {location}
        </Text>

        <View>
          <Text
            style={{
              fontFamily: "outfit",
              fontSize: 18,
              color: Colors.gray,
              marginBottom: 8,
              lineHeight: 24,
            }}
          >
            <Text style={{ fontWeight: "bold", color: Colors.darkGray }}>
              Date:{" "}
            </Text>
            {formatDate(startDate)} - {formatDate(endDate)}
          </Text>

          <Text
            style={{
              fontFamily: "outfit",
              fontSize: 18,
              color: Colors.gray,
              marginBottom: 8,
              lineHeight: 24,
            }}
          >
            <Text style={{ fontWeight: "bold", color: Colors.darkGray }}>
              Duration:{" "}
            </Text>
            {duration}
          </Text>

          <Text
            style={{
              fontFamily: "outfit",
              fontSize: 18,
              color: Colors.gray,
              marginBottom: 8,
              lineHeight: 24,
            }}
          >
            <Text style={{ fontWeight: "bold", color: Colors.darkGray }}>
              Travelers:{" "}
            </Text>
            {travelType.icon} {travelType.title} ({travelType.people} people)
          </Text>

          <Text
            style={{
              fontFamily: "outfit",
              fontSize: 18,
              color: Colors.gray,
              marginBottom: 8,
              lineHeight: 24,
            }}
          >
            <Text style={{ fontWeight: "bold", color: Colors.darkGray }}>
              Budget:{" "}
            </Text>
            {budget.icon} {budget.title}
          </Text>

          <Text
            style={{
              fontFamily: "outfit",
              fontSize: 18,
              color: Colors.gray,
              marginBottom: 8,
              lineHeight: 24,
            }}
          >
            <Text style={{ fontWeight: "bold", color: Colors.darkGray }}>
              Best Time to Visit:{" "}
            </Text>
            {bestTimeToVisit}
          </Text>
        </View>
      </View>

      <View style={{ marginVertical: 15, marginBottom: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
          Flights :
        </Text>
        <FlatList
          data={[flights.details.exampleFlight]}
          renderItem={renderFlightItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={{ marginVertical: 15, marginBottom: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
          Hotels :
        </Text>
        <FlatList
          data={hotels}
          renderItem={renderHotelItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </ScrollView>
  );
}
