import React from "react";
import Router from "../router";
import CssBaseline from "@material-ui/core/CssBaseline";
import UserContextProvider from "../context";
import ApolloClientProvider from "../graphql";
import ThemeAppProvider from "../theme/theme";


export default function App() {

    return (
        <ApolloClientProvider>
            <UserContextProvider>
                <CssBaseline/>
                <ThemeAppProvider>
                    <Router/>
                </ThemeAppProvider>
            </UserContextProvider>
        </ApolloClientProvider>
    )
}
