import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Info } from "../../components";
import Home from "./Tabs";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Stack.Navigator initialRouteName="Info">
      <Stack.Screen
        component={Info}
        name="Info"
        options={{
          headerShown: false,
          statusBarStyle: "dark",
          statusBarTranslucent: true,
        }}
      />
      <Stack.Screen
        component={Home}
        name="App"
        options={{
          headerShown: false,
          statusBarStyle: "dark",
          statusBarTranslucent: true,
        }}
      />
    </Stack.Navigator>
  );
}
