import React from "react";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import withStyles from "@material-ui/core/styles/withStyles";
import AvatarDiable from "../../../assets/img/avatars/dark/avatar-diable.gif";
import AvatarAnge from "../../../assets/img/avatars/dark/avatar-ange.gif";
import AvatarSearch from "../../../assets/img/avatars/dark/avatar-search.gif";
import AvatarSleep from "../../../assets/img/avatars/dark/avatar-sleep.gif";
import AvatarTartufe from "../../../assets/img/avatars/dark/avatar_tartufe.png";
import Writing from "../../../assets/img/writing_dark2.gif";
import Typography from "@material-ui/core/Typography";
import useStyles from "./useStyles";


const BadgeVote = withStyles((theme) => ({
    badge: {
        right: "50%",
        top: "10%",
        padding: '0 0',
        width: 40,
        height: 40,
        textSize: "1.3em",
    },
}))(Badge);

const BadgeScore = withStyles((theme) => ({
    badge: {
        right: "50%",
        bottom: "5%",
        padding: '0 0',
        width: 40,
        height: 40,
        textSize: "1.3em",
        zIndex: "10",
    },
}))(Badge);


export default function Player({player, game}) {
    const classes = useStyles();

    const PlayerAvatar = () => {
        switch (true) {
            case (game.isGameStarted && game.isVoteStarted):
                return (
                    <BadgeVote
                        color="primary"
                        badgeContent={game.players.filter(p => p.ownVote === player.id).length}
                    >
                        <Avatar variant={"square"} className={classes.avatar} src={AvatarAnge}/>
                    </BadgeVote>
                );

            case (game.isGameStarted && player.wantVote):
                return (
                    <Avatar variant={"square"} className={classes.avatar} src={AvatarDiable}/>
                );

            case (game.isGameStarted && !player.wantVote):
                return (
                    <Avatar variant={"square"} className={classes.avatar} src={AvatarSearch}/>
                );

            case (!game.isGameStarted && player.isTartufe):
                return (
                    <Avatar variant={"square"} className={classes.avatar} src={AvatarTartufe}/>
                );

            case (!game.isGameStarted && player.isReady):
                return (
                    <Avatar variant={"square"} className={classes.avatar} src={AvatarDiable}/>
                );

            case (!game.isGameStarted):
                return (
                    <Avatar variant={"square"} className={classes.avatar} src={AvatarSleep}/>
                );

            default:
                return <Avatar variant={"square"} className={classes.avatar} src={AvatarSearch}/>;

        }
    };

    return (
        <div className={classes.root}>

            <Typography gutterBottom variant="subtitle1" color="primary">
                {player.isWriting &&
                !game.isVoteStarted ?
                    <img src={Writing} alt="avatar"/>
                    :
                    player.username
                }
            </Typography>

            <Typography gutterBottom variant="subtitle1" color="primary">
                {player.score}
            </Typography>

            <PlayerAvatar/>

        </div>
    )
}