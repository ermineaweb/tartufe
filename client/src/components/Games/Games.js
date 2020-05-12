import React, {useEffect} from "react";
import {useQuery, useSubscription} from "@apollo/react-hooks";
import {GAMES, GAMES_UPDATED} from "../../graphql";


export default function Games() {
    const dataQuery = useQuery(GAMES);
    const dataSub = useSubscription(GAMES_UPDATED);

    if (dataQuery.loading || dataSub.loading) return <>loading</>;
    if (dataQuery.error || dataSub.error) return <>error</>;

    return (
        <>
            Games
            {dataQuery && dataQuery.data.games.map((game) =>
                <div key={game.id}>
                    <p>
                        {game.id} - Créateur : {game.creator.username}
                    </p>
                </div>
            )}
        </>
    )
}