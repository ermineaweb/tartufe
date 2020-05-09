import GameService from "../../services/GameService";

const resolvers = {

    Mutation: {

        createGame: (root, params) => {
            const {username, playerMax, roundMax, roundDuration} = params;
            return GameService.createGame(username, playerMax, roundMax, roundDuration);
        },

        joinGame: (root, params) => {
            const {username, idGame} = params;
            return GameService.joinGame(username, idGame);
        },

        toggleReady: (root, params) => {
            const {idPlayer, idGame} = params;
            return GameService.toggleReady(idPlayer, idGame);
        },

        setOwnWord: (root, params) => {
            const {idPlayer, idGame, word} = params;
            return GameService.setOwnWord(idPlayer, idGame, word);
        },

        vote: (root, params) => {
            const {idPlayer, idGame, idTartufe} = params;
            return GameService.vote(idPlayer, idGame, idTartufe);
        },

    }

};

export default resolvers;
