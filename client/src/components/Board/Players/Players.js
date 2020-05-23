import React, {useContext} from 'react';
import useStyles from "./useStyles";
import {UserContext} from "../../../context";
import Button from "@material-ui/core/Button";
import Player from "../Player";
import Words from "../Words";


export default function Players({game, handleVote}) {
    const classes = useStyles();
    const {user} = useContext(UserContext);

    return (
        <div className={classes.root}>

            {game.players.map((player) => (
                <div key={player.id}>
                    {game.isVoteStarted &&
                    < Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleVote(player.id)}
                        fullWidth={true}
                        disabled={
                            game.players.find(p => p.id === user.id).ownVote === player.id ||
                            game.players.find(p => p.id === user.id).validVote
                        }
                    >
                        Voter
                    </Button>
                    }

                    {!game.isGameOver && <Player game={game} player={player}/>}

                    {game.isGameStarted && <Words words={player.words}/>}

                </div>
            ))}

        </div>
    );
}
