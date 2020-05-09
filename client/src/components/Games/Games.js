import React from "react";
import {gql} from 'apollo-boost';
import {useQuery} from "@apollo/react-hooks";

const GAMES = gql`
    query {
        games {
            id
            playerMax
            roundMax
            roundDuration
            creator {
                username
            }
            players {
                id
                username
                creator
                tartufe
                votes
                secretWord
            }
        }
    }
`;

export default function Games() {
    const {loading, data, error} = useQuery(GAMES);

    if (loading) return <>loading...</>;
    if (error) return <>{error}</>;

    return (
        <>
            Games
            {data.games.map((game) =>
                <div key={game.id}>
                    <p>
                        {game.id} - Créateur : {game.creator.username}
                    </p>
                </div>
            )}
        </>
    )
}