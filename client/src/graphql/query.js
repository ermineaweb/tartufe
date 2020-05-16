import gql from "graphql-tag";

export const GAME = gql`
    query ($idGame: ID!){
        game(idGame: $idGame) {
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

export const GAMES = gql`
    query {
        games {
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
