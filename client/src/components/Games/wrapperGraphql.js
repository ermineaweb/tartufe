import React, {useCallback} from "react";
import {useQuery} from "@apollo/react-hooks";
import {GAMES, GAMES_UPDATED} from "../../graphql";
import Games from "./Games";

export default () => {

    const options = {
        pollInterval: 5000,
    };

    const {loading, data, error, subscribeToMore} = useQuery(GAMES, options);

    const subscribe = useCallback(() => {
        subscribeToMore({
            document: GAMES_UPDATED,
            updateQuery: (prev, {subscriptionData}) => {
                return Object.assign({}, prev, {
                    games: subscriptionData.data.gamesUpdated
                });
            }
        })
    }, [subscribeToMore, GAMES_UPDATED]);

    if (loading) return <>loading</>;
    if (error) return <>error</>;

    return (
        <Games
            games={data.games}
            subscribe={subscribe}
        />
    )
}
