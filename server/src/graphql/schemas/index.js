import {gql} from "apollo-server-express";

export default gql`
    type Game {
        id: ID!
        players: [Player]
        round: Int
        roundMax: Int
        scoreMax: Int
        playerMax: Int
        isGameStarted: Boolean
        isVoteStarted: Boolean
        isGameOver: Boolean
        wordPlebe: String
    }

    type Player {
        id: ID!
        idGame: ID!
        username: String
        words: [String]
        ownVote: ID
        score: Int
        wantVote: Boolean
        validVote: Boolean
        isTartufe: Boolean
        isReady: Boolean
        isWriting: Boolean
        isPlaying: Boolean
    }

    type Query {
        player(idGame: ID!, idPlayer: ID!): Player
        game(idGame: ID!): Game
        games: [Game]
    }

    type Mutation {
        createGame(username: String!, playerMax: Int, roundMax: Int, scoreMax: Int): Player
        joinGame(username: String!, idGame: ID!): Player
        leaveGame(idPlayer: ID!, idGame: ID!): [Game]
        toggleReady(idPlayer: ID!, idGame: ID!): Game
        isWriting(idPlayer: ID!, idGame: ID!, isWriting: Boolean): Game
        addWord(idPlayer: ID!, idGame: ID!, word: String): Game
        toggleWantVote(idPlayer: ID!, idGame: ID!): Game
        vote(idPlayer: ID!, idGame: ID!, idTartufe: ID!): Game
        validVote(idPlayer: ID!, idGame: ID!): Game
        resetGames: [Game]
    }

    type Subscription {
        gameUpdated(id: ID!): Game
        gamesUpdated: [Game]
    }
`;