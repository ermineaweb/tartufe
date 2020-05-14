import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "100px auto",
        width: "450px",
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
            <Typography variant="body1">
                A chaque round, les joueurs ont un MOT SECRET.
            </Typography>
            <Typography>
                Le seul joueur qui a un mot différent est le TARTUFE.
            </Typography>
            <Typography variant="body1">
                Les autres joueurs sont la PLEBE.
            </Typography>
            <Typography variant="body1">
                La PLEBE doit deviner qui est le TARTUFE, en écrivant une liste de mots.
            </Typography>
            <Typography variant="body1">
                Les mots peuvent être ce que vous voulez, mais ne doivent pas indiquer directement le MOT SECRET.
            </Typography>
            <Typography variant="body1">
                A n'importe quel instant, les joueurs peuvent lancer un vote.
            </Typography>
            <Typography variant="body1">
                Il faut la majorité pour que le vote soit lancé.
            </Typography>
            <Typography variant="body1">
                Les joueurs votent et les points sont calculés :
            </Typography>
            <Typography variant="body1">
                1 point par joueur qui découvre le TARTUFE, pour la PLEBE
            </Typography>
            <Typography variant="body1">
                1 point par joueur qui ne découvre pas le TARTUFE, pour le TARTUFE
            </Typography>
            <Typography variant="body1">
                Si le TARTUFE se découvre, il gagne un BONUS !
            </Typography>
        </div>
    )
}