import {HttpLink} from "apollo-link-http";
import {WebSocketLink} from "apollo-link-ws";
import {split} from "apollo-link";
import {getMainDefinition} from "apollo-utilities";
import ApolloClient from "apollo-client";
import {InMemoryCache} from "apollo-cache-inmemory";
import {ApolloProvider} from "@apollo/react-hooks";
import React from "react";

// 51.91.97.13
// localhost

const httpLink = new HttpLink({
    uri: 'http://51.91.97.13:4000/graphql'
});

const wsLink = new WebSocketLink({
    uri: 'ws://51.91.97.13:4000/graphql',
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