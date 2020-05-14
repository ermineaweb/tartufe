import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";

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
}));

export default function Rules() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant="h5">Règles de jeu</Typography>
            <div>
                A venir
            </div>
        </div>
    )
}