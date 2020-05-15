import React, {useCallback} from "react";
import {useQuery} from "@apollo/react-hooks";
import {GAMES} from "../../graphql/query";
import {GAMES_UPDATED} from "../../graphql/subscription";
import Games from "./Games";
import Loading from "../Loading";

export default () => {

    const options = {
        fetchPolicy: "network-only",
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

    if (loading) return <Loading/>;
    if (error) return <>error</>;

    return (
        <Games
            games={data.games}
            subscribe={subscribe}
        />
    )
}
