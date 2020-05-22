import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    root: {},
}));

export default function Score({game}) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <List className={classes.root}>
                <ListSubheader>Scores</ListSubheader>

                {game.players.map((player) =>
                    <ListItem key={player.id}>
                        <ListItemText
                            primary={<Typography color="primary">{player.username}</Typography>}
                            secondary={player.score}
                        />
                    </ListItem>
                )}
            </List>

        </div>
    )
}