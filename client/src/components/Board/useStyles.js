import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: "center",
        margin: "100px auto",
        '& > *': {
            margin: "10px 0px",
        },
    },
    players: {
        textAlign: "center",
        width: "100%",
    },
    actions: {
        margin: "0 auto",
        height:"10vh",
    },
    card: {
        textAlign: "center",
        width: "150px",
    },
    wordInput: {
        '& > *': {
            margin: "0 auto",
        },
        fontSize: "1.2em",
    },
}));

export default useStyles;