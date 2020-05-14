import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import withStyles from "@material-ui/core/styles/withStyles";
import AvatarDiable from "../../assets/img/avatar_diable.png";
import AvatarAnge from "../../assets/img/avatar_ange.png";
import AvatarSearch from "../../assets/img/avatar_search.png";
import AvatarSleep from "../../assets/img/avatar_sleep.png";
import Words from "../Words";
import Chip from "@material-ui/core/Chip";


const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: "center",
    },
    dialog: {
        padding: 50,
        overflow: "hidden",
    },
    avatar: {
        width: 100,
        height: 100,
    },
}));

const BadgeStatus = withStyles((theme) => ({
    badge: {
        right: "50%",
        top: "0%",
        padding: '0 0',
        width: 30,
        height: 30,
    },
}))(Badge);

const BadgeWantVote = withStyles((theme) => ({
    badge: {
        right: "50%",
        top: "0%",
        padding: '0 0',
        width: 30,
        height: 30,
    },
}))(Badge);


export default function Player({player, game}) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {game.isGameStarted ?
                <>
                    <Chip label={player.score} color="primary" variant="outlined"/>

                    {game.isVoteStarted ?

                        <BadgeStatus
                            color="primary"
                            badgeContent={game.players.filter(p => {
                                if (p.ownVote) {
                                    return p.ownVote.id === player.id;
                                }
                            }).length}
                        >
                            <Avatar className={classes.avatar} src={AvatarAnge}/>
                        </BadgeStatus>

                        :

                        <>
                            {
                                player.wantVote ?
                                    <BadgeWantVote
                                        color="primary"
                                        badgeContent={player.wantVote ? "VOTONS !" : " "}
                                    >
                                        <Avatar className={classes.avatar} src={AvatarDiable}/>
                                    </BadgeWantVote>
                                    :
                                    <Avatar className={classes.avatar} src={AvatarSearch}/>
                            }
                        </>
                    }
                </>
                :
                <>
                    {player.isReady ?
                        <Avatar className={classes.avatar} src={AvatarDiable}/>
                        :
                        <Avatar className={classes.avatar} src={AvatarSleep}/>
                    }
                </>
            }

        </div>
    )
}