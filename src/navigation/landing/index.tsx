import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Landing from "../../components/Landing";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Landing"
        component={Landing}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
