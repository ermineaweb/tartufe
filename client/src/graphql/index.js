import {HttpLink} from "apollo-link-http";
import {WebSocketLink} from "apollo-link-ws";
import {split} from "apollo-link";
import {getMainDefinition} from "apollo-utilities";
import ApolloClient from "apollo-client";
import {InMemoryCache} from "apollo-cache-inmemory";
import {ApolloProvider} from "@apollo/react-hooks";
import React from "react";

const API_ROUTE = process.env.API_ROUTE || "/graphql";
const PORT = process.env.PORT || 4000;
const HOST_HTTP = process.env.HOST_HTTP || "localhost";
const HOST_WS = process.env.HOST_WS || "localhost";

const httpLink = new HttpLink({
    uri: `http://${HOST_HTTP}:${PORT}${API_ROUTE}`,
});

const wsLink = new WebSocketLink({
    uri: `ws://${HOST_WS}:${PORT}${API_ROUTE}`,
    options: {
        reconnect: true,
    }
});

const link = split(
    ({query}) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);

const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
});

export default function ApolloClientProvider(props) {
    return (
        <ApolloProvider client={client}>
            {props.children}
        </ApolloProvider>
    )
}