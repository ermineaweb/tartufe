import React, {useContext, useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {useMutation} from "@apollo/react-hooks";
import {ADD_OWN_WORD, IS_WRITING, TOGGLE_READY, VOTE, WANT_VOTE} from "../../graphql/mutation";
import {UserContext} from "../../context";
import Grid from "@material-ui/core/Grid";
import Words from "../Words";
import Player from "../Player";
import Typography from "@material-ui/core/Typography";
import Writing from "../../assets/img/writing.gif";
import useStyles from "./useStyles";


export default function Board({game, subscribe}) {
    const classes = useStyles();
    const {user} = useContext(UserContext);
    const [error, setError] = useState(null);
    const [ownWord, setOwnWord] = useState("");

    const options = {
        variables: {
            idGame: user.idGame,
            idPlayer: user.id,
            word: ownWord,
            isWriting: false,
        }
    };

    const [toggleReady] = useMutation(TOGGLE_READY, options);
    const [addOwnWord] = useMutation(ADD_OWN_WORD, options);
    const [wantVote] = useMutation(WANT_VOTE, options);
    const [isWriting] = useMutation(IS_WRITING, options);
    const [vote] = useMutation(VOTE);

    useEffect(() => {
        subscribe();
        return () => {
            console.log("on unsub");
        }
    }, [subscribe]);

    const handleToggleReady = () => {
        toggleReady()
            .catch(err => setError(err.toString()));
    };

    const handleAddOwnWord = () => {
        addOwnWord()
            .then(() => setOwnWord(""))
            .then(() => {
                isWriting({variables: {...options.variables, isWriting: false}})
                    .catch(err => setError(err.toString()));
            })
            .catch(err => setError(err.toString()));
    };

    const handleWriting = (e, isAlreadyWriting) => {
        setOwnWord(e.target.value);
        // si le joueur écrit déjà, on n'envoit rien au serveur
        // pour ne pas surcharger en requetes
        if (!isAlreadyWriting) {
            isWriting({variables: {...options.variables, isWriting: true}})
                .catch(err => setError(err.toString()));
        }
    };

    useEffect(() => {
        if (user.id && ownWord === "") {
            isWriting({variables: {...options.variables, isWriting: false}})
                .catch(err => setError(err.toString()));
        }
    }, [ownWord]);

    const handleWantVote = () => {
        wantVote()
            .catch(err => setError(err.toString()));
    };

    const handleVote = (idTartufe) => {
        vote({variables: {...options.variables, idTartufe}})
            .catch(err => setError(err.toString()));
    };

    return (
        <div className={classes.root}>

            {error && <div>{error}</div>}

            {!user.id && <Typography variant="h5">Vous êtes spectateur</Typography>}

            {game.isGameStarted && <Typography variant="h5">Round : {game.round} / {game.roundMax}</Typography>}

            {game.isGameStarted && user.id &&
            <div className={classes.actions}>
                <TextField
                    variant="outlined"
                    value={game.players.find(p => p.id === user.id).secretWord}
                    fullWidth={true}
                    readOnly={true}
                    className={classes.wordInput}
                />
                <TextField
                    variant="outlined"
                    value={ownWord}
                    // on récupère le statut "isWriting" du joueur en cours
                    onChange={(e) => handleWriting(e, game.players.some(p => (p.id === user.id && p.isWriting)))}
                    onKeyDown={(e) => e.key === "Enter" && handleAddOwnWord()}
                    fullWidth={true}
                    disabled={game.isVoteStarted}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddOwnWord}
                    disabled={game.isVoteStarted}
                >
                    Ajouter le mot
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleWantVote}
                    disabled={game.isVoteStarted}
                >
                    Lancer un vote
                </Button>
            </div>
            }

            <div className={classes.players}>
                <Grid container spacing={3}>
                    {game.players.map((player) => (
                        <Grid item key={player.id}>
                            <div className={classes.card}>

                                <Player game={game} player={player}/>

                                <Typography gutterBottom variant="h5" component="h2">
                                    Score : {player.score}
                                </Typography>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {player.isWriting ? <img src={Writing}/> : player.username}
                                </Typography>

                                {game.isGameStarted && <Words words={player.words}/>}

                                {!game.isGameStarted && !game.isGameOver && user.id === player.id &&
                                <Button
                                    variant="contained"
                                    color={player.isReady ? "primary" : "secondary"}
                                    onClick={handleToggleReady}
                                >
                                    {player.isReady ? "Pas prêt" : "  Prêt  "}
                                </Button>
                                }

                                {game.isVoteStarted && user.id !== player.id &&
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleVote(player.id)}
                                >
                                    Voter
                                </Button>
                                }

                            </div>

                        </Grid>
                    ))}
                </Grid>
            </div>

        </div>
    )
};
