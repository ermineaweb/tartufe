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
            <p>
                A chaque round, les joueurs ont un MOT SECRET.
            </p>
            <p>
                Le seul qui a un mot différent est le TARTUFE.
            </p>
            <p>
                Les autres joueurs sont la PLEBE.
            </p>
            <p>
                La PLEBE doit deviner qui est le TARTUFE, en écrivant des mots.
            </p>
            <p>
                Les mots peuvent être ce que vous voulez, mais ne doivent pas indiquer directement le MOT SECRET.
            </p>
            <p>
                A n'importe quel instant, les joueurs peuvent lancer un vote.
            </p>
            <p>
                Il faut la majorité pour que le vote soit lancé.
            </p>
            <p>
                Les joueurs votent et les points sont calculés :
                <ul>
                    <li>
                        1 point par joueur qui découvre le TARTUFE, pour la PLEBE
                    </li>
                    <li>
                        1 point par joueur qui ne découvre pas le TARTUFE, pour le TARTUFE
                    </li>
                    <li>
                        Si le TARTUFE se découvre, il gagne un BONUS !
                    </li>
                </ul>
            </p>
        </div>
    )
}