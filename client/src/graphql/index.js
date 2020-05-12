import {gql} from "apollo-boost";

export const GAMES = gql`
    query {
        games {
            id
            gameStarted
            creator{
                username
            }
            players {
                id
                username
                ready
            }
        }
    }

`;

export const CREATE_GAME = gql`
    mutation($username: String!, $playerMax: Int, $roundMax: Int, $roundDuration: Int) {
        createGame(
            username: $username
            playerMax: $playerMax
            roundMax: $roundMax
            roundDuration: $roundDuration
        ) {
            id
            players {
                username
                id
            }
        }
    }
`;

export const JOIN_GAME = gql`
    mutation ($username: String!, $idGame: ID!){
        joinGame(
            username: $username
            idGame: $idGame
        ) {
            id
            players {
                id
                username
                tartufe

            }
        }
    }
`;

export const GAME_UPDATED = gql`
    subscription ($id: ID!){
        gameUpdated(id: $id) {
            id
            round
            roundMax
            playerMax
            roundDuration
            gameStarted
            voteStarted
            timer
            gameOver
            players {
                id
                username
                creator
                tartufe
                ownVote {
                    id
                }
                secretWord
                score
                ready
            }
        }
    }

`;

export const GAMES_UPDATED = gql`
    subscription {
        gamesUpdated {
            id
            creator {
                username
            }
        }
    }
`;
