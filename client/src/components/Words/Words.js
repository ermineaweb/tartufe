import React from "react";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
    root: {
        margin: "15px auto",
    },
}));


export default function Words({words}) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {words.map((word, index) => (
                <Typography key={index}>
                    {word}
                </Typography>
            ))}
        </div>
    )
}