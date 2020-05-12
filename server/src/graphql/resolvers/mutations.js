import GameService from "../../services/GameService";
import Game from "../../models/Game";

const resolvers = {

    Mutation: {

        createGame: (root, params, context) => {
            const {username, playerMax, roundMax, roundDuration} = params;
            const game = GameService.createGame(username, playerMax, roundMax, roundDuration);
            const games = GameService.getGames();
            context.pubsub.publish("GAMES_UPDATED", {gamesUpdated: games});
            return game;
        },

        joinGame: (root, params, context) => {
            const {username, idGame} = params;
            const game = GameService.joinGame(username, idGame);
            context.pubsub.publish("GAME_UPDATED", {gameUpdated: game});
            return game;
        },

        toggleReady: (root, params, context) => {
            const {idPlayer, idGame} = params;
            const game = GameService.toggleReady(idPlayer, idGame);
            context.pubsub.publish("GAME_UPDATED", {gameUpdated: game});
            return game;
        },

        setOwnWord: (root, params, context) => {
            const {idPlayer, idGame, word} = params;
            const game = GameService.setOwnWord(idPlayer, idGame, word);
            context.pubsub.publish("GAME_UPDATED", {gameUpdated: game});
            return game;
        },

        startVote: (root, params, context) => {
            const {idPlayer, idGame} = params;
            const game = GameService.startVote(idPlayer, idGame);
            context.pubsub.publish("GAME_UPDATED", {gameUpdated: game});
            return game;
        },

        vote: (root, params, context) => {
            const {idPlayer, idGame, idTartufe} = params;
            const game = GameService.vote(idPlayer, idGame, idTartufe);
            context.pubsub.publish("GAME_UPDATED", {gameUpdated: game});
            return game;
        },

        resetGames: (root, params, context) => {
            const games = GameService.resetGames();
            context.pubsub.publish("GAMES_UPDATED", {gamesUpdated: games});
            return games;
        },

    },
};

export default resolvers;
