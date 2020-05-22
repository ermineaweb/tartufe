import React from "react";
import useStyles from "./useStyles";
import Typography from "@material-ui/core/Typography";


export default function Footer() {
    const classes = useStyles();

    const mail = "mailto" + ":" + "ermineaweb" + "@" + "gmail.com";

    return (
        <div className={classes.root}>
            <a href={mail}>
                <Typography variant="body2" color="primary">
                    Contact
                </Typography>
            </a>
        </div>
    )
}
