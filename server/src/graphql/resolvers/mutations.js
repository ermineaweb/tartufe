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
        }


    }

};

export default resolvers;
