import React from 'react';
import useStyles from "./useStyles";
import Typography from "@material-ui/core/Typography";
import {NavLink} from "react-router-dom";

export default function GameInfo({game}) {
    const classes = useStyles();

    return (
        <div className={classes.root}>

            {game.isGameOver &&
            <>
                <NavLink to={"/"}>
                    <Typography variant="h4" color="primary">
                        GAME OVER
                    </Typography>
                </NavLink>
                {game.players
                    .sort((a, b) => b.score - a.score)
                    .map((player, index) =>
                        <Typography key={player.id} variant="h6" color="primary">
                            {index + 1}. {player.username} - {player.score}
                        </Typography>
                    )}
            </>
            }

            <Typography variant="subtitle1" color="primary">
                Les enquêteurs avaient le mot <strong>"{game.wordPlebe}"</strong>
            </Typography>
            <Typography variant="subtitle1" color="primary">
                Le Tartufe était : <strong>{game.players.find(p => p.isTartufe).username}</strong>
                {game.mode === 2 && <>, il avait le mot : <strong>"{game.wordTartufe}"</strong></>}
            </Typography>
            <Typography variant="subtitle1" color="primary">
                Les détectives qui ont démasqué le Tartufe sont :
            </Typography>
            <Typography variant="subtitle1" color="primary">
                {game.players.filter(p => {
                    const tartufe = game.players.find(p => p.isTartufe);
                    return p.ownVote === tartufe.id;
                }).map((p) =>
                    <strong key={p.id}>
                        {" " + p.username + " "}
                    </strong>
                )}
            </Typography>

        </div>
    );
}
