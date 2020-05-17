import {createMuiTheme} from "@material-ui/core/styles";


export default createMuiTheme({
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
        text: {
            primary:  "#ffffff",
            secondary:  "#ffffff",
            disabled:  "#ffffff",
        },
        background: {
            paper: "",
            default: "",
        },
        action: {
            active: "",
            hover: "",
            hoverOpacity: 0.08,
            selected: "rgba(255, 255, 255, 0.16)",
            selectedOpacity: 0.16,
            disabled: "rgba(255, 255, 255, 0.3)",
            disabledBackground: "rgba(255, 255, 255, 0.3)",
            disabledOpacity: 0.38,
            focus: "rgba(255, 255, 255, 0.12)",
            focusOpacity: 0.12,
            activatedOpacity: 0.24,
        },
    },
    typography: {
        fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif\"",
        fontSize: 14,
        h1: {
            fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif\"",
            fontWeight: 300,
            fontSize: "6rem",
            lineHeight: 1.167,
            letterSpacing: "-0.01562em",
        },
        h2: {
            fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif\"",
            fontWeight: 300,
            fontSize: "3.75rem",
            lineHeight: 1.2,
            letterSpacing: "-0.00833em",
        },
        h3: {
            fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif\"",
            fontWeight: 400,
            fontSize: "3rem",
            lineHeight: 1.167,
            letterSpacing: "0em",
        },
        h4: {
            fontFamily: "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif\"",
            fontWeight: 400,
            fontSize: "3rem",
            lineHeight: 1.167,
            letterSpacing: "0em",
        },
    }

});
