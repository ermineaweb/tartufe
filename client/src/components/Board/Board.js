import React, {useContext, useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {useMutation} from "@apollo/react-hooks";
import {
    ADD_OWN_WORD,
    IS_WRITING,
    LEAVE_GAME,
    TOGGLE_READY,
    TOGGLE_WANT_VOTE,
    VOTE,
} from "../../graphql/mutation";
import {UserContext} from "../../context";
import Grid from "@material-ui/core/Grid";
import Words from "../Words";
import Player from "../Player";
import Typography from "@material-ui/core/Typography";
import Writing from "../../assets/img/writing.gif";
import useStyles from "./useStyles";
import Score from "../Score";


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
    const [leaveGame] = useMutation(LEAVE_GAME, options);
    const [toggleWantVote] = useMutation(TOGGLE_WANT_VOTE, options);
    const [isWriting] = useMutation(IS_WRITING, options);
    const [vote] = useMutation(VOTE);

    useEffect(() => {
        subscribe();
    }, [subscribe]);

    useEffect(() => {
        return () => {
            if (!!user.id) {
                console.log("user leave game")
                leaveGame()
                    .catch(err => setError(err.toString()));
            }
        }
    }, []);

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

    const handleToggleWantVote = () => {
        toggleWantVote()
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

            {game.isGameOver &&
            <Typography gutterBottom variant="h2">
                GAME OVER
            </Typography>
            }

            {game.isGameStarted ?
                <Typography variant="h5">ROund {game.round} / {game.roundMax}</Typography>
                :
                <>
                    <Typography variant="h5">{game.players.length} / {game.playerMax} Joueurs</Typography>
                    <TextField
                        variant="outlined"
                        value={game.id}
                        readOnly={true}
                        className={classes.wordInput}
                        fullWidth={true}
                        label={"ID"}
                        onFocus={(e) => e.target.select()}
                    />
                </>
            }

            {game.isGameStarted && !!user.id &&
            <div className={classes.actions}>
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
            </div>
            }

            <Grid container>
                <Grid item xs={2}>
                    <Score game={game}/>
                </Grid>
                <Grid item xs={10}>
                    <div className={classes.players}>
                        <Grid container spacing={3}>
                            {game.players.map((player) => (
                                <Grid item key={player.id}>
                                    <div className={classes.card}>

                                        <Typography gutterBottom variant="h6">
                                            {player.isWriting && !game.isVoteStarted ?
                                                <img src={Writing}/> : player.username}
                                        </Typography>

                                        <Player game={game} player={player}/>

                                        {player.secretWord && ((game.isGameStarted && (player.id === user.id || !user.id)) || (!game.isGameStarted)) &&
                                        // ceux qui voient les mots secrets
                                        // sont le joueur actif si la game est lancée
                                        // tous les joueurs si on est en phase de fin de round ou gameover
                                        // les spectateurs
                                        <Typography gutterBottom variant="body2">
                                            <strong>{player.secretWord}</strong>
                                        </Typography>
                                        }

                                        {game.isVoteStarted &&
                                        game.players.find(p => p.id === user.id).ownVote !== player.id &&
                                        < Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleVote(player.id)}
                                        >
                                            Voter
                                        </Button>
                                        }

                                        {!game.isVoteStarted && game.isGameStarted && player.id === user.id &&
                                        <>
                                            {player.wantVote ?
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={handleToggleWantVote}
                                                >
                                                    Annuler le vote
                                                </Button>
                                                :
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    onClick={handleToggleWantVote}
                                                >
                                                    Lancer le vote !
                                                </Button>
                                            }
                                        </>
                                        }

                                        {!game.isGameStarted && !game.isGameOver && user.id === player.id &&
                                        <Button
                                            variant="contained"
                                            color={player.isReady ? "primary" : "secondary"}
                                            onClick={handleToggleReady}
                                        >
                                            {player.isReady ? "Pas prêt" : "  Prêt  "}
                                        </Button>
                                        }

                                        {game.isGameStarted && <Words words={player.words}/>}

                                    </div>

                                </Grid>
                            ))}
                        </Grid>
                    </div>
                </Grid>
            </Grid>


        </div>
    )
};
