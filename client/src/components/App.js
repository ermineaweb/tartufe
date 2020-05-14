import React from "react";
import Router from "../router";
import CssBaseline from "@material-ui/core/CssBaseline";
import UserContextProvider from "../context";
import ApolloClientProvider from "../graphql";


export default function App() {

    return (
        <ApolloClientProvider>
            <UserContextProvider>
                <CssBaseline/>
                <Router/>
            </UserContextProvider>
        </ApolloClientProvider>
    )
}
