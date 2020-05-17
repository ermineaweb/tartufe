import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "100px auto",
        width: "550px",
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
            <Typography variant="h5" color="primary">Règles de jeu</Typography>
            <Typography variant="body1" color="primary">
                A chaque round, les ENQUETEURS ont un MOT SECRET.
            </Typography>
            <Typography variant="body1" color="primary">
                Il y a un traitre, c'est le TARTUFE.
            </Typography>
            <Typography variant="body1" color="primary">
                Les ENQUETEURS doit deviner qui est le TARTUFE, en écrivant chacun leur tour un mot.
            </Typography>
            <Typography variant="body1" color="primary">
                Les mots ne doivent pas indiquer directement le MOT SECRET.
            </Typography>
            <Typography variant="body1" color="primary">
                Lorsque tout le monde a saisi ses mots, le vote a lieu.
            </Typography>
            <Typography variant="body1" color="primary">
                Les points sont calculés :
            </Typography>
            <Typography variant="body1" color="primary">
                200 Points pour le TARTUFE si personne ne le démasque
            </Typography>
            <Typography variant="body1" color="primary">
                100 Points pour le TARTUFE si la majorité ne le démasque pas
            </Typography>
            <Typography variant="body1" color="primary">
                150 Pour l'ENQUETEUR qui démasque seul le TARTUFE
            </Typography>
            <Typography variant="body1" color="primary">
                100 Pour chaque ENQUETEUR qui démasque le TARTUFE
            </Typography>
        </div>
    )
}