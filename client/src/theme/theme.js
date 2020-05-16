import React from "react";
import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider} from "@material-ui/styles";

const theme = createMuiTheme({
    palette: {
        type: "light",
        primary: {
            main: "#424242",
            light: "#6d6d6d",
            dark: "#1b1b1b",
            contrastText: "#ffffff"
        },
        secondary: {
            main: "#757575",
            light: "#a4a4a4",
            dark: "#494949",
            contrastText: "#ffffff",
        },
    }

});

export default function ThemeAppProvider(props) {
    return (
        <ThemeProvider theme={theme}>
            {props.children}
        </ThemeProvider>
    )
}
