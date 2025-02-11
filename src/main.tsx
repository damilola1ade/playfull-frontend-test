import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router } from "react-router-dom";
import { App } from "./App";

const client = new ApolloClient({
  uri: "http://localhost:8080/v1/graphql",
  cache: new InMemoryCache(),
  headers: {
    "x-hasura-admin-secret": "abcd1234",
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </StrictMode>
);
