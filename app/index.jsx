import { View } from "react-native";
import Landing from "../components/Landing";
import { auth } from "../configs/FirebaseConfig";
import { Redirect } from "expo-router";

const App = () => {
  const user = auth.currentUser;

  return <View>{user ? <Redirect href={"/mytrip"} /> : <Landing />}</View>;
};

export default App;
