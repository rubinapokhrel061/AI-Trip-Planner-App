import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import { Picker } from "@react-native-picker/picker";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";
import {
  selectBudgeOptions,
  SelectTravelesList,
} from "../../constants/Options";
import { CreateTripContext } from "../../context/CreateTripContext";
import Toast from "react-native-toast-message";

export default function UpdateTrip() {
  const { trip } = useLocalSearchParams();
  const parsedTrip = JSON.parse(trip);
  const data = JSON.parse(parsedTrip?.tripData);
  const Budget = data.budget;

  const TravelType = data.travelType;

  const navigation = useNavigation();
  const router = useRouter();
  const [travelType, setTravelType] = useState(TravelType);
  const [budget, setBudget] = useState(Budget);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [place, setPlace] = useState("");
  const [country, setCountry] = useState("");
  const { tripData, setTripData } = useContext(CreateTripContext);
  const [totalNoOfDays, setTotalNoOfDays] = useState(0);
  const [id, setId] = useState(parsedTrip.id);
  console.log(id);
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Update this Trip",
      headerStyle: {
        backgroundColor: Colors.white,
      },
    });
  }, []);

  useEffect(() => {
    if (trip) {
      setPlace(data?.place);
      setCountry(data?.country);
    }
  }, [trip]);
  console.log(travelType);
  const onDateChange = (date, type) => {
    if (type === "START_DATE") {
      setStartDate(moment(date));
    } else {
      setEndDate(moment(date));
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      if (startDate.isSame(endDate, "day")) {
        setTotalNoOfDays(1);
      } else {
        let days = endDate.diff(startDate, "days");
        setTotalNoOfDays(days + 1);
      }
    }
  }, [startDate, endDate]);

  useEffect(() => {
    setTripData({
      place,
      travelType,
      budget,
      startDate,
      endDate,
      totalNoOfDays,
      country,
      id,
    });
  }, [
    place,
    travelType,
    budget,
    startDate,
    endDate,
    country,
    totalNoOfDays,
    id,
  ]);

  const handleSubmit = () => {
    if (!place) {
      Toast.show({
        type: "error",
        text1: "Please enter a place",
      });
      return;
    }

    if (!country) {
      Toast.show({
        type: "error",
        text1: "Please enter the country where the place is located",
      });
      return;
    }

    if (!travelType) {
      Toast.show({
        type: "error",
        text1: "Please select a travel type",
      });
      return;
    }

    if (!budget) {
      Toast.show({
        type: "error",
        text1: "Please select a budget",
      });
      return;
    }

    if (!startDate && !endDate) {
      Toast.show({
        type: "error",
        text1: "Please select a date range",
      });
      return;
    }

    if (startDate && !endDate) {
      setEndDate(startDate);
    }

    setTripData({
      place,
      travelType,
      budget,
      startDate,
      endDate,
      totalNoOfDays,
      country,
      id,
    });

    Toast.show({
      type: "success",
      text1: "Trip Data Stored Successfully!",
    });

    router.push("/update-trip/review-updatetrip");
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>Place:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your dream place"
          value={place}
          onChangeText={setPlace}
        />
      </View>

      <View style={styles.inputWrapper}>
        <Text style={styles.label}>Country:</Text>
        <TextInput
          style={styles.input}
          placeholder="The country where the place is located"
          value={country}
          onChangeText={setCountry}
        />
      </View>

      <View style={styles.inputWrapper}>
        <Text style={styles.label}>Choose your travelers:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={travelType}
            onValueChange={(itemValue) => setTravelType(itemValue)}
            style={styles.picker}
          >
            {SelectTravelesList.map((item) => (
              <Picker.Item
                key={item.id}
                label={`${item.title} ${item.icon}`}
                value={item}
              />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.inputWrapper}>
        <Text style={styles.label}>Select Dates:</Text>
        <CalendarPicker
          onDateChange={onDateChange}
          allowRangeSelection={true}
          minDate={new Date()}
          maxRangeDuration={7}
          selectedRangeStyle={{
            backgroundColor: Colors.blue,
          }}
          selectedDayTextStyle={{
            color: Colors.white,
          }}
        />
      </View>

      <View style={styles.inputWrapper}>
        <Text style={styles.label}>Choose your budget:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={budget}
            onValueChange={(itemValue) => setBudget(itemValue)}
            style={styles.picker}
          >
            {selectBudgeOptions.map((item) => (
              <Picker.Item
                key={item.id}
                label={`${item.title} ${item.icon}`}
                value={item}
              />
            ))}
          </Picker>
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    padding: 15,
    paddingTop: 20,
    backgroundColor: Colors.white,
    flexGrow: 1,
  },
  inputWrapper: {
    marginBottom: 25,
  },
  label: {
    fontFamily: "outfit-medium",
    fontSize: 16,
    color: Colors.primary,
    marginBottom: 10,
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.blue,
    fontFamily: "outfit",
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.blue,
  },
  picker: {
    fontFamily: "outfit",
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: Colors.blue,
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    marginVertical: 5,
    marginBottom: 20,
  },
  submitButtonText: {
    fontFamily: "outfit",
    fontSize: 18,
    color: Colors.white,
  },
});
