import React from "react";
import { TailwindProvider } from "tailwindcss-react-native";
import { ApolloProvider } from "@apollo/client";
import { AppRegistry } from "react-native";

import Navigation from "./src/navigation";
import { Provider } from "./src/context/AppContext";
import client from "./src/lib/apollo";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <TailwindProvider>
        <Provider>
          <Navigation />
        </Provider>
      </TailwindProvider>
    </ApolloProvider>
  );
}

AppRegistry.registerComponent("main", () => App);
