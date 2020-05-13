import React, {useCallback} from "react";
import {useQuery} from "@apollo/react-hooks";
import {GAME, GAME_UPDATED} from "../../graphql";
import Board from "./Board";

export default ({...props}) => {
    const {idGame} = props.location.state;

    const options = {
        variables: {idGame},
        fetchPolicy: "cache-and-network",
    };

    const {loading, data, error, subscribeToMore} = useQuery(GAME, options);

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

    if (loading) return <>loading</>;
    if (error) return <>error</>;

    return (
        <Board
            game={data.game}
            subscribe={subscribe}
        />
    )
}
