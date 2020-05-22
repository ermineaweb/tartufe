import React, {useContext} from 'react';
import useStyles from "./useStyles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import {UserContext} from "../../../context";

export default function PlayerInfo({game}) {
    const classes = useStyles();
    const {user} = useContext(UserContext);

    return (
        <div className={classes.root}>

            {game.isGameStarted ?
                <>
                    {game.players.find(p => p.id === user.id).isTartufe ?
                        <>
                            <Typography variant="h6" color="primary">
                                Vous êtes le Menteur, vous devez passer inaperçu.
                            </Typography>
                            <Typography variant="h6" color="primary">
                                Vous pouvez influencer les votes en faisant semblant de voter.
                            </Typography>
                        </>
                        :
                        <Typography variant="h5" color="primary">
                            {game.wordPlebe}
                        </Typography>
                    }

                </>
                :
                <>
                    {!game.isGameOver &&
                    <>
                        <Typography variant="h6" color="primary">
                            {game.players.length} / {game.playerMax} Joueurs
                        </Typography>
                        <TextField
                            variant="standard"
                            color="primary"
                            value={game.id}
                            readOnly={true}
                            className={classes.wordInput}
                            label={"ID"}
                            onFocus={(e) => e.target.select()}
                        />
                    </>
                    }
                </>
            }

        </div>
    );
}
