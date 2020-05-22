import React, {useContext} from 'react';
import useStyles from "./useStyles";
import TextField from "@material-ui/core/TextField";
import {UserContext} from "../../../context";

export default function PlayerInput({game, handleWriting, handleAddWord, word}) {
    const classes = useStyles();
    const {user} = useContext(UserContext);

    return (
        <div className={classes.root}>

            {game.isGameStarted &&
            <TextField
                variant="outlined"
                color="primary"
                autoFocus={true}
                value={
                    game.isVoteStarted ?
                        "Votez !"
                        :
                        game.players.find(p => p.id === user.id).isPlaying ?
                            word
                            :
                            "Au tour de " + game.players.find(p => p.isPlaying).username
                }
                // on récupère le statut "isWriting" du joueur en cours
                onChange={(e) => handleWriting(e, game.players.some(p => (p.id === user.id && p.isWriting)))}
                onKeyDown={(e) => e.key === "Enter" && handleAddWord()}
                disabled={game.isVoteStarted || !game.players.find(p => p.id === user.id).isPlaying}
                error={game.players.find(p => p.id === user.id).isPlaying}
            />
            }

        </div>
    );
}
