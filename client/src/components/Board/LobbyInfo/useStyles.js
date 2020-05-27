import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexFlow: "column nowrap",
        alignItems: "center",
        justifyContent: "center",

        height: "25vh",
    },
}));

export default useStyles;