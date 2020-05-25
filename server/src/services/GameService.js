import config from "../config";
import checkError from "../error";
import wordList from "../datas/words";
import Random from "../utils/Random";
import Player from "../models/Player";
import Game from "../models/Game";
import LogService from "./LogService";

export default class GameService {

    static games = [];

    static createGame(username, playerMax, roundMax, scoreMax, wordsMax, mode) {
        checkError(playerMax < config.PLAYER_MIN || playerMax > config.PLAYER_MAX, `Le nombre de joueur doit être compris entre ${config.PLAYER_MIN} et ${config.PLAYER_MAX}.`);
        checkError(roundMax < config.ROUND_MIN || roundMax > config.ROUND_MAX, `Le nombre de round doit être compris entre ${config.ROUND_MIN} et ${config.ROUND_MAX}.`);
        checkError(scoreMax < config.SCORE_MIN || scoreMax > config.SCORE_MAX, `Le score max doit être compris entre ${config.SCORE_MIN} et ${config.SCORE_MAX}.`);
        checkError(wordsMax < config.WORDS_MIN || wordsMax > config.WORDS_MAX, `Le nombre de mots par tours doit être compris entre ${config.WORDS_MIN} et ${config.WORDS_MAX}.`);

        // clean games with no players
        GameService.games.forEach((game, index, array) => {
            if (game.players.length === 0) {
                array.splice(index, 1);
            }
        });

        checkError(GameService.games.length >= config.GAME_MAX, "Trop de partie en cours, veuillez patienter qu'un slot se libère.");
        const game = new Game(roundMax, playerMax, scoreMax, wordsMax, mode);
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
        return GameService.games;
    }

    static toggleReady(idPlayer, idGame) {
        const game = GameService.getGame(idGame);
        const player = GameService.getPlayer(idPlayer, idGame);
        player.isReady = !player.isReady;
        if (GameService.arePlayersReady(idGame) && game.players.length >= config.PLAYER_MIN && !game.isGameOver) {
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

        // random players role
        Random.shuffle(game.players);
        game.players[0].isPlaying = true;

        // chose the Tartufe
        // if mode 1 the first player start and can't be Tartuge
        // if mode 2 all players can be the Tartufe
        const tartufe = game.mode === 1 ?
            game.players[Random.numberMaxExcluded(1, game.players.length)] :
            game.players[Random.numberMaxExcluded(0, game.players.length)];
        tartufe.isTartufe = true;

        // chose words
        const wordLine = Random.fromArray(wordList);
        switch (game.mode) {
            case 1:
                // mode 1 : only detectives have a word
                game.wordPlebe = Random.fromArray(wordLine);
                break;
            case 2:
                // mode 2 : detectives and tartufe have a different word
                game.wordPlebe = Random.shuffle(wordLine).pop();
                game.wordTartufe = Random.shuffle(wordLine).pop();
                break;
        }

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
            const log = new LogService("gamestats.json");
            log.saveGame(game);
        }

        return game;
    }

    static calcScore(idGame) {
        const game = GameService.getGame(idGame);
        const tartufe = game.players.find(p => p.isTartufe);
        if (game.mode === 1) {
            tartufe.ownVote = null;
        }
        const tartufeFindHimself = game.players.some(p => p.ownVote === tartufe.id && p.isTartufe);
        const playersFindTartufe = game.players.filter(p => p.ownVote === tartufe.id).length;

        if (game.mode === 1) {
            /*
            mode 1
            20 pour tartufe si personne ne l'a trouvé
            10 pour tartufe si tartufe pas voté a la majorité
            15 points si seul a voter pour tartufe
            10 points si vote pour tartufe
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
        }

        if (game.mode === 2) {
            /*
            mode 2
            10 pour tartufe si personne ne l'a trouvé et qu'il se trouve lui même
            10 pour tartufe s'il se trouve
            10 pour tartufe si la majorité ne le trouve pas
            15 points pour détective si seul a voter pour tartufe
            10 points pour détective si vote pour tartufe
             */

            if (tartufeFindHimself) {
                tartufe.score += 10;
                if (playersFindTartufe === 1) {
                    tartufe.score += 10;
                }
            } else {
                if (playersFindTartufe <= game.players.length * config.PERCENT_FOR_DEMOCRACY) {
                    tartufe.score += 10;
                }
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
        }

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
        checkError(!player.isPlaying, "Ce n'est pas à votre tour de jouer.");
        checkError(GameService.checkWordIsValid(game.wordPlebe, word), "Vous ne pouvez pas écrire le mot secret dans votre réponse.");
        checkError(GameService.checkWordIsValid(game.wordTartufe, word), "Vous ne pouvez pas écrire le mot secret dans votre réponse.");
        checkError(word.length > 25, "Le mot ne doit pas dépasser 25 caractères.");
        player.addWord(word);

        const log = new LogService("wordstats.json");
        log.saveWords(game.wordPlebe, game.wordTartufe, word);

        GameService.nextPlayer(idGame);

        if (game.players.every(p => p.words.length === game.wordsMax)) {
            game.isVoteStarted = true;
        }

        return game;
    }

    static checkWordIsValid(word, sentence) {
        return sentence.toLowerCase().includes(word.toLowerCase());
    }

    // this feature is not active
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
        checkError(player.isTartufe && game.mode === 1, "Tartufe n'a pas le droit de vote dans ce mode de jeu !");
        player.validVote = true;
        if (GameService.arePlayersVoted(idGame)) {
            GameService.endGame(idGame);
        }
        return game;
    }

    static arePlayersVoted(idGame) {
        const game = GameService.getGame(idGame);
        switch (game.mode) {
            case 1:
                return game.players.filter(p => !p.isTartufe).every(p => p.validVote);
            case 2:
                return game.players.every(p => p.validVote);
        }

    }

}