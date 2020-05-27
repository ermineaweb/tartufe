import React from 'react';
import useStyles from "./useStyles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

const HOST_URL = process.env.HOST_URL || "http://tartufe.ermineaweb.fr/";

export default function LobbyInfo({game}) {
    const classes = useStyles();

    return (
        <div className={classes.root}>

            <Typography variant="h6" color="primary">
                {game.players.length} / {game.playerMax} Joueurs
            </Typography>
            <TextField
                variant="standard"
                color="primary"
                value={game.id}
                readOnly={true}
                label={"ID"}
                onFocus={(e) => e.target.select()}
            />
            <TextField
                variant="standard"
                color="primary"
                value={HOST_URL + game.id}
                readOnly={true}
                label={"ID"}
                onFocus={(e) => e.target.select()}
            />
        </div>
    );
}
