import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        height: '100vh',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",


        backgroundColor: "#ffffff",

        textAlign: "center",
        padding:"10px 20px",
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