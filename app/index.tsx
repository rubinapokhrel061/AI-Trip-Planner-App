import { StyleSheet, Text, View } from "react-native";

const App = () => {
  return (
    <View>
      <Text style={styles.title}>AI Trip Planner App 📱</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: 800,
    fontFamily: "outfit",
    margin: 40,
    color: "#228b22",
  },
});

export default App;
