import GameService from "../../services/GameService";
import Game from "../../models/Game";

const resolvers = {

    Mutation: {

        createGame: (root, params, context) => {
            const {username, playerMax, roundMax, roundDuration} = params;
            const creator = GameService.createGame(username, playerMax, roundMax, roundDuration);
            const games = GameService.getGames();
            context.pubsub.publish("GAMES_UPDATED", {gamesUpdated: games});
            return creator;
        },

        joinGame: (root, params, context) => {
            const {username, idGame} = params;
            const player = GameService.joinGame(username, idGame);
            const game = GameService.getGame(idGame);
            context.pubsub.publish("GAME_UPDATED", {gameUpdated: game});
            return player;
        },

        toggleReady: (root, params, context) => {
            const {idPlayer, idGame} = params;
            const game = GameService.toggleReady(idPlayer, idGame);
            context.pubsub.publish("GAME_UPDATED", {gameUpdated: game});
            return game;
        },

        addOwnWord: (root, params, context) => {
            const {idPlayer, idGame, word} = params;
            const game = GameService.addOwnWord(idPlayer, idGame, word);
            context.pubsub.publish("GAME_UPDATED", {gameUpdated: game});
            return game;
        },

        wantVote: (root, params, context) => {
            const {idPlayer, idGame} = params;
            const game = GameService.wantVote(idPlayer, idGame);
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
