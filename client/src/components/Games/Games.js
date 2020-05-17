import React, {useEffect} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
    root: {
        height: "380px",
        overflowY: "auto",
        overflowX: "hidden",
    },
}));


export default function Games({games, subscribe}) {
    const classes = useStyles();

    useEffect(() => {
        subscribe();
    }, [subscribe]);

    return (
        <>
            <Typography variant="h5" color="primary">Parties</Typography>
            <div className={classes.root}>
                {games ? games
                        .filter(g => !g.isGameOver)
                        .map((game) =>
                            <div key={game.id}>
                                <Typography variant="body2" color="primary">
                                    {game.players.length} / {game.playerMax} Joueurs
                                </Typography>
                                <TextField
                                    variant="standard"
                                    color="primary"
                                    value={game.id}
                                    readOnly={true}
                                    label={"ID"}
                                    onFocus={(e) => e.target.select()}
                                />
                            </div>
                        )
                    :
                    <p>Aucune partie en cours</p>
                }
            </div>
        </>
    )
}