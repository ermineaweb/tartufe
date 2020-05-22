import React, { useContext, useEffect, useRef, useState} from "react";
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
import useStyles from "./useStyles";
import {useHistory} from "react-router";
import ActionButton from "../ActionButton";
import Rules from "../Rules";
import Error from "../Error";
import GameInfo from "./GameInfo";
import PlayerInfo from "./PlayerInfo";
import PlayerInput from "./PlayerInput";
import Players from "./Players";


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
                    .catch(err => setError(err.graphQLErrors[0].message));
            }
        }
    }, []);

    const handleToggleReady = () => {
        console.log(user.id)
        console.log(user.idGame)
        toggleReady()
            .catch(err => setError(err.graphQLErrors[0].message));
    };

    const handleAddWord = () => {
        addWord()
            .then(() => setWord(""))
            .then(() => {
                isWriting({variables: {...options.variables, isWriting: false}})
                    .catch(err => setError(err.toString()));
            })
            .catch(err => setError(err.graphQLErrors[0].message));
    };

    const handleWriting = (e, isAlreadyWriting) => {
        setWord(e.target.value);
        // si le joueur écrit déjà, on n'envoit rien au serveur
        // pour ne pas surcharger en requetes
        if (!isAlreadyWriting) {
            isWriting({variables: {...options.variables, isWriting: true}})
                .catch(err => setError(err.graphQLErrors[0].message));
        }
    };

    useEffect(() => {
        if (word === "") {
            isWriting({variables: {...options.variables, isWriting: false}})
                .catch(err => setError(err.graphQLErrors[0].message));
        }
    }, [word]);

    const handleValidVote = () => {
        validVote()
            .catch(err => setError(err.graphQLErrors[0].message));
    };

    const handleVote = (idTartufe) => {
        vote({variables: {...options.variables, idTartufe}})
            .catch(err => setError(err.graphQLErrors[0].message));
    };

    if (!user.id) {
        history.push("/");
    }

    return (
        <div className={classes.root}>

            {error && <Error error={error} setError={setError}/>}

            <PlayerInfo game={game}/>
            <PlayerInput
                game={game}
                handleAddWord={handleAddWord}
                handleWriting={handleWriting}
                word={word}
            />
            <Players game={game} handleVote={handleVote}/>
            <GameInfo game={game}/>

            {!game.isGameOver &&
            !game.isGameStarted &&
            <ActionButton
                corner={"bottom-right"}
                color={game.players.find(p => p.id === user.id).isReady ? "primary" : "secondary"}
                onClick={handleToggleReady}
            >
                {game.players.find(p => p.id === user.id).isReady ? "Pas prêt" : "  Prêt  "}
            </ActionButton>
            }

            {!game.isGameOver &&
            game.isVoteStarted &&
            !game.players.find(p => p.id === user.id).isTartufe &&
            <ActionButton
                corner={"bottom-right"}
                color="primary"
                onClick={handleValidVote}
                disabled={game.players.find(p => p.id === user.id).validVote}
            >
                Valider le vote
            </ActionButton>
            }

            <ActionButton
                corner={"bottom-left"}
                color="primary"
                onClick={() => setOpenRules(true)}
            >
                Règles
            </ActionButton>

            <Rules openRules={openRules} setOpenRules={setOpenRules}/>

        </div>
    )
};
