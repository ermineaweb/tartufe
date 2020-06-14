import React from "react";
import Router from "../router";
import CssBaseline from "@material-ui/core/CssBaseline";
import UserContextProvider from "../context";
import ApolloClientProvider from "../graphql";
import ThemeAppProvider from "../theme";
import {NotificationProvider} from "../stores/notificationStore";


export default function App() {

    return (
        <ApolloClientProvider>
            <UserContextProvider>
                <NotificationProvider>
                    <CssBaseline/>
                    <ThemeAppProvider>
                        <Router/>
                    </ThemeAppProvider>
                </NotificationProvider>
            </UserContextProvider>
        </ApolloClientProvider>
    )
}
