import React from "react";
import {ApolloProvider} from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import Router from "../router";

const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
});

const App = () => (
    <ApolloProvider client={client}>
        <Router/>
    </ApolloProvider>
);

export default App;