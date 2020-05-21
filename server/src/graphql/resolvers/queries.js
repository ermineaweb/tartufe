import GameService from "../../services/GameService";

const resolvers = {

    Query: {

        game: function (root, {idGame}) {
            return GameService.getGame(idGame);
        },

        games: function () {
            return GameService.getGames();
        },

    },
};

export default resolvers;
