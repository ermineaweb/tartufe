import React, {useState} from "react";
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
import {CREATE_GAME, JOIN_GAME} from "../../graphql";
import Games from "../Games";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "100px auto",
        width: "300px",
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

    const optionsCreateGame = {
        variables: {
            username,
            playerMax,
            roundMax,
            roundDuration,
        }
    };

    const optionsJoinGame = {
        variables: {
            username,
            idGame,
        }
    };

    const [createGame] = useMutation(CREATE_GAME, optionsCreateGame);
    const [joinGame] = useMutation(JOIN_GAME, optionsJoinGame);

    const handleCreateGame = () => {
        setOpenOptions(false);
        createGame()
            .catch(err => {
                console.log(err);
            });
    };

    const handleJoinGame = () => {
        joinGame()
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div className={classes.root}>
            <Games/>
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

            <Dialog open={openOptions} onClose={() => setOpenOptions(false)}>
                <div className={classes.dialog}>
                    <DialogTitle>Options de la partie</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Pseudo du créateur"
                            variant="outlined"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <Typography gutterBottom>
                            Maximum de joueurs
                        </Typography>
                        <Slider
                            valueLabelDisplay="auto"
                            value={playerMax}
                            min={1}
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
                        <Typography gutterBottom>
                            Temps d'un round (0 pour infini)
                        </Typography>
                        <Slider
                            valueLabelDisplay="auto"
                            value={roundDuration}
                            min={0}
                            max={180}
                            step={10}
                            onChange={(e, val) => setRoundDuration(val)}
                        />
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