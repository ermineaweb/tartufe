import React, {useContext, useEffect, useState} from 'react';
import useStyles from "./useStyles";
import TextField from "@material-ui/core/TextField";
import {UserContext} from "../../../context";
import Typography from "@material-ui/core/Typography";
import ding from "../../../assets/sounds/ding.mp3";
import Sound from "react-sound";

export default function PlayerInput({game, handleWriting, handleAddWord, word}) {
    const classes = useStyles();
    const {user} = useContext(UserContext);
    const [playSound, setPlaySound] = useState(false);
    const isPlaying = game?.players?.find(p => p.id === user.id)?.isPlaying;

    useEffect(() => {
        if (isPlaying) {
            setPlaySound(true);
        }
    }, [isPlaying]);

    return (
        <div className={classes.root}>

            {game.players.find(p => p.id === user.id).isTartufe ?
                <>
                    {game.mode === 1 &&
                    <>
                        <Typography variant="h6" color="primary">
                            Vous êtes le Menteur, vous devez passer inaperçu.
                        </Typography>
                        <Typography variant="h6" color="primary">
                            Vous pouvez influencer les votes en faisant semblant de voter.
                        </Typography>
                    </>
                    }
                    {game.mode === 2 &&
                    <Typography variant="h5" color="primary">
                        {game.wordTartufe}
                    </Typography>
                    }
                </>
                :
                <Typography variant="h5" color="primary">
                    {game.wordPlebe}
                </Typography>
            }

            {playSound &&
            <Sound
                volume={30}
                url={ding}
                playStatus={Sound.status.PLAYING}
                onFinishedPlaying={() => setPlaySound(false)}
            />
            }

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
        </div>
    );
}
