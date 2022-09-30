import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  uri: "http://192.168.18.47:4000/graphql",
  cache: new InMemoryCache(),
});

export default apolloClient;
// uri: "https://graphql-endpoint-mrm-production.up.railway.app/graphql",