import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, FlatList, Image } from "react-native";
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
        <Text>No Data found</Text>
      </View>
    );
  }

  const { tripData, tripPlan } = tripDetails;

  const { travelType, budget, startDate, endDate } = JSON.parse(tripData);

  const { location, duration, itinerary, bestTimeToVisit, flights, hotels } =
    JSON.parse(tripPlan).travelPlan;
  const { notes } = JSON.parse(tripPlan);

  const renderFlightItem = ({ item }) => (
    <View
      style={{
        backgroundColor: Colors.cardBG,
        borderRadius: 10,
        padding: 15,
        margin: 4,
        width: 350,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          color: Colors.blue,
          marginBottom: 10,
        }}
      >
        {item.airline}
      </Text>
      <Text
        style={{
          fontFamily: "outfit",
          fontSize: 15,
          marginBottom: 5,
          lineHeight: 20,
        }}
      >
        <Text style={{ fontWeight: "bold" }}>Departure Airport: </Text>
        {item?.departureAirport}
      </Text>
      <Text
        style={{
          fontFamily: "outfit",
          fontSize: 15,
          marginBottom: 5,
          lineHeight: 20,
        }}
      >
        <Text style={{ fontWeight: "bold" }}>Arrival Airport: </Text>
        {item?.arrivalAirport}
      </Text>
      <Text
        style={{
          fontFamily: "outfit",
          fontSize: 15,
          marginBottom: 5,
          lineHeight: 20,
        }}
      >
        <Text style={{ fontWeight: "bold" }}>Departure Time: </Text>
        {item?.departureTime}
      </Text>
      <Text
        style={{
          fontFamily: "outfit",
          fontSize: 15,
          marginBottom: 5,
          lineHeight: 20,
        }}
      >
        <Text style={{ fontWeight: "bold" }}>Arrival Time: </Text>
        {item?.arrivalTime}
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: "#2ecc71",
          marginVertical: 5,
          textAlign: "justify",
        }}
      >
        <Text style={{ fontWeight: "bold" }}>Flight Price: </Text>
        {item?.flightPrice}
      </Text>
    </View>
  );

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
          width: 280,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 3,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold", color: Colors.blue }}>
          {item.hotelName}
        </Text>
        <Text style={{ fontSize: 14, color: "#7f8c8d" }}>
          {item.hotelAddress}
        </Text>
        <Text
          style={{
            fontSize: 16,
            marginVertical: 8,
            textAlign: "justify",
          }}
        >
          {item.description}
        </Text>
        <Text style={{ fontSize: 16, color: "#2ecc71", marginVertical: 5 }}>
          {item.price}
        </Text>

        <View style={{ flexDirection: "row", marginTop: 5 }}>
          {renderStars(item.rating)}
          <Text style={{ fontSize: 14, marginLeft: 5 }}>({item.rating}/5)</Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView>
      <Image
        source={require("../../assets/images/earth.png")}
        style={{ width: "100%", height: 350, objectFit: "cover" }}
      />
      <View
        style={{
          padding: 15,
          backgroundColor: Colors.white,
          height: "100%",
          marginTop: -30,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}
      >
        <View
          style={{
            paddingBottom: 20,
            borderBottomWidth: 1,
            paddingHorizontal: 2,
            paddingTop: 10,
            borderBottomColor: Colors.green,
          }}
        >
          <Text
            style={{
              fontFamily: "outfit-medium",
              fontSize: 22,
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
                fontSize: 15,
                marginBottom: 5,
                lineHeight: 20,
              }}
            >
              <Text style={{ fontWeight: "bold", color: Colors.darkGray }}>
                Date:
              </Text>
              {formatDate(startDate)} - {formatDate(endDate)}
            </Text>

            <Text
              style={{
                fontFamily: "outfit",
                fontSize: 15,
                marginBottom: 5,
                lineHeight: 20,
              }}
            >
              <Text style={{ fontWeight: "bold", color: Colors.darkGray }}>
                Duration:
              </Text>
              {duration}
            </Text>

            <Text
              style={{
                fontFamily: "outfit",
                fontSize: 15,
                marginBottom: 5,
                lineHeight: 20,
              }}
            >
              <Text style={{ fontWeight: "bold", color: Colors.darkGray }}>
                Travelers:
              </Text>
              {travelType.icon} {travelType.title} ({travelType.people} people)
            </Text>

            <Text
              style={{
                fontFamily: "outfit",
                fontSize: 15,
                marginBottom: 5,
                lineHeight: 20,
              }}
            >
              <Text style={{ fontWeight: "bold", color: Colors.darkGray }}>
                Budget:
              </Text>
              {budget.icon} {budget.title}
            </Text>

            <Text
              style={{
                fontFamily: "outfit",
                fontSize: 15,
                marginBottom: 5,
                lineHeight: 20,
              }}
            >
              <Text style={{ fontWeight: "bold", color: Colors.darkGray }}>
                Best Time to Visit:
              </Text>
              {bestTimeToVisit}
            </Text>
          </View>
        </View>

        <View style={{ marginVertical: 15, marginBottom: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
            Flights Recommendation:
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
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
            Hotels Recommendation:
          </Text>
          <FlatList
            data={hotels}
            renderItem={renderHotelItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={{ marginVertical: 15, marginBottom: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
            DayWise Plan Recommendation:
          </Text>

          {Object.values(itinerary).map((item, index) => (
            <View key={index}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  marginBottom: 5,
                  color: Colors.gray,
                }}
              >
                Day {index + 1}:
              </Text>

              {item.map((event, idx) => (
                <View
                  key={idx}
                  style={{
                    marginBottom: 15,
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
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: Colors.blue,
                    }}
                  >
                    {event.placeName} - {event.time}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      marginVertical: 5,
                      textAlign: "justify",
                    }}
                  >
                    {event.placeDetails}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      textAlign: "justify",
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>
                      Best Time to visit:
                    </Text>
                    {event.bestTime}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>Travel Time: </Text>
                    {event.timeTravel}
                  </Text>
                  <Text
                    style={{
                      paddingTop: 5,
                      fontSize: 14,
                      color: "#2ecc71",
                    }}
                  >
                    <Text style={{ fontWeight: "bold" }}>Price: </Text>
                    {event.price}
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        <View style={{ marginBottom: 15 }}>
          <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
            Important Notes:
          </Text>
          {Object.entries(notes).map(([key, value], index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  color: Colors.blue,
                  marginBottom: 5,
                  textTransform: "capitalize",
                }}
              >
                {key}:
              </Text>
              <Text style={{ fontSize: 14, lineHeight: 20 }}>{value}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
