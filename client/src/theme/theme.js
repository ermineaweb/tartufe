import React from "react";
import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider} from "@material-ui/styles";

const theme = createMuiTheme({
    palette: {
        type: "dark",
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
        typography: {
            fontSize: 14,
            button: {
                fontWeight: 500,
                fontSize: "0.875rem",
                lineHeight: 1.75,
                letterSpacing: "0.02857em",
                textTransform: 'inherit',
            },
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
