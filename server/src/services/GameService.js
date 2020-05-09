import config from "../config";
import words from "../datas/words";
import Random from "../utils/Random";
import Player from "../models/Player";
import Game from "../models/Game";

export default class GameService {

    static games = [];

    static createGame(username, playerMax, roundMax, roundDuration) {
        if (GameService.games.length >= config.GAME_MAX) {
            throw new Error("Trop de partie en cours, veuillez patienter qu'un slot se libère.");
        }

        if (playerMax < config.PLAYER_MIN || playerMax > config.PLAYER_MAX) {
            throw new Error(`Le nombre de joueur doit être compris entre ${config.PLAYER_MIN} et ${config.PLAYER_MAX}.`);
        }

        if (roundDuration < config.DURATION_MIN || roundDuration > config.DURATION_MAX) {
            throw new Error(`La durée des rounds doit être comprise entre ${config.DURATION_MIN} et ${config.DURATION_MAX}.`);
        }

        if (roundMax < config.ROUND_MIN || roundMax > config.ROUND_MAX) {
            throw new Error(`Le nombre de round doit être compris entre ${config.ROUND_MIN} et ${config.ROUND_MAX}.`);
        }

        const creator = new Player(username, true);
        const game = new Game(creator, roundMax, playerMax, roundDuration);
        this.games = [...GameService.games, game];

        return game;
    }

    static joinGame(username, idGame) {
        const game = GameService.getGame(idGame);
        const playerExist = game.players.some(p => p.username === username);
        if (playerExist) return game;
        const player = new Player(username, false);

        return game.addPlayer(player);
    }

    static toggleReady(idPlayer, idGame) {
        const game = GameService.getGame(idGame);
        const player = GameService.getPlayer(idPlayer, idGame);
        player.ready = !player.ready;

        if (GameService.arePlayersReady(idGame) && !game.gameOver) {
            GameService.startGame(idGame);
        }

        return game;
    }

    static resetPlayersNotReady(idGame) {
        const game = GameService.getGame(idGame);
        game.players.forEach(p => p.ready = false);
        return game;
    }

    static arePlayersReady(idGame) {
        const game = GameService.getGame(idGame);
        return game.players.every(p => p.ready);
    }

    static getPlayer(idPlayer, idGame) {
        const game = GameService.getGame(idGame);
        if (!game.players.some(p => p.id === idPlayer)) {
            throw new Error("Ce joueur n'existe pas dans la partie.");
        }
        return game.players.find(p => p.id === idPlayer);
    }

    static removeGame(id) {
        const index = GameService.games.findIndex(g => g.id === id);
        this.games.slice(index, 1);
        return GameService.games;
    }

    static getGames() {
        return GameService.games;
    }

    static getGame(id) {
        if (!GameService.games.some(g => g.id === id)) {
            throw new Error("La partie n'existe pas.");
        }
        return GameService.games.find(g => g.id === id);
    }

    static startGame(id) {
        const game = GameService.getGame(id);

        if (game.gameStarted) {
            throw new Error("La partie est déjà lancée.");
        }

        if (game.gameOver) {
            throw new Error("La partie est finie.");
        }

        // let's start
        game.gameStarted = true;
        // chose the tartufe
        const tartufe = Random.fromArray(game.players);
        tartufe.tartufe = true;
        GameService.assignSecretsWords(id);

        console.log("game : " + game.id + " started - round : " + game.round);

        const timer = setInterval(() => {

            console.log(game.timer);
            game.timer--;

            if (game.timer <= 0) {
                console.log("game : " + game.id + " - Fin du round !");
                game.gameStarted = false;
                game.timer = game.roundDuration;
                tartufe.tartufe = false;
                GameService.resetPlayersNotReady(id);
                if (game.round++ === game.roundMax) {
                    game.gameOver = true;
                    console.log("game : " + game.id + " - GameOver !");
                }
                clearInterval(timer);
            }

        }, 1000);

        return game;
    }

    static setOwnWord(idPlayer, idGame, word) {
        const game = GameService.getGame(idGame);
        const player = GameService.getPlayer(idPlayer, idGame);
        player.ownWord = word;
        return game;
    }

    static vote(idPlayer, idGame, idTartufe) {
        const game = GameService.getGame(idGame);
        const player = GameService.getPlayer(idPlayer, idGame);
        const tartufe = GameService.getPlayer(idTartufe, idGame);
        player.ownVote = tartufe;
        tartufe.votes = [...tartufe.votes, player];
        if (GameService.arePlayersVoted(idGame)) {
            console.log("tous les joueurs ont voté");
        }
        return game;
    }

    static resetPlayersVote(idGame) {
        const game = GameService.getGame(idGame);
        game.players.forEach(p => {
            p.ownVote = null;
            p.votes = [];
        });
    }

    static arePlayersVoted(idGame) {
        const game = GameService.getGame(idGame);
        return game.players.every(p => p.ownVote !== null);
    }

    static assignSecretsWords(id) {
        const game = GameService.getGame(id);
        game.players.forEach(player => {
            if (player.tartufe) {
                player.secretWord = Random.fromArray(words).tartufeWord;
            } else {
                player.secretWord = Random.fromArray(words).word;
            }
        });
    }

}