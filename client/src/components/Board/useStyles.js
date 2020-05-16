import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: "center",
        padding:"10px 20px",
        margin: "100px auto",
        '& > *': {
            margin: "15px auto",
        },
    },
    players: {
        textAlign: "center",
        width: "100%",
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