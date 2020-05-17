import React from "react";
import {ThemeProvider} from "@material-ui/styles";
import theme from "./themeA";


export default function ThemeAppProvider(props) {
    return (
        <ThemeProvider theme={theme}>
            {props.children}
        </ThemeProvider>
    )
}