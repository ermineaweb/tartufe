import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexFlow: "column nowrap",
        justifyContent: "center",
        alignItems: "center",

        width: 150,

    },
    avatar: {
        width: "12vw",
        height: "12vw",
        margin: "0 auto",
    },
}));

export default useStyles;