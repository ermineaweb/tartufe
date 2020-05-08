import Player from "../models/Player";
import Game from "../models/Game";

export default class GameService {

    static games = [];
    static MAX_GAMES = 3;

    constructor() {
    }

    static createGame(username, playerMax, roundMax, roundDuration) {

        if (this.games.length >= this.MAX_GAMES) {
            throw new Error("Trop de partie en cours, veuillez patienter qu'un slot se libère.");
        }

        if (playerMax < 1 || playerMax > 5) {
            throw new Error("Le nombre de joueur doit être compris entre 1 et 5");
        }

        if (roundDuration < 10 || roundDuration > 120) {
            throw new Error("La durée des rounds doit être comprise entre 10 et 120");
        }

        if (roundMax < 1 || roundMax > 10) {
            throw new Error("Le nombre de round est compris entre 1 et 10");
        }

        const creator = new Player(username, true);
        const game = new Game(creator, roundMax, playerMax, roundDuration);
        this.games = [...this.games, game];

        return game;
    }

    static joinGame(username, idGame) {
        if (!this.games.some(g => g.id === idGame)) {
            throw new Error("La partie que vous essayez de rejoindre n'existe pas");
        }
        const game = GameService.getGame(idGame);
        const playerExist = game.players.some(p => p.username === username);
        if (playerExist) return game;
        const player = new Player(username, false);

        return game.addPlayer(player);
    }

    static removeGame(idGame) {
        const index = this.games.findIndex(g => g.id === idGame);
        this.games.slice(index, 1);
        return this.games;
    }

    static getGames() {
        return this.games;
    }

    static getGame(id) {
        return this.games.find(g => g.id === id);
    }

}