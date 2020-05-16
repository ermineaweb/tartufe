import gql from "graphql-tag";

export const CREATE_GAME = gql`
    mutation($username: String!, $playerMax: Int, $roundMax: Int) {
        createGame(
            username: $username
            playerMax: $playerMax
            roundMax: $roundMax
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

export const LEAVE_GAME = gql`
    mutation ($idGame: ID!, $idPlayer: ID!){
        leaveGame(
            idGame:  $idGame
            idPlayer: $idPlayer
        ) {
            id
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
        addWord(
            idGame:  $idGame
            idPlayer: $idPlayer
            word: $word
        ) {
            id
        }
    }
`;

export const VALID_VOTE = gql`
    mutation ($idPlayer: ID!, $idGame: ID!){
        validVote(
            idGame:  $idGame
            idPlayer: $idPlayer
        ) {
            id
        }
    }
`;

export const IS_WRITING = gql`
    mutation ($idPlayer: ID!, $idGame: ID!, $isWriting: Boolean){
        isWriting(
            idGame:  $idGame
            idPlayer: $idPlayer
            isWriting: $isWriting
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

