import gql from "graphql-tag";

export const GAME = gql`
    query ($idGame: ID!){
        game(idGame: $idGame) {
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
                tartufe
                ownVote {
                    id
                    username
                }
                secretWord
                words
                score
                ready
                wantVote
            }
        }
    }

`;

export const GAME_UPDATED = gql`
    subscription ($idGame: ID!){
        gameUpdated(id: $idGame) {
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
                tartufe
                creator
                ownVote {
                    id
                    username
                }
                secretWord
                words
                score
                ready
                wantVote
            }
        }
    }

`;

export const GAMES = gql`
    query {
        games {
            id
            gameStarted
            players {
                id
                username
                ready
                creator
            }
        }
    }

`;

export const GAMES_UPDATED = gql`
    subscription {
        gamesUpdated {
            id
            gameStarted
            players {
                id
                username
                ready
                creator
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
            idGame
        }
    }
`;

export const JOIN_GAME = gql`
    mutation ($idGame: ID!, $username: String!){
        joinGame(
            idGame:  $idGame
            username: $username
        ) {
            id
            idGame
        }
    }
`;

export const TOGGLE_READY = gql`
    mutation ($idGame: ID!, $idPlayer: ID!){
        toggleReady(
            idGame:  $idGame
            idPlayer: $idPlayer
        ) {
            id
        }
    }
`;

export const ADD_OWN_WORD = gql`
    mutation ($idPlayer: ID!, $idGame: ID!, $word: String){
        addOwnWord(
            idGame:  $idGame
            idPlayer: $idPlayer
            word: $word
        ) {
            id
        }
    }
`;

export const WANT_VOTE = gql`
    mutation ($idPlayer: ID!, $idGame: ID!){
        wantVote(
            idGame:  $idGame
            idPlayer: $idPlayer
        ) {
            id
        }
    }
`;

export const VOTE = gql`
    mutation ($idPlayer: ID!, $idGame: ID!, $idTartufe: ID!){
        vote(
            idGame:  $idGame
            idPlayer: $idPlayer
            idTartufe: $idTartufe
        ) {
            id
        }
    }
`;
