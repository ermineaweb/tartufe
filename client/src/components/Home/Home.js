import React, {useContext, useState} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useMutation} from "@apollo/react-hooks";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Slider from "../Slider";
import Typography from "@material-ui/core/Typography";
import {CREATE_GAME, JOIN_GAME} from "../../graphql/mutation";
import Games from "../Games";
import {useHistory} from "react-router-dom";
import {UserContext} from "../../context";
import Grid from "@material-ui/core/Grid";


const useStyles = makeStyles((theme) => ({
    root: {
        margin: "100px auto",
        textAlign: "center",
        '& > *': {
            margin: "10px auto",
            width: "100%",
            heigth: "100%",
            textAlign: "center",
        },
    },
    rootJoin: {
        margin: "50px auto",
        // width: "300px",
        '& > *': {
            margin: "10px auto",
            width: "100%",
            heigth: "100%",
            textAlign: "center",
        },
    },
    dialog: {
        padding: 50,
        overflow: "hidden",
    }
}));

export default function Home() {
    const classes = useStyles();
    const [error, setError] = useState(null);
    const [username, setUsername] = useState("");
    const [idGame, setIdGame] = useState("");
    const [playerMax, setPlayerMax] = useState(6);
    const [roundMax, setRoundMax] = useState(2);
    const [roundDuration, setRoundDuration] = useState(0);
    const [openOptions, setOpenOptions] = useState(false);
    const {setUser} = useContext(UserContext);

    const history = useHistory();

    const [createGame] = useMutation(CREATE_GAME, {
        variables: {
            username,
            playerMax,
            roundMax,
            roundDuration,
        }
    });
    const [joinGame] = useMutation(JOIN_GAME, {variables: {username, idGame}});

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
            .catch(err => setError(err.toString()));
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
            .catch(err => setError(err.toString()));
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleCreateGame();
        }
    };

    return (
        <div className={classes.root}>

            {error && <div>{error}</div>}

            <Grid container spacing={3}>

                <Grid item xs={4}>
                    <Games/>
                </Grid>

                <Grid item xs={4}>
                    <div className={classes.rootJoin}>
                        <TextField
                            label="Pseudo"
                            variant="outlined"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            label="ID de la partie"
                            variant="outlined"
                            value={idGame}
                            onChange={(e) => setIdGame(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleJoinGame}
                        >
                            Rejoindre
                        </Button>
                        <div>Ou créer une nouvelle partie</div>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setOpenOptions(true)}
                        >
                            Créer
                        </Button>
                    </div>
                </Grid>

                <Grid item xs={4}>
                </Grid>

            </Grid>


            <Dialog open={openOptions} onClose={() => setOpenOptions(false)}>
                <div className={classes.dialog}>
                    <DialogTitle>Options de la partie</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Pseudo du créateur"
                            variant="outlined"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <Typography gutterBottom>
                            Maximum de joueurs
                        </Typography>
                        <Slider
                            valueLabelDisplay="auto"
                            value={playerMax}
                            min={3}
                            max={12}
                            onChange={(e, val) => setPlayerMax(val)}
                        />
                        <Typography gutterBottom>
                            Nombre de rounds (0 pour infini)
                        </Typography>
                        <Slider
                            valueLabelDisplay="auto"
                            value={roundMax}
                            min={0}
                            max={12}
                            onChange={(e, val) => setRoundMax(val)}
                        />
                        {/*<Typography gutterBottom>*/}
                        {/*    Temps d'un round (0 pour infini)*/}
                        {/*</Typography>*/}
                        {/*<Slider*/}
                        {/*    valueLabelDisplay="auto"*/}
                        {/*    value={roundDuration}*/}
                        {/*    min={0}*/}
                        {/*    max={180}*/}
                        {/*    step={10}*/}
                        {/*    onChange={(e, val) => setRoundDuration(val)}*/}
                        {/*/>*/}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCreateGame} color="primary" variant={"contained"}>
                            Créer
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>
        </div>
    )
}