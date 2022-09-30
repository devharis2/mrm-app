import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Settings, MyProfile, CreateMessage } from "../../components";

const Stack = createNativeStackNavigator();
export default function SettingsNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: false,
          statusBarTranslucent: true,
        }}
      />
      <Stack.Screen
        name="MyProfile"
        component={MyProfile}
        options={{
          headerShown: false,
          statusBarTranslucent: true,
        }}
      />
      <Stack.Screen
        name="AddPost"
        component={CreateMessage}
        options={{
          headerShown: false,
          statusBarTranslucent: true,
        }}
      />
    </Stack.Navigator>
  );
}
