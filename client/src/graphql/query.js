import gql from "graphql-tag";

export const GAME = gql`
    query ($idGame: ID!){
        game(idGame: $idGame) {
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

export const GAMES = gql`
    query {
        games {
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
