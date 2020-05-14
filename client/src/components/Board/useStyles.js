import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "100px auto",
        width: "800px",
        '& > *': {
            margin: "10px",
            width: "100%",
            heigth: "100%",
            textAlign: "center",
        },
    },
    dialog: {
        padding: 50,
        overflow: "hidden",
    },
    players: {
        textAlign: "center",
        margin: "50px",
        width: "100%",
    },
    actions: {
        margin: "0 auto",
        width: 300,
        '& > *': {
            margin: "10px",
        }
    },
    card: {
        maxWidth: 300,
    },
    wordInput: {
        '& > *': {
            margin: "0 auto",
        },
        fontSize: "1.2em",
    },
}));

export default useStyles;