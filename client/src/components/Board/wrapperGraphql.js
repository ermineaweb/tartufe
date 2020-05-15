import React, {useCallback} from "react";
import {useQuery} from "@apollo/react-hooks";
import {GAME} from "../../graphql/query";
import {GAME_UPDATED} from "../../graphql/subscription";
import Board from "./Board";
import Loading from "../Loading";
import {useHistory} from "react-router";

export default ({...props}) => {
    const {idGame} = props.location.state;

    const options = {
        variables: {idGame},
        fetchPolicy: "cache-and-network",
    };

    const {loading, data, error, subscribeToMore} = useQuery(GAME, options);
    const history = useHistory();

    const subscribe = useCallback(() => {
        subscribeToMore({
            document: GAME_UPDATED,
            variables: {
                idGame
            },
            updateQuery: (prev, {subscriptionData}) => {
                return Object.assign({}, prev, {
                    game: subscriptionData.data.gameUpdated
                });
            }
        })
    }, [subscribeToMore, GAME_UPDATED]);

    if (loading) return <Loading/>;
    if (error) return <>error</>;

    if (!data.game || !data.game.id) {
        history.push("/");
    }

    return (
        <Board
            game={data.game}
            subscribe={subscribe}
        />
    )
}
