import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Landing, Login } from "../../components";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Landing"
        component={Landing}
        options={{
          headerShown: false,
          statusBarTranslucent: true,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          statusBarTranslucent: true,
          statusBarStyle: "dark",
        }}
      />
    </Stack.Navigator>
  );
}
