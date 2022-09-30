import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView, View, Text } from "react-native";
import { AppContext } from "../context/AppContext";

import Landing from "./landing";
import App from "./homescreen/App";

const Navigation = () => {
  const { authLoading, authState } = useContext(AppContext);
  console.log("authStates: ", authState);
  
  const render = () => {
    if (authLoading) {
      return (
        <SafeAreaView>
          <View>
            <Text>Loading</Text>
          </View>
        </SafeAreaView>
      );
    }

    if (authState.user) {
      return <App />;
    }

    if (!authState?.user) {
      return <Landing />;
    }
  };

  return <NavigationContainer>{render()}</NavigationContainer>;
};

export default Navigation;
