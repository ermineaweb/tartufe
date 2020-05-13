import React, {useContext, useEffect, useState} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useMutation} from "@apollo/react-hooks";
import {ADD_OWN_WORD, TOGGLE_READY, VOTE, WANT_VOTE} from "../../graphql";
import {UserContext} from "../../context";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Badge from "@material-ui/core/Badge";
import Words from "../Words";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "100px auto",
        width: "800px",
        '& > *': {
            margin: "10px",
            width: "100%",
            heigth: "100%",
            textAlign: "center",
        },
    },
    dialog: {
        padding: 50,
        overflow: "hidden",
    },
    avatar: {
        width: 100,
        height: 100,
    },
    players: {
        textAlign:"center",
        margin: "50px auto",
        width: "100%",
    },
    actions: {
        margin: "0 auto",
        width: 300,
        '& > *': {
            margin: "10px",
        }
    },
}));

export default function Board({game, subscribe}) {
    const classes = useStyles();
    const {user} = useContext(UserContext);
    const [error, setError] = useState(null);
    const [ownWord, setOwnWord] = useState("");

    const options = {
        variables: {
            idGame: user.idGame,
            idPlayer: user.id,
            word: ownWord
        }
    };
    const [toggleReady] = useMutation(TOGGLE_READY, options);
    const [addOwnWord] = useMutation(ADD_OWN_WORD, options);
    const [wantVote] = useMutation(WANT_VOTE, options);
    const [vote] = useMutation(VOTE);

    useEffect(() => {
        subscribe();
    }, [subscribe]);

    useEffect(() => {
        return () => {
            console.log("mutation : joueur part de la game")
        }
    }, []);

    const handleToggleReady = () => {
        toggleReady()
            .catch(err => err);
    };

    const handleAddOwnWord = () => {
        addOwnWord()
            .then(() => setOwnWord(""))
            .catch(err => setError(err.toString()));
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleAddOwnWord();
        }
    };

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
            {/*<div>{user.id}</div>*/}
            {/*<div>{user.idGame}</div>*/}

            {game.gameStarted && !game.voteStarted &&
            <div className={classes.actions}>
                <TextField
                    variant="outlined"
                    value={ownWord}
                    onChange={(e) => setOwnWord(e.target.value)}
                    onKeyDown={handleKeyDown}
                    fullWidth={true}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddOwnWord}
                >
                    Ajouter le mot
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleWantVote}
                >
                    Lancer un vote
                </Button>
            </div>
            }

            <div className={classes.players}>
                <Grid container spacing={3}>
                    {game.players.map((player) => (
                        <Grid item key={player.id}>
                            {game.gameStarted ?
                                <>
                                    {game.voteStarted ?
                                        <Badge
                                            color="primary"
                                            badgeContent={game.players.filter(p => {
                                                if (p.ownVote) {
                                                    return p.ownVote.id === player.id;
                                                }
                                            }).length}
                                        >
                                            <Avatar className={classes.avatar}>{player.username[0]}</Avatar>
                                        </Badge>
                                        :
                                        <Badge
                                            color="primary"
                                            badgeContent={player.wantVote ? "Démasquons Tartufe !" : "..."}
                                        >
                                            <Avatar className={classes.avatar}>{player.username[0]}</Avatar>
                                        </Badge>
                                    }
                                </>
                                :
                                <Badge color={player.ready ? "primary" : "secondary"} badgeContent=" ">
                                    <Avatar className={classes.avatar}>{player.username[0]}</Avatar>
                                </Badge>
                            }

                            <p>{player.username}</p>

                            {!game.gameStarted && user.id === player.id &&
                            <Button
                                variant="contained"
                                color={player.ready ? "primary" : "secondary"}
                                onClick={handleToggleReady}
                            >
                                {player.ready ? "Pas prêt" : "  Prêt  "}
                            </Button>
                            }

                            {game.voteStarted &&
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleVote(player.id)}
                            >
                                Voter
                            </Button>
                            }

                            {game.gameStarted && <Words words={player.words}/>}
                        </Grid>
                    ))}
                </Grid>
            </div>

        </div>
    )
};