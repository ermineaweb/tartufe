import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Games from "../Games";

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

export default function Board({idGame}) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
<Games/>
            <Grid container>
                <Grid item>

                </Grid>
                <Grid item>

                </Grid>
                <Grid item>

                </Grid>
            </Grid>

            <TextField
                variant="outlined"
            />

            <Button variant="contained" color="primary">
                Envoyer
            </Button>

        </div>
    )
}