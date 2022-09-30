import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

import { Posts, Home } from "../../components";
import Settings from './Settings'

const Tabs = createBottomTabNavigator();

export default function HomeNavigator() {
  return (
    <Tabs.Navigator
      initialRouteName="Home"
      sceneContainerStyle={{ height: 100 }}
      detachInactiveScreens={true}
      screenOptions={{ lazy: true }}
    >
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="home" size={24} color={color} />
          ),
          tabBarActiveTintColor: "#f43f5e",
          tabBarStyle: {
            height: 85,
            borderColor: "none",
            padding: 20,
            paddingBottom: 20,
            borderTopEndRadius: 15,
            borderTopLeftRadius: 15,
          },
          tabBarShowLabel: false,
        }}
      />

      <Tabs.Screen
        name="Posts"
        component={Posts}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="calendar-day" size={24} color={color} />
          ),
          tabBarActiveTintColor: "#f43f5e",

          tabBarStyle: {
            height: 85,
            borderColor: "none",
            padding: 20,
            paddingBottom: 20,
            borderTopEndRadius: 15,
            borderTopLeftRadius: 15,
          },
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name="SettingsStack"
        component={Settings}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" size={24} color={color} />
          ),
          tabBarActiveTintColor: "#f43f5e",
          tabBarStyle: {
            height: 85,
            borderColor: "none",
            padding: 20,
            paddingBottom: 20,
            borderTopEndRadius: 15,
            borderTopLeftRadius: 15,
          },
          tabBarShowLabel: false,
        }}
      />
    </Tabs.Navigator>
  );
}
