import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import withStyles from "@material-ui/core/styles/withStyles";
import AvatarDiable from "../../assets/img/avatar_diable.png";
import AvatarAnge from "../../assets/img/avatar_ange.png";
import AvatarSearch from "../../assets/img/avatar_search.png";
import AvatarSleep from "../../assets/img/avatar_sleep.png";
import AvatarTartufe from "../../assets/img/avatar_tartufe.png";
import Writing from "../../assets/img/writing.gif";
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: "center",
    },
    avatar: {
        width: 100,
        height: 100,
        margin:"10px auto",
    },
}));

const BadgeStatus = withStyles((theme) => ({
    badge: {
        right: "50%",
        top: "0%",
        padding: '0 0',
        width: 20,
        height: 20,
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
                        <Avatar className={classes.avatar} src={AvatarAnge}/>
                    </BadgeStatus>
                );

            case (game.isGameStarted && player.wantVote):
                return <Avatar className={classes.avatar} src={AvatarDiable}/>;

            case (game.isGameStarted && !player.wantVote):
                return <Avatar className={classes.avatar} src={AvatarSearch}/>;

            case (!game.isGameStarted && player.isTartufe):
                return <Avatar className={classes.avatar} src={AvatarTartufe}/>;

            case (!game.isGameStarted && player.isReady):
                return <Avatar className={classes.avatar} src={AvatarDiable}/>;

            case (!game.isGameStarted):
                return <Avatar className={classes.avatar} src={AvatarSleep}/>;

            default:
                return <Avatar className={classes.avatar} src={AvatarSearch}/>;
        }
    };


    return (
        <div className={classes.root}>

            <Typography gutterBottom variant="h6">
                {player.isWriting && !game.isVoteStarted ?
                    <img src={Writing} alt="avatar"/> : player.username}
            </Typography>

            <PlayerAvatar/>

        </div>
    )
}