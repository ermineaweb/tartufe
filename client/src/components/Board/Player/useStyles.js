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
        width: "140px",
        height: "140px",
        margin: "0 auto",
    },
}));

export default useStyles;