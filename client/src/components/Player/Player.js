import React, {useContext, useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useMutation} from "@apollo/react-hooks";
import {TOGGLE_READY} from "../../graphql";
import {UserContext} from "../../context";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "100px auto",
        width: "300px",
        '& > *': {
            margin: "10px",
            width: "100%",
            heigth: "100%",
            textAlign: "center",
        },
    },
    dialog: {
        padding: 50,
        overflow: "hidden",
    }
}));

export default function Player({player}) {
    const classes = useStyles();

    return (
        <div className={classes.root}>

        </div>
    )
}