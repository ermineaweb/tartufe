import gql from "graphql-tag";

export const GAME_UPDATED = gql`
    subscription ($idGame: ID!){
        gameUpdated(id: $idGame) {
            id
            round
            roundMax
            playerMax
            isGameStarted
            isVoteStarted
            isGameOver
            wordPlebe
            players {
                id
                username
                isTartufe
                ownVote
                words
                score
                isReady
                wantVote
                isWriting
                validVote
                isPlaying
            }
        }
    }

`;

export const GAMES_UPDATED = gql`
    subscription {
        gamesUpdated {
            id
            isGameOver
            playerMax
            players{
                id
            }
            round
            roundMax
        }
    }
`;
