import Player from "../../models/Player";
import GameService from "../../services/GameService";

const resolvers = {

    Query: {

        player: function (root, {idPlayer, idGame}) {
            return new Player("romain");
        },

        game: function (root, {idGame}) {
            return GameService.getGame(idGame);
        },

        games: function () {
            return GameService.getGames();
        },

    },
};

export default resolvers;
