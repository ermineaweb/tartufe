import React from "react";
import {ApolloProvider} from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import Router from "../router";
import CssBaseline from "@material-ui/core/CssBaseline";
import {WebSocketLink} from 'apollo-link-ws';
import {ApolloLink, split} from "apollo-link";
import {HttpLink} from "apollo-link-http";
import {InMemoryCache} from "apollo-cache-inmemory";


const httpLink = new HttpLink({
    uri: 'http://localhost:4000/graphql'
});

const wsLink = new WebSocketLink({
    uri: 'ws://localhost:4000/graphql',
    options: {
        reconnect: true,
    }
});

const terminatingLink = split(
    ({query: {definitions}}) =>
        definitions.some(node => {
            const {kind, operation} = node;
            return kind === 'OperationDefinition' && operation === 'subscription';
        }),
    wsLink,
    httpLink,
);

const link = ApolloLink.from([terminatingLink]);

const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
});


const App = () => (
    <ApolloProvider client={client}>
        <CssBaseline/>
        <Router/>
    </ApolloProvider>
);

export default App;