import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListSubheader from "@material-ui/core/ListSubheader";

const useStyles = makeStyles(theme => ({
    root: {},
}));

export default function Score({game}) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <List className={classes.root}>
                <ListSubheader>Scores</ListSubheader>

                {game.players.map((player, index) =>
                    <ListItem key={player.id}>
                        <ListItemAvatar>
                            <Avatar>
                                {game.round > 1 ? index + 1 : "-"}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={player.username} secondary={player.score}/>
                    </ListItem>
                ).sort((a, b) => b.score - a.score)}
            </List>

        </div>
    )
}