import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Fab from '@material-ui/core/Fab';


export default function ActionButton({corner = "top-right", ...props}) {

    const DISTANCE = "3%";
    let top, right, left, bottom = "";

    switch (corner) {
        case "top-right":
            top = DISTANCE;
            right = DISTANCE;
            break;
        case "bottom-right":
            bottom = DISTANCE;
            right = DISTANCE;
            break;
        case "top-left":
            top = DISTANCE;
            left = DISTANCE;
            break;
        case "bottom-left":
            bottom = DISTANCE;
            left = DISTANCE;
            break;
        default:
    }

    const useStyles = makeStyles(() => ({
        fab: {
            position: 'fixed',
            top: top,
            right: right,
            bottom: bottom,
            left: left,
            zIndex: "1",
            width: "100px",
            height: "100px",
        },
    }));

    const classes = useStyles();

    return (
        <Fab  {...props} className={classes.fab}>
            {props.children}
        </Fab>
    )
}
