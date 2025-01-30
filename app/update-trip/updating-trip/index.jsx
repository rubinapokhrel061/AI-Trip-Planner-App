import { View, Text, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AI_PROMPT } from "../../../constants/Options";
import { chatSession } from "../../../configs/AiModel";
import { useRouter } from "expo-router";
import { CreateTripContext } from "../../../context/CreateTripContext";
import { Colors } from "../../../constants/Colors";
import Toast from "react-native-toast-message";
import { auth, db } from "../../../configs/FirebaseConfig";

import { doc, updateDoc } from "firebase/firestore";
export default function UpdatingTrip() {
  const router = useRouter();
  const { tripData, setTripData } = useContext(CreateTripContext);
  const [loading, setLoading] = useState(false);
  const [tripUpdated, setTripUpdated] = useState(false);
  const user = auth.currentUser;

  useEffect(() => {
    if (tripData && !tripUpdated) {
      UpdatingAiTrip();
    }
  }, [tripUpdated]);

  const UpdatingAiTrip = async () => {
    setLoading(true);
    setTripUpdated(true);

    const FINAL_PROMPT = AI_PROMPT.replace("{place}", tripData.place)
      .replace("{country}", tripData.country)
      .replace("{place}", tripData.place)
      .replace("{totalDays}", tripData.totalNoOfDays)
      .replace("{totalNights}", tripData.totalNoOfDays - 1)
      .replace("{traveler}", tripData?.travelType?.title)
      .replace("{budget}", tripData?.budget?.title)
      .replace("{totalDays}", tripData.totalNoOfDays)
      .replace("{totalNights}", tripData.totalNoOfDays - 1);

    console.log(FINAL_PROMPT);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const response = result.response.text();
      if (response) {
        try {
          const tripDataId = tripData.id;
          const docRef = doc(db, "UserTrips", tripData.id);

          const updateFields = {
            tripPlan: response,

            userEmail: user.email,
            tripData: JSON.stringify(tripData),
            id: tripData.id,
          };

          await updateDoc(docRef, updateFields);

          setTripData([]);

          router.push("(tabs)/mytrip");
          Toast.show({
            type: "success",
            text1: "Trip successfully updated!",
          });
        } catch (error) {
          console.log(error);
          Toast.show({
            type: "error",
            text1: "Error updating data in database",
          });
        }
      } else {
        Toast.show({
          type: "error",
          text1: "Failed to update trip",
        });
      }
    } catch (error) {
      console.error("Error upadte trip:", error);

      Toast.show({
        type: "error",
        text1: "An error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 25,
        paddingTop: 55,
        backgroundColor: Colors.white,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading ? (
        <View style={{ alignItems: "center" }}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text
            style={{
              fontFamily: "outfit-medium",
              fontSize: 20,
              textAlign: "center",
              marginTop: 20,
            }}
          >
            Updating your trip...
          </Text>
        </View>
      ) : (
        <Text
          style={{
            fontFamily: "outfit-medium",
            fontSize: 35,
            textAlign: "center",
          }}
        >
          Please Wait...
        </Text>
      )}
    </View>
  );
}
