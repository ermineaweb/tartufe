import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Fab from '@material-ui/core/Fab';


const useStyles = makeStyles(() => ({
    fab: {
        position: 'fixed',
        bottom: 30,
        right: 30,
        zIndex: "1",
        width:"100px",
        height:"100px",
    },
}));

export default function ActionButtonRightBot({...props}) {
    const classes = useStyles();

    return (
        <Fab  {...props} className={classes.fab}>
            {props.children}
        </Fab>
    )
}
