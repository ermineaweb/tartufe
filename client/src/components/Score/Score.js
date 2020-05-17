import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
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

                {game.players.sort((a, b) => b.score - a.score).map((player, index) =>
                    <ListItem key={player.id}>
                        <ListItemAvatar>
                            <Avatar>
                                {game.round > 1 ? index + 1 : "-"}
                            </Avatar>
                        </ListItemAvatar>
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