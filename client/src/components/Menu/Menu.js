import React from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import makeStyles from "@material-ui/core/styles/makeStyles";
import HomeIcon from '@material-ui/icons/Home';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import {NavLink, useHistory} from "react-router-dom";

const useStyles = makeStyles({
    root: {
        textAlign: "center",
        width: "100%",
        position: "fixed",
        top: "0",
    },
});

export default function Menu() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const history = useHistory();

    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
                history.push(newValue);
            }}
            className={classes.root}
        >
            <BottomNavigationAction icon={<HomeIcon/>} value={"/"}/>}/>
            <BottomNavigationAction icon={<LiveHelpIcon/>} value={"/rules"}/>
        </BottomNavigation>
    );
}