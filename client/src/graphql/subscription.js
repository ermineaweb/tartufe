import gql from "graphql-tag";

export const GAME_UPDATED = gql`
    subscription ($idGame: ID!){
        gameUpdated(id: $idGame) {
            id
            round
            roundMax
            playerMax
            roundDuration
            isGameStarted
            isVoteStarted
            timer
            isGameOver
            players {
                id
                username
                isTartufe
                isCreator
                ownVote
                secretWord
                words
                score
                isReady
                wantVote
                isWriting
            }
        }
    }

`;

export const GAMES_UPDATED = gql`
    subscription {
        gamesUpdated {
            id
            isGameStarted
            players {
                id
                username
                isCreator
            }
        }
    }
`;
