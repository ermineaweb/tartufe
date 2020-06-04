import GameService from "../../services/GameService";

const resolvers = {

    Mutation: {

        createGame: (root, params, context) => {
            const {username, playerMax, roundMax, scoreMax, wordsMax, mode, canSeeVote} = params;
            const player = GameService.createGame(username, playerMax, roundMax, scoreMax, wordsMax, mode, canSeeVote);
            const games = GameService.getGames();
            context.pubsub.publish("GAMES_UPDATED", {gamesUpdated: games}).catch(err => err);
            return player;
        },

        joinGame: (root, params, context) => {
            const {username, idGame} = params;
            const player = GameService.joinGame(username, idGame);
            const game = GameService.getGame(idGame);
            context.pubsub.publish("GAME_UPDATED", {gameUpdated: game}).catch(err => err);
            return player;
        },

        leaveGame: (root, params, context) => {
            const {idPlayer, idGame} = params;
            const games = GameService.leaveGame(idPlayer, idGame);
            const game = GameService.getGame(idGame);
            context.pubsub.publish("GAME_UPDATED", {gameUpdated: game}).catch(err => err);
            context.pubsub.publish("GAMES_UPDATED", {gamesUpdated: games}).catch(err => err);
            return games;
        },

        toggleReady: (root, params, context) => {
            const {idPlayer, idGame} = params;
            const game = GameService.toggleReady(idPlayer, idGame);
            context.pubsub.publish("GAME_UPDATED", {gameUpdated: game}).catch(err => err);
            return game;
        },

        addWord: (root, params, context) => {
            const {idPlayer, idGame, word} = params;
            const game = GameService.addWord(idPlayer, idGame, word);
            context.pubsub.publish("GAME_UPDATED", {gameUpdated: game}).catch(err => err);
            return game;
        },

        toggleWantVote: (root, params, context) => {
            const {idPlayer, idGame} = params;
            const game = GameService.toggleWantVote(idPlayer, idGame);
            context.pubsub.publish("GAME_UPDATED", {gameUpdated: game}).catch(err => err);
            return game;
        },

        isWriting: (root, params, context) => {
            const {idPlayer, idGame, isWriting} = params;
            const game = GameService.isWriting(idPlayer, idGame, isWriting);
            context.pubsub.publish("GAME_UPDATED", {gameUpdated: game}).catch(err => err);
            return game;
        },

        vote: (root, params, context) => {
            const {idPlayer, idGame, idTartufe} = params;
            const game = GameService.vote(idPlayer, idGame, idTartufe);
            context.pubsub.publish("GAME_UPDATED", {gameUpdated: game}).catch(err => err);
            return game;
        },

        validVote: (root, params, context) => {
            const {idPlayer, idGame} = params;
            const game = GameService.validVote(idPlayer, idGame);
            context.pubsub.publish("GAME_UPDATED", {gameUpdated: game}).catch(err => err);
            return game;
        },

        resetGames: (root, params, context) => {
            const games = GameService.resetGames();
            context.pubsub.publish("GAMES_UPDATED", {gamesUpdated: games}).catch(err => err);
            return games;
        },

    },
};

export default resolvers;
