import React from "react";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";


export default function Words({words}) {

    return (
        <List>
            {words.map((word) => (
                <ListItem>
                    <ListItemText
                        primary={word}
                    />
                </ListItem>
            ))}
        </List>
    )
}