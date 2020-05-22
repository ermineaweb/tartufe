import React from "react";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import withStyles from "@material-ui/core/styles/withStyles";
import AvatarDiable from "../../../assets/img/avatars/dark/avatar_diable.png";
import AvatarAnge from "../../../assets/img/avatars/dark/avatar_ange.png";
import AvatarSearch from "../../../assets/img/avatars/dark/avatar_search.png";
import AvatarSleep from "../../../assets/img/avatars/dark/avatar_sleep.png";
import AvatarTartufe from "../../../assets/img/avatars/dark/avatar_tartufe.png";
import Writing from "../../../assets/img/writing_dark2.gif";
import Typography from "@material-ui/core/Typography";
import useStyles from "./useStyles";


const BadgeStatus = withStyles((theme) => ({
    badge: {
        right: "50%",
        top: "10%",
        padding: '0 0',
        width: 50,
        height: 50,
        textSize:"1.3em",
    },
}))(Badge);


export default function Player({player, game}) {
    const classes = useStyles();

    const PlayerAvatar = () => {
        switch (true) {
            case (game.isGameStarted && game.isVoteStarted):
                return (
                    <BadgeStatus
                        color="primary"
                        badgeContent={game.players.filter(p => p.ownVote === player.id).length}
                    >
                        <Avatar variant={"square"} className={classes.avatar} src={AvatarAnge}/>
                    </BadgeStatus>
                );

            case (game.isGameStarted && player.wantVote):
                return <Avatar variant={"square"} className={classes.avatar} src={AvatarDiable}/>;

            case (game.isGameStarted && !player.wantVote):
                return <Avatar variant={"square"} className={classes.avatar} src={AvatarSearch}/>;

            case (!game.isGameStarted && player.isTartufe):
                return <Avatar variant={"square"} className={classes.avatar} src={AvatarTartufe}/>;

            case (!game.isGameStarted && player.isReady):
                return <Avatar variant={"square"} className={classes.avatar} src={AvatarDiable}/>;

            case (!game.isGameStarted):
                return <Avatar variant={"square"} className={classes.avatar} src={AvatarSleep}/>;

            default:
                return <Avatar variant={"square"} className={classes.avatar} src={AvatarSearch}/>;
        }
    };

    return (
        <div className={classes.root}>

            <Typography gutterBottom variant="h6" color="primary">
                {player.isWriting &&
                !game.isVoteStarted ?
                    <img src={Writing} alt="avatar"/>
                    :
                    player.username + " - " + player.score}
            </Typography>

            <PlayerAvatar/>

        </div>
    )
}