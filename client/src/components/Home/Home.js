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
import Games from "../Games";
import {useHistory} from "react-router-dom";
import {UserContext} from "../../context";
import Grid from "@material-ui/core/Grid";
import useStyles from "./useStyles";


export default function Home() {
    const classes = useStyles();
    const [error, setError] = useState(null);
    const [username, setUsername] = useState("");
    const [idGame, setIdGame] = useState("");
    const [playerMax, setPlayerMax] = useState(6);
    const [roundMax, setRoundMax] = useState(4);
    const [openOptions, setOpenOptions] = useState(false);
    const {setUser} = useContext(UserContext);

    const history = useHistory();

    const options = {
        variables: {
            username,
            playerMax,
            roundMax,
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
                            onKeyDown={(e) => e.key === "Enter" && handleJoinGame}
                        />
                        <TextField
                            label="ID de la partie"
                            variant="outlined"
                            value={idGame}
                            onChange={(e) => setIdGame(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleJoinGame}
                            onFocus={(e) => e.target.select()}
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
                            onKeyDown={(e) => e.key === "Enter" && handleCreateGame}
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
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCreateGame} color="secondary" variant={"contained"}>
                            Créer
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>

        </div>
    )
}