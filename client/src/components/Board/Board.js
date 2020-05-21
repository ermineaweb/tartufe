import React, {createRef, useContext, useEffect, useRef, useState} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {useMutation} from "@apollo/react-hooks";
import {
    ADD_OWN_WORD,
    IS_WRITING,
    LEAVE_GAME,
    TOGGLE_READY,
    VALID_VOTE,
    VOTE,
} from "../../graphql/mutation";
import {UserContext} from "../../context";
import Grid from "@material-ui/core/Grid";
import Words from "../Words";
import Player from "../Player";
import Typography from "@material-ui/core/Typography";
import useStyles from "./useStyles";
import Score from "../Score";
import {useHistory} from "react-router";
import ActionButtonRightTop from "../ActionButton/ActionButtonRightTop";
import ActionButtonRightBot from "../ActionButton/ActionButtonRightBot";
import Rules from "../Rules";
import {NavLink} from "react-router-dom";


export default function Board({game, subscribe}) {
    const classes = useStyles();
    const {user} = useContext(UserContext);
    const [error, setError] = useState(null);
    const [word, setWord] = useState("");
    const [openRules, setOpenRules] = useState(false);
    const history = useHistory();

    const options = {
        variables: {
            idGame: user.idGame,
            idPlayer: user.id,
            word: word,
            isWriting: false,
        }
    };

    const [toggleReady] = useMutation(TOGGLE_READY, options);
    const [addWord] = useMutation(ADD_OWN_WORD, options);
    const [leaveGame] = useMutation(LEAVE_GAME, options);
    const [validVote] = useMutation(VALID_VOTE, options);
    const [isWriting] = useMutation(IS_WRITING, options);
    const [vote] = useMutation(VOTE);

    useEffect(() => {
        subscribe();
    }, [subscribe]);

    useEffect(() => {
        return () => {
            if (!!user.id) {
                leaveGame()
                    .catch(err => setError(err.toString()));
            }
        }
    }, []);

    const handleToggleReady = () => {
        toggleReady()
            .catch(err => setError(err.toString()));
    };

    const handleAddWord = () => {
        addWord()
            .then(() => setWord(""))
            .then(() => {
                isWriting({variables: {...options.variables, isWriting: false}})
                    .catch(err => setError(err.toString()));
            })
            .catch(err => setError(err.toString()));
    };

    const handleWriting = (e, isAlreadyWriting) => {
        setWord(e.target.value);
        // si le joueur écrit déjà, on n'envoit rien au serveur
        // pour ne pas surcharger en requetes
        if (!isAlreadyWriting) {
            isWriting({variables: {...options.variables, isWriting: true}})
                .catch(err => setError(err.toString()));
        }
    };

    useEffect(() => {
        if (word === "") {
            isWriting({variables: {...options.variables, isWriting: false}})
                .catch(err => setError(err.toString()));
        }
    }, [word]);

    const handleValidVote = () => {
        validVote()
            .catch(err => setError(err.toString()));
    };

    const handleVote = (idTartufe) => {
        vote({variables: {...options.variables, idTartufe}})
            .catch(err => setError(err.toString()));
    };

    if (!user.id) {
        history.push("/");
    }

    return (
        <div className={classes.root}>

            {error && <div>{error}</div>}

            {!game.isGameStarted && game.round > 1 &&
            <div className={classes.infos}>
                {game.isGameOver &&
                <>
                    <Typography variant="h3" color="primary">
                        GAME OVER
                    </Typography>
                    <Typography variant="h3" color="primary">
                        Scores
                    </Typography>
                    {game.players
                        .sort((a, b) => b.score - a.score)
                        .map(player =>
                            <Typography key={player.id} variant="h5" color="primary">
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
                <Typography variant="body2" color="primary">
                    Les enquêteurs avaient le mot <strong>"{game.wordPlebe}"</strong>
                </Typography>
                <Typography variant="body2" color="primary">
                    Le Tartufe était <strong>{game.players.find(p => p.isTartufe).username}</strong>
                </Typography>
                <Typography variant="body2" color="primary">
                    Les enquêteurs qui ont démasqué le Tartufe sont :
                </Typography>
                <Typography variant="body2" color="primary">
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
            }

            {game.isGameStarted ?
                <>
                    <Typography variant="h5" color="primary">Round {game.round} / {game.roundMax}</Typography>

                    {game.players.find(p => p.id === user.id).isTartufe ?
                        <>
                            <Typography variant="h5" color="primary">
                                Vous êtes le Menteur, vous devez passer inaperçu.
                            </Typography>
                            <Typography variant="h5" color="primary">
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
                        <Typography variant="h5" color="primary">
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

            <div className={classes.actions}>

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

            <div className={classes.players}>
                <Grid container>

                    <Grid item xs={6}>
                        <Grid container spacing={3}>

                            {game.players.map((player) => (
                                <Grid item key={player.id}>
                                    <div className={classes.card}>

                                        <div className={classes.actions}>

                                            {game.isVoteStarted &&
                                            < Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleVote(player.id)}
                                                fullWidth={true}
                                                disabled={game.players.find(p => p.id === user.id).ownVote === player.id || game.players.find(p => p.id === user.id).validVote}
                                            >
                                                Voter
                                            </Button>
                                            }

                                        </div>

                                        {!game.isGameOver &&
                                        <Player game={game} player={player}/>
                                        }

                                        {game.isGameStarted && <Words words={player.words}/>}

                                    </div>

                                </Grid>
                            ))}
                        </Grid>
                    </Grid>

                    <Grid item xs={2}>
                        {!game.isGameOver &&
                        <Score game={game}/>
                        }
                    </Grid>
                    <Grid item xs={4}>
                    </Grid>

                </Grid>
            </div>

            {!game.isGameOver &&
            !game.isGameStarted &&
            <ActionButtonRightBot
                color={game.players.find(p => p.id === user.id).isReady ? "primary" : "secondary"}
                onClick={handleToggleReady}
            >
                {game.players.find(p => p.id === user.id).isReady ? "Pas prêt" : "  Prêt  "}
            </ActionButtonRightBot>
            }

            {!game.isGameOver &&
            game.isVoteStarted &&
            !game.players.find(p => p.id === user.id).isTartufe &&
            <ActionButtonRightBot
                color="primary"
                onClick={handleValidVote}
                disabled={game.players.find(p => p.id === user.id).validVote}
            >
                Valider le vote
            </ActionButtonRightBot>
            }

            <ActionButtonRightTop
                color="primary"
                onClick={() => setOpenRules(true)}
            >
                Règles
            </ActionButtonRightTop>

            <Rules openRules={openRules} setOpenRules={setOpenRules}/>

        </div>
    )
};
