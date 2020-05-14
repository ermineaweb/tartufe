import config from "../config";
import wordList from "../datas/words";
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

        if (username.length < config.USERNAME_MIN_LENGTH) {
            throw new Error(`Le pseudo du créateur doit contenir au moins ${config.USERNAME_MIN_LENGTH} caractères.`);
        }

        const game = new Game(roundMax, playerMax, roundDuration);
        const creator = new Player(username, game.id, true);
        game.addPlayer(creator);
        this.games = [...GameService.games, game];
        return creator;
    }

    static joinGame(username, idGame) {
        const game = GameService.getGame(idGame);
        if (username.length === config.USERNAME_MIN_LENGTH) {
            throw new Error(`Le pseudo doit contenir au moins ${config.USERNAME_MIN_LENGTH} caractères.`);
        }
        if (game.players.some(p => p.username === username)) {
            throw new Error("Le pseudo existe déjà dans la partie, soyez plus créatif.");
        }
        const player = new Player(username, idGame, false);
        game.addPlayer(player);
        return player;
    }

    static toggleReady(idPlayer, idGame) {
        const game = GameService.getGame(idGame);
        const player = GameService.getPlayer(idPlayer, idGame);
        player.isReady = !player.isReady;

        if (GameService.arePlayersReady(idGame) && !game.isGameOver) {
            GameService.startGame(idGame);
        }

        return game;
    }

    static arePlayersReady(idGame) {
        const game = GameService.getGame(idGame);
        return game.players.every(p => p.isReady);
    }

    static getPlayer(idPlayer, idGame) {
        const game = GameService.getGame(idGame);
        if (!game.players.some(p => p.id === idPlayer)) {
            throw new Error("Ce joueur n'existe pas dans la partie.");
        }
        return game.players.find(p => p.id === idPlayer);
    }

    static resetGames() {
        GameService.games = [];
        return GameService.games
    }

    static getGames() {
        return GameService.games;
    }

    static getGame(idGame) {
        if (!GameService.games.some(g => g.id === idGame)) {
            throw new Error("La partie n'existe pas.");
        }
        return GameService.games.find(g => g.id === idGame);
    }

    static startGame(idGame) {
        const game = GameService.getGame(idGame);

        if (game.isGameStarted) {
            throw new Error("La partie est déjà lancée.");
        }

        if (game.isGameOver) {
            throw new Error("La partie est finie.");
        }

        // let's start
        game.isGameStarted = true;

        // chose the Tartufe
        const tartufe = Random.fromArray(game.players);
        tartufe.isTartufe = true;

        // assign secrets words
        const flipCoin = Random.flipCoin(); // true or false
        const words = Random.fromArray(wordList); // a couple of word : {word1: "blue", word2: "red"}
        game.players.forEach(player => {
            // we want sometimes assign the word1 to the Tartufe, sometimes reverse
            if (flipCoin) {
                player.secretWord = player.isTartufe ? words.word1 : words.word2;
            } else {
                player.secretWord = player.isTartufe ? words.word2 : words.word1;
            }
        });

        console.log("game : " + game.id + " started - round : " + game.round);

        if (game.roundDuration > 0) {
            const chrono = setInterval(() => {
                console.log(game.timer);
                if (game.timer-- === 0) {
                    // todo : mettre tous les votes a true avec wantVote
                    clearInterval(chrono);
                }
            }, 1000);
        }

        return game;
    }

    static endGame(idGame) {
        const game = GameService.getGame(idGame);
        console.log("game : " + game.id + " - Fin du round " + game.round);
        game.isGameStarted = false;
        game.isVoteStarted = false;
        game.timer = game.roundDuration;

        const playersFindTartufe = game.players.filter(p => p.ownVote.isTartufe).length;
        const playersDoesntFindTartufe = game.players.filter(p => !p.ownVote.isTartufe).length;

        game.players.forEach((player) => {

            if (player.isTartufe) {
                // tartufe win 1 for each player who doesnt find him
                player.score += playersDoesntFindTartufe;
                if (player.ownVote.isTartufe) {
                    // tartufe find himself, he wins +2 bonus points
                    player.score += 2;
                }
            }

            if (player.ownVote.isTartufe) {
                // each player win 1 for each player who find tartufe
                player.vote += playersFindTartufe;
            }

            player.words = [];
            player.ownVote = null;
            player.isTartufe = false;
            player.wantVote = false;
            player.isReady = false;
        });
        if (game.round++ === game.roundMax) {
            game.isGameOver = true;
            console.log("game : " + game.id + " - GameOver !");
        }
        return game;
    }

    static addOwnWord(idPlayer, idGame, word) {
        const game = GameService.getGame(idGame);
        const player = GameService.getPlayer(idPlayer, idGame);
        player.addWord(word);
        return game;
    }

    static wantVote(idPlayer, idGame) {
        const game = GameService.getGame(idGame);
        const player = GameService.getPlayer(idPlayer, idGame);
        player.wantVote = true;
        // democracy !
        if (game.players.filter(p => p.wantVote).length >= Math.ceil(game.players.length / 2)) {
            game.isVoteStarted = true;
        }
        return game;
    }

    static isWriting(idPlayer, idGame, isWriting) {
        const game = GameService.getGame(idGame);
        const player = GameService.getPlayer(idPlayer, idGame);
        player.isWriting = isWriting;
        return game;
    }

    static vote(idPlayer, idGame, idTartufe) {
        const game = GameService.getGame(idGame);
        if (!game.isVoteStarted) {
            throw new Error("Le vote n'est pas encore ouvert sur cette partie.");
        }
        const player = GameService.getPlayer(idPlayer, idGame);
        player.ownVote = GameService.getPlayer(idTartufe, idGame);
        if (GameService.arePlayersVoted(idGame)) {
            console.log("tous les joueurs ont voté");
            GameService.endGame(idGame);
        }
        return game;
    }

    static arePlayersVoted(idGame) {
        const game = GameService.getGame(idGame);
        return game.players.every(p => p.ownVote !== null);
    }

}