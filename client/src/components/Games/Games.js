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
            <Typography variant="h5">Parties</Typography>
            <div className={classes.root}>
                {games ? games
                        .filter(g => !g.isGameOver)
                        .map((game) =>
                            <div key={game.id}>
                                <p>
                                    {game.players.length} / {game.playerMax} Joueurs
                                </p>
                                <TextField
                                    variant="outlined"
                                    color="secondary"
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