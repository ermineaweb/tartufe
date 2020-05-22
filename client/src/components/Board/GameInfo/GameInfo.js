import React, {useEffect, useState} from 'react';
import useStyles from "./useStyles";
import Typography from "@material-ui/core/Typography";
import {NavLink} from "react-router-dom";

export default function GameInfo({game}) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {!game.isGameStarted && game.round > 1 &&

            <>

                {game.isGameOver &&
                <>
                    <Typography variant="h4" color="primary">
                        GAME OVER
                    </Typography>
                    <Typography variant="h4" color="primary">
                        Scores
                    </Typography>
                    {game.players
                        .sort((a, b) => b.score - a.score)
                        .map(player =>
                            <Typography key={player.id} variant="h6" color="primary">
                                {player.username} - {player.score}
                            </Typography>
                        )}
                    <NavLink to={"/"}>
                        <Typography variant="h3" color="primary">
                            Accueil
                        </Typography>
                    </NavLink>
                </>
                }

                <Typography variant="h6" color="primary">
                    Les enquêteurs avaient le mot <strong>"{game.wordPlebe}"</strong>
                </Typography>
                <Typography variant="h6" color="primary">
                    Le Tartufe était <strong>{game.players.find(p => p.isTartufe).username}</strong>
                </Typography>
                <Typography variant="h6" color="primary">
                    Les enquêteurs qui ont démasqué le Tartufe sont :
                </Typography>
                <Typography variant="h6" color="primary">
                    {game.players.filter(p => {
                        const tartufe = game.players.find(p => p.isTartufe);
                        return p.ownVote === tartufe.id;
                    }).map((p) =>
                        <strong key={p.id}>
                            {" " + p.username + " "}
                        </strong>
                    )}
                </Typography>

            </>

            }
        </div>
    );
}
