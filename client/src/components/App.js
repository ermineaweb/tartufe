import React, {useState} from "react";
import {ApolloProvider} from '@apollo/react-hooks';
import ApolloClient from "apollo-client";
import Router from "../router";
import CssBaseline from "@material-ui/core/CssBaseline";
import {WebSocketLink} from 'apollo-link-ws';
import {split} from "apollo-link";
import {HttpLink} from "apollo-link-http";
import {InMemoryCache} from "apollo-cache-inmemory";
import {getMainDefinition} from "apollo-utilities";
import UserContextProvider, {UserContext} from "../context";

const httpLink = new HttpLink({
    uri: 'http://localhost:4000/graphql'
});

const wsLink = new WebSocketLink({
    uri: 'ws://localhost:4000/graphql',
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


export default function App() {

    return (
        <ApolloProvider client={client}>
            <UserContextProvider>
                <CssBaseline/>
                <Router/>
            </UserContextProvider>
        </ApolloProvider>

    )
}
