import config from "../config";
import checkError from "../error";
import wordList from "../datas/words";
import Random from "../utils/Random";
import Player from "../models/Player";
import Game from "../models/Game";

export default class GameService {

    static games = [];

    static createGame(username, playerMax, roundMax, scoreMax) {
        checkError(GameService.games.length >= config.GAME_MAX, "Trop de partie en cours, veuillez patienter qu'un slot se libère.");
        checkError(playerMax < config.PLAYER_MIN || playerMax > config.PLAYER_MAX, `Le nombre de joueur doit être compris entre ${config.PLAYER_MIN} et ${config.PLAYER_MAX}.`);
        checkError(roundMax < config.ROUND_MIN || roundMax > config.ROUND_MAX, `Le nombre de round doit être compris entre ${config.ROUND_MIN} et ${config.ROUND_MAX}.`);
        checkError(scoreMax < config.SCORE_MIN || scoreMax > config.SCORE_MAX, `Le score max doit être compris entre ${config.SCORE_MIN} et ${config.SCORE_MAX}.`);
        const game = new Game(roundMax, playerMax, scoreMax);
        GameService.games = [...GameService.games, game];
        return GameService.joinGame(username, game.id);
    }

    static joinGame(username, idGame) {
        checkError(username.length < config.USERNAME_MIN_LENGTH || username.length > config.USERNAME_MAX_LENGTH, `Votre pseudo doit contenir entre ${config.USERNAME_MIN_LENGTH} et ${config.USERNAME_MAX_LENGTH} caractères.`);
        const game = GameService.getGame(idGame);
        checkError(game.players.some(p => p.username === username), "Votre pseudo est déjà pris, soyez plus créatif.");
        checkError(game.isGameStarted, "Round en cours, essayez de rejoindre dans un instant.");
        checkError(game.isGameOver, "La partie est finie !");
        return game.addPlayer(new Player(username, idGame));
    }

    static leaveGame(idPlayer, idGame) {
        const game = GameService.getGame(idGame);
        const player = GameService.getPlayer(idPlayer, idGame);
        game.removePlayer(player);
        if (game.players.length === 0) {
            GameService.removeGame(idGame);
        }
        return GameService.games;
    }

    static toggleReady(idPlayer, idGame) {
        const game = GameService.getGame(idGame);
        const player = GameService.getPlayer(idPlayer, idGame);
        console.log(player)
        player.isReady = !player.isReady;
        //&& game.players.length >= config.PLAYER_MIN
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
        checkError(!game.players.some(p => p.id === idPlayer), "Ce joueur n'existe pas dans la partie.");
        return game.players.find(p => p.id === idPlayer);
    }

    static resetGames() {
        GameService.games = [];
        return GameService.games
    }

    static removeGame(idGame) {
        checkError(!GameService.games.some(g => g.id === idGame), "La partie n'existe pas.");
        const index = GameService.games.findIndex(g => g.id === idGame);
        GameService.games.splice(index, 1);
        return GameService.games;
    }

    static getGames() {
        GameService.games = GameService.games.filter(g => !g.isGameOver);
        return GameService.games;
    }

    static getGame(idGame) {
        checkError(!GameService.games.some(g => g.id === idGame), "La partie n'existe pas.");
        return GameService.games.find(g => g.id === idGame);
    }

    static startGame(idGame) {
        const game = GameService.getGame(idGame);
        checkError(game.isGameStarted, "La partie est déjà lancée.");
        checkError(game.isGameOver, "La partie est finie.");

        // let's start
        game.isGameStarted = true;

        // reset all players
        game.players.forEach((player) => {
            player.words = [];
            player.ownVote = null;
            player.isTartufe = false;
            player.wantVote = false;
            player.validVote = false;
            player.isPlaying = false;
        });

        Random.shuffle(game.players);
        game.players[0].isPlaying = true;

        // chose the Tartufe
        const tartufe = game.players[Random.numberMaxExcluded(1, game.players.length)];
        tartufe.isTartufe = true;

        // chose a word for Detectives
        game.wordPlebe = Random.fromArray(wordList);

        return game;
    }

    static endGame(idGame) {
        const game = GameService.calcScore(idGame);
        game.isGameStarted = false;
        game.isVoteStarted = false;
        game.players.forEach(p => p.isReady = false);
        game.round++;

        if ((game.roundMax > 0 && game.round === game.roundMax) ||
            (game.scoreMax > 0 && game.players.some(p => p.score >= game.scoreMax))) {
            game.isGameOver = true;
        }

        return game;
    }

    static calcScore(idGame) {
        const game = GameService.getGame(idGame);
        const tartufe = game.players.find(p => p.isTartufe);
        const playersFindTartufe = game.players.filter(p => p.ownVote === tartufe.id).length;
        /*
        20 pour tartufe si personne n'a trouvé
        10 pour tartufe si tartufe pas voté a la majorité
        15 points si seul a voter pour tartufe
        10 points si cote pour tartufe
         */
        if (playersFindTartufe === 0) {
            tartufe.score += 20;
        }

        if (playersFindTartufe <= game.players.length * config.PERCENT_FOR_DEMOCRACY) {
            tartufe.score += 10;
        }

        game.players.forEach((player) => {
            if (!player.isTartufe) {
                if (playersFindTartufe === 1 && player.ownVote === tartufe.id) {
                    player.score += 15;
                }
                if (playersFindTartufe > 1 && player.ownVote === tartufe.id) {
                    player.score += 10;
                }
            }
        });

        return game;
    }

    static nextPlayer(idGame) {
        const game = GameService.getGame(idGame);
        const index = game.players.findIndex(p => p.isPlaying);
        game.players.forEach(p => p.isPlaying = false);

        if (index === game.players.length - 1) {
            game.players[0].isPlaying = true;
        } else {
            game.players[index + 1].isPlaying = true;
        }

        return game;
    }

    static addWord(idPlayer, idGame, word) {
        const game = GameService.getGame(idGame);
        const player = GameService.getPlayer(idPlayer, idGame);
        checkError(!player.isPlaying, "Ce n'est pas à votre tour de jouer.")
        player.addWord(word);

        GameService.nextPlayer(idGame);

        if (game.players.every(p => p.words.length === config.WORD_MAX)) {
            game.isVoteStarted = true;
        }

        return game;
    }

    static toggleWantVote(idPlayer, idGame) {
        const game = GameService.getGame(idGame);
        const player = GameService.getPlayer(idPlayer, idGame);
        player.wantVote = !player.wantVote;
        // democracy !
        if (game.players.filter(p => p.wantVote).length >= Math.ceil(game.players.length * config.PERCENT_FOR_DEMOCRACY)) {
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
        checkError(!game.isVoteStarted, "Le vote n'est pas encore ouvert sur cette partie.");
        const player = GameService.getPlayer(idPlayer, idGame);
        checkError(player.validVote, "Vous avez déjà valider votre vote.");
        player.ownVote = idTartufe;
        return game;
    }

    static validVote(idPlayer, idGame) {
        const game = GameService.getGame(idGame);
        checkError(!game.isVoteStarted, "Le vote n'est pas encore ouvert sur cette partie.");
        const player = GameService.getPlayer(idPlayer, idGame);
        checkError(player.isTartufe, "Tartufe n'a pas le droit de vote !");
        player.validVote = true;
        if (GameService.arePlayersVoted(idGame)) {
            GameService.endGame(idGame);
        }
        return game;
    }

    static arePlayersVoted(idGame) {
        const game = GameService.getGame(idGame);
        return game.players.filter(p => !p.isTartufe).every(p => p.validVote);
    }

}