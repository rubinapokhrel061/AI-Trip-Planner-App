import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

export default function Login() {
  return (
    <View>
      <View
        style={{
          width: "100%",
          height: 420,
          backgroundColor: Colors.white,
        }}
      >
        <Image
          source={require("./../assets/images/login.jpg")}
          style={{
            width: "100%",
            height: "100%",
          }}
          resizeMode="contain"
        />
      </View>

      <View
        style={{
          height: "100%",
          marginTop: -20,
          backgroundColor: "rgb(221, 229, 246)",
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          padding: 20,
          alignItems: "center",
          paddingTop: 40,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontFamily: "outfit-bold",

            color: Colors.primary,
            marginVertical: 20,
          }}
        >
          AI Trip Planner
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "outfit",

            color: Colors.primary,
            lineHeight: 25,
            marginBottom: 40,
          }}
        >
          Create your perfect journey with ease. Access custom itineraries and
          let AI provide intelligent travel recommendations for a more efficient
          and enjoyable trip.
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: Colors.primary,
            paddingVertical: 15,
            paddingHorizontal: 30,
            borderRadius: 30,
            flexDirection: "row",
            marginTop: 30,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontFamily: "outfit-bold",
              color: Colors.white,
            }}
          >
            Get Started
          </Text>
          <Text
            style={{
              fontSize: 18,
              fontFamily: "outfit-bold",
              color: Colors.white,
              marginLeft: 10,
            }}
          >
            →
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
