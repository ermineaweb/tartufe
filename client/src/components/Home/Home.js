import React, {useContext, useState} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {useMutation} from "@apollo/react-hooks";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Slider from "../Slider";
import Typography from "@material-ui/core/Typography";
import {CREATE_GAME, JOIN_GAME} from "../../graphql/mutation";
import {useHistory, useParams} from "react-router-dom";
import {UserContext} from "../../context";
import useStyles from "./useStyles";
import Rules from "../Rules";
import ActionButton from "../ActionButton";
import Error from "../Error";
import Footer from "../Footer";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";


export default function Home() {
    const {id} = useParams();
    const classes = useStyles();
    const [error, setError] = useState(null);
    const [username, setUsername] = useState("");
    const [idGame, setIdGame] = useState(id);
    const [playerMax, setPlayerMax] = useState(12);
    const [roundMax, setRoundMax] = useState(0);
    const [wordsMax, setWordsMax] = useState(2);
    const [scoreMax, setScoreMax] = useState(60);
    const [mode, setMode] = useState(2);
    const [openOptions, setOpenOptions] = useState(false);
    const [openRules, setOpenRules] = useState(false);
    const {setUser} = useContext(UserContext);

    const history = useHistory();

    const options = {
        variables: {
            username,
            playerMax,
            roundMax,
            scoreMax,
            wordsMax,
            mode,
            idGame,
        }
    };

    const [createGame] = useMutation(CREATE_GAME, options);
    const [joinGame] = useMutation(JOIN_GAME, options);

    const handleCreateGame = () => {
        setOpenOptions(false);
        createGame()
            .then(res => {
                setUser(res.data.createGame);
                history.push({
                    pathname: "/board",
                    state: {
                        idGame: res.data.createGame.idGame,
                    }
                })
            })
            .catch(err => setError(err.graphQLErrors[0].message));
    };

    const handleJoinGame = () => {
        joinGame()
            .then(res => {
                setUser(res.data.joinGame);
                history.push({
                    pathname: "/board",
                    state: {
                        idGame: res.data.joinGame.idGame,
                    }
                });
            })
            .catch(err => setError(err.graphQLErrors[0].message));
    };


    return (
        <div className={classes.root}>

            {error && <Error error={error} setError={setError}/>}

            <div className={classes.rootJoin}>
                <TextField
                    label="Pseudo"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleJoinGame}
                    autoFocus={true}
                />
                <TextField
                    label="ID de la partie"
                    variant="outlined"
                    value={idGame}
                    onChange={(e) => setIdGame(e.target.value.trim())}
                    onKeyDown={(e) => e.key === "Enter" && handleJoinGame}
                    onFocus={(e) => e.target.select()}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleJoinGame}
                    disabled={!username || !idGame}
                >
                    Rejoindre
                </Button>

                <Typography variant="body2" color="primary">Ou créer une nouvelle partie</Typography>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setOpenOptions(true)}
                >
                    Créer
                </Button>
            </div>

            <Dialog open={openOptions} onClose={() => setOpenOptions(false)}>
                <div className={classes.options}>
                    <DialogTitle>Options de la partie</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Pseudo du créateur"
                            variant="outlined"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleCreateGame}
                            autoFocus={true}
                        />
                        {/*<Typography gutterBottom>*/}
                        {/*    Maximum de joueurs*/}
                        {/*</Typography>*/}
                        {/*<Slider*/}
                        {/*    valueLabelDisplay="auto"*/}
                        {/*    value={playerMax}*/}
                        {/*    min={3}*/}
                        {/*    max={12}*/}
                        {/*    onChange={(e, val) => setPlayerMax(val)}*/}
                        {/*/>*/}
                        {/*<Typography gutterBottom>*/}
                        {/*    Nombre de rounds (Le joueur qui a le plus gros*/}
                        {/*</Typography>*/}
                        {/*<Typography gutterBottom>*/}
                        {/*    score gagne au {roundMax} ème round, 0 pour ignorer)*/}
                        {/*</Typography>*/}
                        {/*<Slider*/}
                        {/*    valueLabelDisplay="auto"*/}
                        {/*    value={roundMax}*/}
                        {/*    min={0}*/}
                        {/*    max={12}*/}
                        {/*    onChange={(e, val) => setRoundMax(val)}*/}
                        {/*/>*/}
                        <Typography gutterBottom>
                            Score à atteindre pour gagner
                        </Typography>
                        <Slider
                            valueLabelDisplay="auto"
                            value={scoreMax}
                            min={30}
                            max={200}
                            step={10}
                            onChange={(e, val) => setScoreMax(val)}
                        />
                        <Typography gutterBottom>
                            Mots par joueur
                        </Typography>
                        <Slider
                            valueLabelDisplay="auto"
                            value={wordsMax}
                            min={1}
                            max={5}
                            step={1}
                            onChange={(e, val) => setWordsMax(val)}
                        />
                        <Typography gutterBottom>
                            Mode de jeu
                        </Typography>
                        <RadioGroup value={mode} onChange={(e, val) => setMode(Number(val))}>
                            <FormControlLabel value={1} control={<Radio/>} label="Mode 1 : Tartufe n'a pas de mot"/>
                            <FormControlLabel value={2} control={<Radio/>} label="Mode 2 : Tartufe a un mot"/>
                        </RadioGroup>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCreateGame} color="secondary" variant={"contained"}>
                            Créer
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>

            <ActionButton
                corner={"bottom-left"}
                color="primary"
                onClick={() => setOpenRules(true)}
            >
                Règles
            </ActionButton>

            <Rules openRules={openRules} setOpenRules={setOpenRules}/>

            <Footer/>

        </div>
    )
}