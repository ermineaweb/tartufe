import React, {useEffect} from "react";
import {Link} from "react-router-dom";
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
                {games.length > 0 ?
                    games.map((game) =>
                        <div key={game.id}>
                            <p>
                                <Link to={{pathname: "/board", state: {idGame: game.id}}}>
                                    Créateur : {game.players.find(p => p.isCreator).username}
                                </Link>
                            </p>
                            <TextField
                                variant="outlined"
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